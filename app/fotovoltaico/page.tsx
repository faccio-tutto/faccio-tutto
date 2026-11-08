"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BatteryCharging,
  Home,
  Sun,
  ClipboardCheck,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  Linkedin,
  ArrowDownRight,
} from "lucide-react";
import {
  FaWrench,
  FaPhone,
  FaDraftingCompass,
  FaSolarPanel,
  FaWind,
  FaDoorOpen,
  FaInstagramSquare,
  FaLinkedin,
  FaArrowRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function EnergyLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];

  return (
    <main>
      {/* NAVBAR PREMIUM */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/5">

  <div className="px-6 md:px-12 py-4 flex justify-between items-center">

    <div className="flex items-center gap-6">

      <Link href="/">
        <Image
          src="/logo faccio tutto 3.png"
          alt="Logo"
          width={100}
          height={100}
        />
      </Link>

      <div className="hidden md:flex items-center gap-3 text-xs tracking-wider uppercase font-bold text-neutral-300">

        <span>faccio-tutto.it</span>

        <a
          href="https://www.instagram.com/infofacciotutto/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaInstagramSquare className="text-base" />
        </a>

        <a
          href="https://www.linkedin.com/company/faccio-tutto/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaLinkedin className="text-base" />
        </a>

      </div>

    </div>

    {/* Desktop Menu */}

    <ul className="hidden lg:flex gap-10 text-[11px] uppercase tracking-[0.25em] text-white/60">

      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="hover:text-white transition duration-200"
          >
            {item.name}
          </Link>
        </li>
      ))}

    </ul>

    {/* Mobile Button */}

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="lg:hidden text-white text-2xl"
      aria-label="Apri menu"
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>

  </div>

  {/* Mobile Menu */}

  <AnimatePresence>

    {menuOpen && (

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
      >

        <div className="flex flex-col">

          {menuItems.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-5 text-white uppercase tracking-widest text-sm border-b border-white/10 hover:bg-white/5"
            >
              {item.name}
            </Link>

          ))}

          <div className="flex justify-center gap-6 py-6">

            <a
              href="https://www.instagram.com/infofacciotutto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <FaInstagramSquare />
            </a>

            <a
              href="https://www.linkedin.com/company/faccio-tutto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

      </motion.div>

    )}

  </AnimatePresence>

</nav>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070"
          alt="Fotovoltaico"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            Energia per il futuro
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">
            Fotovoltaico, accumulo e riqualificazione energetica
            con progettazione e installazione professionale.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/preventivoFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Configura un preventivo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/CalcolatoreFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/55 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Calcola la produzione
                <ArrowDownRight className="h-4 w-4" />
              </Link>
            </div>
<div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              {["Progettazione su misura", "Fotovoltaico e accumulo", "Supporto dedicato"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" />
                    {item}
                  </span>
                ),
              )}
            </div>
        </motion.div>
      </section>

      {/* SECTION POWER */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="relative h-[500px] md:h-auto">
          <img
            src="/images/accumulo.png"
            alt="Accumulo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center px-8 md:px-20 py-20">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 inline-flex h-14 w-18 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/10 text-blue-300">
              <BatteryCharging className="h-10 w-10" />
            </div>

            <div className="text-4xl md:text-4xl font-semibold mb-6">
              Accumula la tua energia
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Impianti fotovoltaici con sistemi di accumulo intelligenti progettati per ridurre
              i consumi energetici e aumentare l’autonomia della tua casa.
            </p>
            
            <button
              onClick={() => router.push("/accumulo")}
              className="border border-white flex items-center gap-2 px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Scopri i nostri sistemi
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

            {/* SECTION SOLAR */}
      <section className="relative min-h-screen flex items-center">
        <Image
          src="/images/fotovoltaicoaltaefficienza.png"
          alt="Pannelli di un impianto fotovoltaico"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-5xl px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Sun className="w-14 h-14 mb-6 text-yellow-400" />

            <h2 className="text-5xl md:text-4xl font-semibold leading-tight mb-8">
              Componenti e progetto: ogni scelta conta
            </h2>

            <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
              Soluzioni per abitazioni e aziende che considerano componenti,
              consumi e caratteristiche del sito, con supporto sui passaggi
              previsti per il progetto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/CalcolatoreFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Calcola la produzione
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/preventivoFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/55 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Configura un preventivo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-neutral-900 md:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Una scelta consapevole
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Come si valuta un impianto fotovoltaico
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              La potenza non si sceglie in base alla sola superficie del tetto.
              Una prima valutazione mette in relazione i consumi, gli orari di
              utilizzo e le caratteristiche dell’edificio.
            </p>
            <Link
              href="/CalcolatoreFV"
              className="mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Stima la produzione
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Consumi e abitudini",
                text: "Le fasce orarie in cui usi energia aiutano a stimare quanta produzione puoi autoconsumare direttamente.",
              },
              {
                title: "Tetto e ombreggiamenti",
                text: "Orientamento, inclinazione, ombre e spazio disponibile influiscono sulla produzione attesa.",
              },
              {
                title: "Inverter e moduli",
                text: "I componenti vanno scelti in base al progetto, alle condizioni di installazione e alla compatibilità del sistema.",
              },
              {
                title: "Accumulo e pratiche",
                text: "La batteria non è adatta a tutti i profili. Costi, requisiti e pratiche vanno verificati sul caso specifico.",
              },
            ].map(({ title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
              </article>
            ))}

            <div className="sm:col-span-2">
              <p className="text-sm leading-6 text-neutral-600">
                Per confrontare i componenti, consulta anche i{" "}
                <Link
                  href="/accumulo"
                  className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
                >
                  sistemi e le schede tecniche disponibili
                </Link>
                . Per informazioni aggiornate su regole e incentivi, fai
                riferimento alle fonti ufficiali del{" "}
                <a
                  href="https://www.gse.it/servizi-per-te/fotovoltaico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
                >
                  GSE
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6 md:px-20 bg-[#0f1115]">
        <div className="max-w-7xl mx-auto">

          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Un percorso semplice e seguito
            </p>
            <h2 className="mb-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Dalla prima valutazione al tuo impianto
            </h2>
            <p className="max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Un punto di riferimento per orientarti tra progettazione,
              componenti e passaggi necessari alla realizzazione.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: Home,
                number: "01",
                title: "Analisi delle esigenze",
                text: "Partiamo dall’immobile, dai consumi e dagli obiettivi per individuare una configurazione adatta.",
                color: "text-emerald-300",
              },
              {
                icon: Sun,
                number: "02",
                title: "Progetto energetico",
                text: "Valutiamo moduli, inverter e, se utile, un sistema di accumulo coerente con il progetto.",
                color: "text-amber-300",
              },
              {
                icon: ClipboardCheck,
                number: "03",
                title: "Supporto e pratiche",
                text: "Ti accompagniamo nei passaggi organizzativi e nelle pratiche previste per l’intervento.",
                color: "text-blue-300",
              },
            ].map(({ icon: Icon, number, title, text, color }) => (
              <article
                key={number}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.18em] text-white/35">
                    {number}
                  </span>
                  <Icon className={`h-7 w-7 ${color}`} />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


            <section className="bg-[#0f1115] px-6 py-24 md:px-20">
              <div className="mx-auto max-w-4xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Risposte utili
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Domande frequenti sugli impianti fotovoltaici
                </h2>
                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {[
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
                      question:
                        "È possibile aggiungere l’accumulo a un impianto esistente?",
                      answer:
                        "In molti casi si può valutare un sistema di accumulo anche su un impianto esistente, ma la compatibilità dipende dall’inverter, dalla configurazione elettrica e dai componenti installati. Serve una verifica tecnica del caso specifico.",
                    },
                    {
                      question: "Dove posso verificare incentivi e regole aggiornate?",
                      answer:
                        "Requisiti, scadenze e incentivi possono cambiare. Per le informazioni aggiornate consulta le comunicazioni e i servizi ufficiali del Gestore dei Servizi Energetici (GSE) e verifica le condizioni applicabili al tuo intervento.",
                    },
                  ].map(({ question, answer }) => (
                    <details key={question} className="group py-5">
                      <summary className="cursor-pointer list-none pr-8 text-base font-semibold marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg">
                        {question}
                        <span
                          aria-hidden="true"
                          className="float-right text-emerald-300 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="max-w-3xl pt-4 text-sm leading-7 text-gray-300">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

      {/* SECTION SOLAR */}
      <section className="relative min-h-screen flex items-center">
        <img
          src="/images/fotovoltaicoaltaefficienza.png"
          alt="Solar"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-5xl px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Sun className="w-14 h-14 mb-6 text-yellow-400" />

            <div className="text-5xl md:text-4xl font-semibold leading-tight mb-8">
              Fotovoltaico ad alta efficienza
            </div>

            <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
              Soluzioni avanzate per abitazioni e aziende con gestione
              completa pratiche, incentivi e installazione certificata.
                       </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/CalcolatoreFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Calcola la produzione
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/preventivoFV"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/55 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Configura un preventivo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

            {/* CTA FINAL */}
      <section className="relative overflow-hidden py-28 text-center sm:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0f1115]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-4xl px-6"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Il prossimo passo
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Valutiamo insieme il tuo progetto
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Raccontaci cosa ti serve: ti aiuteremo a capire quale soluzione
            fotovoltaica può essere adatta alla tua casa o attività.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contatti"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-sm font-semibold text-black transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Parla con noi
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/preventivoFV"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Crea un preventivo
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="w-full text-center py-8 bg-black border-t border-neutral-900 text-[10px] text-neutral-500 font-medium tracking-[0.15em] uppercase flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <span className="text-neutral-600">faccio-tutto.it © {new Date().getFullYear()}</span>
        <Link href="/privacy" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Privacy e Note Legali
        </Link>
        <Link href="/contatti" className="hover:text-neutral-300 transition underline-offset-2 hover:underline">
          Contatti
        </Link>
      </footer>


    </main>
  );
}