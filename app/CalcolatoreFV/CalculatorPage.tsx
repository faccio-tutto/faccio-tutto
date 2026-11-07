"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Compass,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";
import {
  FaBars,
  FaInstagramSquare,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";

interface MonthlyProduction {
  month: number;
  productionKwh: number;
  irradiationKwhM2: number;
  variabilityKwh: number;
}

interface CalculationResult {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    elevation: number | null;
  };
  system: {
    location: string;
    peakPowerKw: number;
    angle: number;
    aspect: number;
    loss: number;
  };
  annualProductionKwh: number;
  annualIrradiationKwhM2: number | null;
  specificYieldKwhKwp: number;
  monthly: MonthlyProduction[];
  source: {
    name: string;
    geocodingService: string;
    radiationDatabase: string;
    yearMin: number | null;
    yearMax: number | null;
    url: string;
  };
}

const months = [
  { full: "Gennaio", short: "Gen" },
  { full: "Febbraio", short: "Feb" },
  { full: "Marzo", short: "Mar" },
  { full: "Aprile", short: "Apr" },
  { full: "Maggio", short: "Mag" },
  { full: "Giugno", short: "Giu" },
  { full: "Luglio", short: "Lug" },
  { full: "Agosto", short: "Ago" },
  { full: "Settembre", short: "Set" },
  { full: "Ottobre", short: "Ott" },
  { full: "Novembre", short: "Nov" },
  { full: "Dicembre", short: "Dic" },
];

const orientations = [
  { value: "0", label: "Sud", detail: "0°" },
  { value: "-45", label: "Sud-est", detail: "−45°" },
  { value: "45", label: "Sud-ovest", detail: "+45°" },
  { value: "-90", label: "Est", detail: "−90°" },
  { value: "90", label: "Ovest", detail: "+90°" },
  { value: "180", label: "Nord", detail: "±180°" },
];

const formatNumber = (value: number, digits = 0) =>
  new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const getApiError = (payload: unknown) =>
  typeof payload === "object" &&
  payload !== null &&
  "error" in payload &&
  typeof payload.error === "string"
    ? payload.error
    : "Non è stato possibile completare il calcolo. Riprova.";

const isCalculationResult = (value: unknown): value is CalculationResult => {
  if (
    !isRecord(value) ||
    !isRecord(value.location) ||
    !isRecord(value.system) ||
    !isRecord(value.source) ||
    !Array.isArray(value.monthly)
  ) {
    return false;
  }

  return (
    typeof value.location.name === "string" &&
    isFiniteNumber(value.location.latitude) &&
    isFiniteNumber(value.location.longitude) &&
    (value.location.elevation === null || isFiniteNumber(value.location.elevation)) &&
    typeof value.system.location === "string" &&
    isFiniteNumber(value.system.peakPowerKw) &&
    isFiniteNumber(value.system.angle) &&
    isFiniteNumber(value.system.aspect) &&
    isFiniteNumber(value.system.loss) &&
    isFiniteNumber(value.annualProductionKwh) &&
    (value.annualIrradiationKwhM2 === null ||
      isFiniteNumber(value.annualIrradiationKwhM2)) &&
    isFiniteNumber(value.specificYieldKwhKwp) &&
    value.monthly.length === 12 &&
    value.monthly.every(
      (item) =>
        isRecord(item) &&
        Number.isInteger(item.month) &&
        isFiniteNumber(item.productionKwh) &&
        isFiniteNumber(item.irradiationKwhM2) &&
        isFiniteNumber(item.variabilityKwh),
    ) &&
    typeof value.source.name === "string" &&
    typeof value.source.geocodingService === "string" &&
    typeof value.source.radiationDatabase === "string" &&
    (value.source.yearMin === null || isFiniteNumber(value.source.yearMin)) &&
    (value.source.yearMax === null || isFiniteNumber(value.source.yearMax)) &&
    typeof value.source.url === "string"
  );
};

function getOrientationLabel(aspect: number) {
  return orientations.find((item) => Number(item.value) === aspect)?.label ?? `${aspect}°`;
}

async function downloadReport(result: CalculationResult) {
  const { default: jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const green: [number, number, number] = [16, 49, 37];
  const mint: [number, number, number] = [218, 243, 224];
  const ink: [number, number, number] = [31, 41, 36];
  const muted: [number, number, number] = [103, 116, 108];
  const chartX = 21;
  const chartWidth = 168;
  const chartBaseY = 190;
  const maxMonthly = Math.max(...result.monthly.map((item) => item.productionKwh));

  pdf.setProperties({
    title: `Stima fotovoltaica - ${result.location.name}`,
    subject: "Report di producibilità fotovoltaica basato su dati PVGIS",
    author: "faccio-tutto.it",
    creator: "faccio-tutto.it",
  });

  pdf.setFillColor(...green);
  pdf.rect(0, 0, pageWidth, 45, "F");
  pdf.setFillColor(250, 190, 65);
  pdf.circle(19, 17, 4, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("faccio-tutto.it  /  ENERGIA", 29, 18);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(20);
  pdf.text("Stima di producibilità", 18, 31);
  pdf.setFontSize(9);
  pdf.setTextColor(224, 238, 228);
  pdf.text(`Impianto fotovoltaico · ${result.location.name}`, 18, 38);
  pdf.text(`Report generato il ${new Date().toLocaleDateString("it-IT")}`, pageWidth - 18, 18, {
    align: "right",
  });

  pdf.setFillColor(244, 249, 245);
  pdf.roundedRect(16, 53, pageWidth - 32, 34, 3, 3, "F");
  pdf.setTextColor(...muted);
  pdf.setFontSize(8);
  pdf.text("PRODUZIONE ANNUALE STIMATA", 22, 63);
  pdf.setTextColor(...green);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text(`${formatNumber(result.annualProductionKwh)} kWh`, 22, 77);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...ink);
  pdf.text(
    `${formatNumber(result.specificYieldKwhKwp)} kWh/kWp  ·  ${result.system.peakPowerKw} kWp`,
    pageWidth - 22,
    76,
    { align: "right" },
  );

  pdf.setTextColor(...ink);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Configurazione simulata", 18, 101);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text(`Località: ${result.location.name}`, 18, 110);
  pdf.text(`Coordinate: ${result.location.latitude.toFixed(4)}, ${result.location.longitude.toFixed(4)}`, 18, 117);
  pdf.text(
    `Potenza: ${result.system.peakPowerKw} kWp  ·  Inclinazione: ${result.system.angle}°  ·  Orientamento: ${getOrientationLabel(result.system.aspect)}`,
    18,
    124,
  );
  pdf.text(
    `Perdite di sistema: ${result.system.loss}%${result.location.elevation === null ? "" : `  ·  Quota: ${formatNumber(result.location.elevation)} m`}`,
    18,
    131,
  );

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Produzione media mensile", 18, 147);
  pdf.setDrawColor(225, 232, 226);
  pdf.setLineWidth(0.3);
  pdf.line(chartX, chartBaseY, chartX + chartWidth, chartBaseY);
  const gap = 4;
  const barWidth = (chartWidth - gap * 11) / 12;

  result.monthly.forEach((item, index) => {
    const height = Math.max(1, (item.productionKwh / maxMonthly) * 29);
    const x = chartX + index * (barWidth + gap);
    pdf.setFillColor(...mint);
    pdf.roundedRect(x, chartBaseY - height, barWidth, height, 1, 1, "F");
    pdf.setTextColor(...muted);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(6.5);
    pdf.text(months[item.month - 1].short, x + barWidth / 2, chartBaseY + 5, { align: "center" });
  });

  const tableTop = 207;
  pdf.setTextColor(...ink);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Dettaglio mensile", 18, tableTop);
  pdf.setFillColor(...green);
  pdf.rect(18, tableTop + 4, pageWidth - 36, 7, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7.5);
  pdf.text("MESE", 21, tableTop + 9);
  pdf.text("PRODUZIONE (kWh)", 111, tableTop + 9, { align: "right" });
  pdf.text("IRRAGGIAMENTO (kWh/m²)", 189, tableTop + 9, { align: "right" });

  result.monthly.forEach((item, index) => {
    const y = tableTop + 17 + index * 4.7;
    if (index % 2 === 0) {
      pdf.setFillColor(246, 249, 246);
      pdf.rect(18, y - 3.2, pageWidth - 36, 4.7, "F");
    }
    pdf.setTextColor(...ink);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.text(months[item.month - 1].full, 21, y);
    pdf.text(formatNumber(item.productionKwh), 111, y, { align: "right" });
    pdf.text(formatNumber(item.irradiationKwhM2, 1), 189, y, { align: "right" });
  });

  pdf.setDrawColor(220, 228, 221);
  pdf.line(18, 280, pageWidth - 18, 280);
  pdf.setTextColor(...muted);
  pdf.setFontSize(7);
  pdf.text(
    `${result.source.name} · Database ${result.source.radiationDatabase}${result.source.yearMin && result.source.yearMax ? ` (${result.source.yearMin}–${result.source.yearMax})` : ""}`,
    18,
    285,
  );
  pdf.text(`Coordinate: ${result.source.geocodingService}`, 18, 289);
  pdf.setFontSize(6);
  pdf.text("Stima preliminare: ombreggiamenti e condizioni del sito possono modificare la produzione reale.", 18, 293);
  pdf.save(
    `stima-fotovoltaica-${result.location.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.pdf`,
  );
}

export default function CalculatorPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [peakPowerKw, setPeakPowerKw] = useState("6");
  const [angle, setAngle] = useState("30");
  const [aspect, setAspect] = useState("0");
  const [loss, setLoss] = useState("14");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfError, setPdfError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setPdfError("");

    const capacity = Number(peakPowerKw.replace(",", "."));
    const parsedAngle = Number(angle);
    const parsedAspect = Number(aspect);
    const parsedLoss = Number(loss.replace(",", "."));

    if (!location.trim()) {
      setErrorMessage("Inserisci il nome del comune per calcolare la stima.");
      return;
    }
    if (!Number.isFinite(capacity) || capacity < 0.1 || capacity > 1000) {
      setErrorMessage("La potenza deve essere compresa tra 0,1 e 1.000 kWp.");
      return;
    }
    if (!Number.isFinite(parsedLoss) || parsedLoss < 0 || parsedLoss > 40) {
      setErrorMessage("Le perdite di sistema devono essere comprese tra 0% e 40%.");
      return;
    }

    setIsCalculating(true);
    setResult(null);

    try {
      const response = await fetch("/api/calcolatore-fv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: location.trim(),
          peakPowerKw: capacity,
          angle: parsedAngle,
          aspect: parsedAspect,
          loss: parsedLoss,
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getApiError(payload));
      }

      if (!isCalculationResult(payload)) {
        throw new Error("La risposta del servizio PVGIS non contiene dati di calcolo validi.");
      }

      setResult(payload);
    } catch (error) {
      console.error("Photovoltaic production calculation failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Errore di rete durante il calcolo. Verifica la connessione e riprova.",
      );
    } finally {
      setIsCalculating(false);
    }
  }

  async function handleDownload() {
    if (!result) return;

    setPdfError("");
    try {
      await downloadReport(result);
    } catch (error) {
      console.error("Photovoltaic report PDF generation failed:", error);
      setPdfError("Non è stato possibile generare il PDF. Riprova.");
    }
  }

  const maxMonthly = result
    ? Math.max(...result.monthly.map((item) => item.productionKwh))
    : 1;

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Chi siamo", href: "/chisiamo" },
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-6">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image
                src="/logo faccio tutto 3.png"
                alt="Logo Faccio-Tutto.it"
                width={100}
                height={100}
                priority
              />
            </Link>

            <div className="hidden items-center gap-3 text-xs font-bold uppercase tracking-wider text-neutral-300 md:flex">
              <span>faccio-tutto.it</span>
              <a
                href="https://www.instagram.com/infofacciotutto/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Faccio-Tutto.it"
                className="transition hover:text-white"
              >
                <FaInstagramSquare className="text-base" />
              </a>
              <a
                href="https://www.linkedin.com/company/faccio-tutto/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Faccio-Tutto.it"
                className="transition hover:text-white"
              >
                <FaLinkedin className="text-base" />
              </a>
            </div>
          </div>

          <ul className="hidden gap-10 text-[11px] uppercase tracking-[0.25em] text-white/60 2xl:flex">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === "/CalcolatoreFV" ? "page" : undefined}
                  className="whitespace-nowrap transition duration-200 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
            aria-controls="calculator-site-menu"
            className="text-2xl text-white 2xl:hidden"
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="calculator-site-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 bg-black/95 backdrop-blur-xl 2xl:hidden"
            >
              <div className="flex max-h-[calc(100dvh-8rem)] flex-col overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === "/CalcolatoreFV" ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/10 px-8 py-5 text-sm uppercase tracking-widest text-white transition hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex justify-center gap-6 py-5">
                  <a
                    href="https://www.instagram.com/infofacciotutto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Faccio-Tutto.it"
                    className="text-2xl text-white"
                  >
                    <FaInstagramSquare />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/faccio-tutto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Faccio-Tutto.it"
                    className="text-2xl text-white"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pb-6 pt-36 sm:px-6 sm:pb-8 sm:pt-40 lg:px-8">
        <header className="relative isolate min-h-[300px] overflow-hidden rounded-[2rem] bg-[#123b2c] text-white shadow-xl sm:min-h-[340px]">
          <Image
            src="/images/calcolatore-fv-header.svg"
            alt="Illustrazione tecnica di pannelli fotovoltaici e curva di produzione solare"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#09281c]/95 via-[#09281c]/75 to-[#09281c]/20" />
          <div className="flex min-h-[300px] flex-col justify-between gap-8 p-7 sm:min-h-[340px] sm:p-10 lg:p-12">
            <div className="flex items-center justify-between gap-4">
              <a
                href="https://re.jrc.ec.europa.eu/pvg_tools/it/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/15 px-3 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-white/15"
              >
                Dati PVGIS UE
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100/25 bg-emerald-950/35 px-3 py-1.5 text-xs text-emerald-50 backdrop-blur">
                <Sun className="h-3.5 w-3.5 text-amber-300" />
                Stima basata su dati solari europei
              </div>
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Calcolatore fotovoltaico
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
                Scopri la producibilità attesa del tuo impianto con PVGIS, il
                servizio del Joint Research Centre della Commissione Europea.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid items-start gap-6 xl:grid-cols-[350px_minmax(0,1fr)]">
          <section className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5 text-white shadow-sm sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
                Configurazione
              </p>
              <h2 className="mt-2 text-xl font-semibold">Descrivi il tuo impianto</h2>
              <p className="mt-2 text-sm leading-5 text-neutral-400">
                Puoi usare la potenza prevista o quella nominale dei moduli.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium">
                  Comune dell’impianto
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    id="location"
                    name="location"
                    autoComplete="address-level2"
                    required
                    maxLength={100}
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Es. Palermo"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
                <p className="mt-1.5 text-xs text-neutral-400">
                  La località viene georeferenziata per interrogare PVGIS.
                </p>
              </div>

              <div>
                <label htmlFor="power" className="mb-2 block text-sm font-medium">
                  <span className="inline-flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-600" />
                    Potenza di picco
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="power"
                    name="power"
                    type="text"
                    inputMode="decimal"
                    required
                    value={peakPowerKw}
                    onChange={(event) => setPeakPowerKw(event.target.value)}
                    placeholder="6"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-3 pr-14 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    kWp
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="angle" className="mb-2 block text-sm font-medium">
                    Inclinazione
                  </label>
                  <div className="relative">
                    <Compass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <select
                      id="angle"
                      value={angle}
                      onChange={(event) => setAngle(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-neutral-700 bg-neutral-950 py-3 pl-9 pr-2 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    >
                      {[0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90].map((value) => (
                        <option key={value} value={value}>
                          {value}°
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="aspect" className="mb-2 block text-sm font-medium">
                    Orientamento
                  </label>
                  <select
                    id="aspect"
                    value={aspect}
                    onChange={(event) => setAspect(event.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  >
                    {orientations.map((orientation) => (
                      <option key={orientation.value} value={orientation.value}>
                        {orientation.label} ({orientation.detail})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="loss" className="mb-2 block text-sm font-medium">
                  Perdite di sistema
                </label>
                <div className="relative">
                  <input
                    id="loss"
                    name="loss"
                    type="text"
                    inputMode="decimal"
                    required
                    value={loss}
                    onChange={(event) => setLoss(event.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-3 pr-10 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    %
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-neutral-400">
                  Valore predefinito PVGIS: 14%. Modificalo se hai dati di progetto.
                </p>
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isCalculating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123b2c] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b513c] disabled:cursor-wait disabled:opacity-65"
              >
                {isCalculating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Interrogazione PVGIS…
                  </>
                ) : (
                  <>
                    Calcola la produzione
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
              <p className="text-xs leading-5 text-neutral-300">
                Stima indicativa basata su serie meteorologiche pluriennali.
                Ombreggiamenti e condizioni reali del tetto possono modificare la
                produzione effettiva.
              </p>
            </div>
          </section>

          <section aria-live="polite" className="min-w-0">
            {isCalculating ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 text-center shadow-sm">
                <div className="mb-5 rounded-2xl bg-amber-50 p-4">
                  <Sun className="h-8 w-8 animate-pulse text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold">Elaborazione della stima</h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
                  Stiamo individuando le coordinate e calcolando i dati di
                  irraggiamento e produzione con PVGIS.
                </p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  <article className="rounded-3xl bg-[#123b2c] p-5 text-white shadow-sm sm:col-span-3 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/80">
                          Produzione annua stimata
                        </p>
                        <p className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                          {formatNumber(result.annualProductionKwh)}
                          <span className="ml-2 text-lg font-medium text-emerald-100">kWh/anno</span>
                        </p>
                        <p className="mt-3 text-sm text-emerald-50/80">
                          {result.location.name} · {result.system.peakPowerKw} kWp · orientamento{" "}
                          {getOrientationLabel(result.system.aspect)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#123b2c] shadow-sm transition hover:bg-emerald-50"
                        >
                          <ArrowDownToLine className="h-4 w-4" />
                          Scarica report PDF
                        </button>
                        <span className="text-xs text-white/70">Riepilogo, parametri e grafico</span>
                      </div>
                    </div>
                    {pdfError && (
                      <p role="alert" className="mt-3 text-sm text-amber-100">
                        {pdfError}
                      </p>
                    )}
                  </article>

                  <article className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <BarChart3 className="h-4 w-4 text-emerald-800" />
                      Resa specifica
                    </div>
                    <p className="mt-3 text-2xl font-semibold">
                      {formatNumber(result.specificYieldKwhKwp)}{" "}
                      <span className="text-sm font-medium text-neutral-400">kWh/kWp</span>
                    </p>
                  </article>

                  <article className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <Sun className="h-4 w-4 text-amber-600" />
                      Irraggiamento annuo
                    </div>
                    <p className="mt-3 text-2xl font-semibold">
                      {result.annualIrradiationKwhM2 === null
                        ? "—"
                        : formatNumber(result.annualIrradiationKwhM2)}
                      <span className="ml-1 text-sm font-medium text-neutral-400">kWh/m²</span>
                    </p>
                  </article>

                  <article className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <MapPin className="h-4 w-4 text-emerald-800" />
                      Posizione PVGIS
                    </div>
                    <p className="mt-3 text-base font-semibold">{result.location.name}</p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {result.location.latitude.toFixed(3)}, {result.location.longitude.toFixed(3)}
                      {result.location.elevation !== null &&
                        ` · ${formatNumber(result.location.elevation)} m s.l.m.`}
                    </p>
                  </article>
                </div>

                <article className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5 text-white shadow-sm sm:p-7">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
                        Profilo energetico
                      </p>
                      <h2 className="mt-1 text-xl font-semibold">Produzione mese per mese</h2>
                    </div>
                    <p className="text-xs text-neutral-400">kWh stimati per mese</p>
                  </div>

                  <div className="mt-7 flex h-56 items-end gap-1 border-b border-l border-neutral-700 px-2 pb-2 pt-4 sm:gap-2">
                    {result.monthly.map((item) => {
                      const month = months[item.month - 1];
                      const height = Math.max(4, (item.productionKwh / maxMonthly) * 100);
                      return (
                        <div
                          key={item.month}
                          className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                          title={`${month.full}: ${formatNumber(item.productionKwh)} kWh`}
                        >
                          <span className="hidden text-[10px] text-neutral-400 sm:block">
                            {formatNumber(item.productionKwh)}
                          </span>
                          <div className="flex min-h-0 w-full flex-1 items-end">
                            <div
                              aria-label={`${month.full}: ${formatNumber(item.productionKwh)} kWh`}
                              className="w-full rounded-t-md bg-gradient-to-t from-emerald-800 to-emerald-500 transition hover:from-amber-600 hover:to-amber-400"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-medium text-neutral-400 sm:text-xs">
                            {month.short}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[440px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-neutral-700 text-xs uppercase tracking-wide text-neutral-400">
                          <th className="px-3 py-3 font-semibold">Mese</th>
                          <th className="px-3 py-3 text-right font-semibold">Produzione</th>
                          <th className="px-3 py-3 text-right font-semibold">Irraggiamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.monthly.map((item) => (
                          <tr key={item.month} className="border-b border-neutral-800 last:border-0">
                            <th className="px-3 py-2.5 font-medium text-neutral-200">
                              {months[item.month - 1].full}
                            </th>
                            <td className="px-3 py-2.5 text-right font-semibold tabular-nums">
                              {formatNumber(item.productionKwh)} kWh
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-neutral-400">
                              {formatNumber(item.irradiationKwhM2, 1)} kWh/m²
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>

                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 sm:flex-row sm:items-center sm:px-5">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Dati climatici verificabili
                      </p>
                      <p className="mt-1 text-xs leading-5 text-neutral-400">
                        {result.source.name} · Database {result.source.radiationDatabase}
                        {result.source.yearMin !== null && result.source.yearMax !== null
                          ? ` · serie ${result.source.yearMin}–${result.source.yearMax}`
                          : ""}
                        {" · coordinate Open-Meteo"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-emerald-900 hover:underline"
                  >
                    Fonte e metodo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="px-1 text-xs leading-5 text-neutral-400">
                  Stima preliminare calcolata per un sistema fisso con perdite indicate dall’utente.
                  Non sostituisce un progetto esecutivo né considera ombreggiamenti locali, profilo
                  dei consumi, degrado dei moduli o condizioni specifiche del sito.
                </p>
              </div>
            ) : (
              <div className="grid min-h-[520px] overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/70 text-white shadow-sm md:grid-cols-2">
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Sun className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
                    Simulazione preliminare
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Una stima chiara, prima del progetto
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    Imposta località e caratteristiche del campo fotovoltaico. Riceverai produzione
                    annuale, dettaglio mensile e resa specifica calcolati sui dati meteorologici
                    PVGIS.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Dati storici di irraggiamento geolocalizzati",
                      "Produzione per ciascun mese dell’anno",
                      "Report PDF pronto da salvare o condividere",
                    ].map((text) => (
                      <p key={text} className="flex items-start gap-2 text-sm text-neutral-200">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[260px] md:min-h-full">
                  <Image
                    src="/images/impianto-fotovoltaico.png"
                    alt="Pannelli fotovoltaici installati sul tetto di un edificio"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09281c]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      Calcolo basato su
                    </p>
                    <p className="mt-1 text-sm font-semibold text-neutral-800">
                      PVGIS · Joint Research Centre UE
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

      </div>
      <footer className="flex w-full flex-col items-center justify-center gap-4 border-t border-neutral-900 bg-black py-8 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500 sm:flex-row sm:gap-8">
        <span className="text-neutral-600">faccio-tutto.it © {new Date().getFullYear()}</span>
        <Link
          href="/privacy"
          className="underline-offset-2 transition hover:text-neutral-300 hover:underline"
        >
          Privacy e Note Legali
        </Link>
        <Link
          href="/contatti"
          className="underline-offset-2 transition hover:text-neutral-300 hover:underline"
        >
          Contatti
        </Link>
      </footer>
    </main>
  );
}
