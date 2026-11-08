import type { Metadata } from "next";
import type { ReactNode } from "react";

const pageUrl = "https://www.faccio-tutto.it/fotovoltaico";
const pageTitle = "Impianti fotovoltaici per casa e azienda";
const pageDescription =
  "Scopri come valutare un impianto fotovoltaico: consumi, caratteristiche del tetto, inverter e accumulo. Informazioni e strumenti per iniziare il tuo progetto.";

const faqs = [
  {
    question: "Come si dimensiona un impianto fotovoltaico?",
    answer:
      "La valutazione considera i consumi elettrici, le abitudini di utilizzo, lo spazio disponibile, l’esposizione e le ombre sul tetto. Un calcolo online è indicativo: il progetto va verificato sulle caratteristiche dell’immobile e dell’impianto elettrico.",
  },
  {
    question: "Un sistema di accumulo è sempre necessario?",
    answer:
      "No. La convenienza dipende da quando si consuma energia, dalla produzione attesa e dai costi della soluzione. È utile confrontare il profilo dei consumi con la produzione prevista prima di scegliere una batteria.",
  },
  {
    question: "È possibile aggiungere l’accumulo a un impianto esistente?",
    answer:
      "In molti casi si può valutare un sistema di accumulo anche su un impianto esistente, ma la compatibilità dipende dall’inverter, dalla configurazione elettrica e dai componenti installati. Serve una verifica tecnica del caso specifico.",
  },
  {
    question: "Dove posso verificare incentivi e regole aggiornate?",
    answer:
      "Requisiti, scadenze e incentivi possono cambiare. Per le informazioni aggiornate consulta le comunicazioni e i servizi ufficiali del Gestore dei Servizi Energetici (GSE) e verifica le condizioni applicabili al tuo intervento.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "impianti fotovoltaici",
    "impianto fotovoltaico casa",
    "impianto fotovoltaico azienda",
    "fotovoltaico con accumulo",
    "progettazione fotovoltaica",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `${pageTitle} | Faccio Tutto`,
    description: pageDescription,
    url: pageUrl,
    siteName: "Faccio Tutto",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/impianto-fotovoltaico.png",
        alt: "Impianto fotovoltaico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Faccio Tutto`,
    description: pageDescription,
    images: ["/images/impianto-fotovoltaico.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Progettazione di impianti fotovoltaici",
      serviceType: "Valutazione e progettazione di impianti fotovoltaici",
      description: pageDescription,
      provider: {
        "@id": "https://www.faccio-tutto.it/#organization",
      },
      url: pageUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

export default function FotovoltaicoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
