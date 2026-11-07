import { NextResponse } from "next/server";

interface CalculationRequest {
  location: string;
  peakPowerKw: number;
  angle: number;
  aspect: number;
  loss: number;
}

interface GeocodingResult {
  name?: string;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  country_code?: string;
  feature_code?: string;
}

interface MonthlyProduction {
  month: number;
  productionKwh: number;
  irradiationKwhM2: number;
  variabilityKwh: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isValidRequest = (value: unknown): value is CalculationRequest => {
  if (!isRecord(value)) return false;

  return (
    typeof value.location === "string" &&
    value.location.trim().length > 0 &&
    value.location.trim().length <= 100 &&
    typeof value.peakPowerKw === "number" &&
    Number.isFinite(value.peakPowerKw) &&
    value.peakPowerKw >= 0.1 &&
    value.peakPowerKw <= 1000 &&
    typeof value.angle === "number" &&
    Number.isInteger(value.angle) &&
    value.angle >= 0 &&
    value.angle <= 90 &&
    typeof value.aspect === "number" &&
    Number.isInteger(value.aspect) &&
    value.aspect >= -180 &&
    value.aspect <= 180 &&
    typeof value.loss === "number" &&
    Number.isFinite(value.loss) &&
    value.loss >= 0 &&
    value.loss <= 40
  );
};

const unavailable = (message: string) =>
  NextResponse.json({ error: message }, { status: 502 });

async function fetchClimateService(url: string, timeoutMs: number) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        next: { revalidate: 86400 },
      });
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "La richiesta non contiene JSON valido." }, { status: 400 });
  }

  if (!isValidRequest(requestBody)) {
    return NextResponse.json(
      { error: "Controlla località, potenza e parametri dell'impianto." },
      { status: 400 },
    );
  }

  const search = new URLSearchParams({
    name: `${requestBody.location.trim()}, Italia`,
    count: "10",
    language: "it",
    format: "json",
  });

  let geocodingResponse: Response;
  try {
    geocodingResponse = await fetchClimateService(
      `https://geocoding-api.open-meteo.com/v1/search?${search.toString()}`,
      12000,
    );
  } catch (error) {
    console.error("Open-Meteo geocoding request failed:", error);
    return unavailable("Il servizio di ricerca della località non è al momento raggiungibile.");
  }

  if (!geocodingResponse.ok) {
    console.error("Open-Meteo geocoding returned HTTP", geocodingResponse.status);
    return unavailable("Non è stato possibile verificare la località. Riprova tra poco.");
  }

  let geocodingData: unknown;
  try {
    geocodingData = await geocodingResponse.json();
  } catch (error) {
    console.error("Open-Meteo returned invalid geocoding JSON:", error);
    return unavailable("La ricerca della località ha restituito una risposta non valida.");
  }

  const geocodingResults: GeocodingResult[] =
    isRecord(geocodingData) && Array.isArray(geocodingData.results)
      ? geocodingData.results.filter(
          (item): item is GeocodingResult => isRecord(item),
        )
      : [];
  const italianResults = geocodingResults.filter(
    (result) =>
      result.country_code === "IT" &&
      typeof result.latitude === "number" &&
      typeof result.longitude === "number" &&
      result.latitude >= 35 &&
      result.latitude <= 48 &&
      result.longitude >= 6 &&
      result.longitude <= 19,
  );
  const location =
    italianResults.find((result) => result.feature_code === "PPLA") ?? italianResults[0];

  if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
    return NextResponse.json(
      { error: "Località italiana non trovata. Inserisci il nome di un comune, ad esempio Palermo." },
      { status: 404 },
    );
  }

  const pvgisParameters = new URLSearchParams({
    lat: String(location.latitude),
    lon: String(location.longitude),
    peakpower: String(requestBody.peakPowerKw),
    loss: String(requestBody.loss),
    angle: String(requestBody.angle),
    aspect: String(requestBody.aspect),
    pvtechchoice: "crystSi",
    mountingplace: "building",
    outputformat: "json",
  });

  let pvgisResponse: Response;
  try {
    pvgisResponse = await fetchClimateService(
      `https://re.jrc.ec.europa.eu/api/v5_3/PVcalc?${pvgisParameters.toString()}`,
      15000,
    );
  } catch (error) {
    console.error("PVGIS request failed:", error);
    return unavailable("PVGIS non è al momento raggiungibile. Riprova tra poco.");
  }

  if (!pvgisResponse.ok) {
    console.error("PVGIS returned HTTP", pvgisResponse.status);
    return unavailable("PVGIS non ha potuto calcolare questa configurazione. Verifica i parametri.");
  }

  let pvgisData: unknown;
  try {
    pvgisData = await pvgisResponse.json();
  } catch (error) {
    console.error("PVGIS returned invalid JSON:", error);
    return unavailable("PVGIS ha restituito una risposta non valida. Riprova tra poco.");
  }

  const outputs = isRecord(pvgisData) && isRecord(pvgisData.outputs) ? pvgisData.outputs : null;
  const monthlyOutput =
    outputs && isRecord(outputs.monthly) && Array.isArray(outputs.monthly.fixed)
      ? outputs.monthly.fixed
      : null;
  const totals =
    outputs && isRecord(outputs.totals) && isRecord(outputs.totals.fixed)
      ? outputs.totals.fixed
      : null;

  if (
    !monthlyOutput ||
    !totals ||
    typeof totals.E_y !== "number" ||
    !Number.isFinite(totals.E_y) ||
    totals.E_y < 0
  ) {
    console.error("PVGIS response is missing annual or monthly production data.");
    return unavailable("La risposta PVGIS non contiene i dati di produzione attesi.");
  }

  const monthly: MonthlyProduction[] = [];
  for (const row of monthlyOutput) {
    if (
      !isRecord(row) ||
      typeof row.month !== "number" ||
      !Number.isInteger(row.month) ||
      typeof row["E_m"] !== "number" ||
      !Number.isFinite(row["E_m"]) ||
      row["E_m"] < 0 ||
      typeof row["H(i)_m"] !== "number" ||
      !Number.isFinite(row["H(i)_m"]) ||
      row["H(i)_m"] < 0 ||
      typeof row.SD_m !== "number" ||
      !Number.isFinite(row.SD_m) ||
      row.SD_m < 0
    ) {
      console.error("PVGIS returned an invalid monthly production row.");
      return unavailable("I dati mensili restituiti da PVGIS non sono validi.");
    }

    monthly.push({
      month: row.month,
      productionKwh: row["E_m"],
      irradiationKwhM2: row["H(i)_m"],
      variabilityKwh: row.SD_m,
    });
  }

  if (
    monthly.length !== 12 ||
    new Set(monthly.map((row) => row.month)).size !== 12 ||
    monthly.some((row) => row.month < 1 || row.month > 12)
  ) {
    console.error("PVGIS returned an incomplete monthly production series.");
    return unavailable("PVGIS non ha restituito tutti i dodici mesi.");
  }

  const meteoData =
    isRecord(pvgisData) && isRecord(pvgisData.inputs) && isRecord(pvgisData.inputs.meteo_data)
      ? pvgisData.inputs.meteo_data
      : {};
  const annualIrradiation =
    typeof totals["H(i)_y"] === "number" ? totals["H(i)_y"] : null;

  return NextResponse.json(
    {
      location: {
        name: location.name ?? requestBody.location.trim(),
        latitude: location.latitude,
        longitude: location.longitude,
        elevation: typeof location.elevation === "number" ? location.elevation : null,
      },
      system: requestBody,
      annualProductionKwh: totals.E_y,
      annualIrradiationKwhM2: annualIrradiation,
      specificYieldKwhKwp: totals.E_y / requestBody.peakPowerKw,
      monthly,
      source: {
        name: "PVGIS - Commissione Europea, Joint Research Centre",
        geocodingService: "Open-Meteo Geocoding API",
        radiationDatabase:
          typeof meteoData.radiation_db === "string" ? meteoData.radiation_db : "PVGIS",
        yearMin: typeof meteoData.year_min === "number" ? meteoData.year_min : null,
        yearMax: typeof meteoData.year_max === "number" ? meteoData.year_max : null,
        url: "https://re.jrc.ec.europa.eu/pvg_tools/it/",
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
