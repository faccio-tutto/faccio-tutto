"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPhone,
  FaArrowRight,
  FaFire,
  FaSnowflake,
  FaWater,
  FaSolarPanel,
  FaTools,
  FaInstagramSquare,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function RiparazioniVelociPage() {
  const [loading, setLoading] = useState(false);
  const [messaggio, setMessaggio] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
const menuItems = [
    { name: "Architettura", href: "/progettazione" },
    { name: "Fotovoltaico", href: "/fotovoltaico" },
    { name: "Infissi", href: "/infissi" },
    { name: "Climatizzazione", href: "/climatizzazione" },
    { name: "Riparazioni", href: "/riparazioni-veloci" },
    { name: "Contatti", href: "/prenota" },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    setLoading(true);
    setMessaggio("");

    const formData = new FormData(form);

    const dati = {
      nome: formData.get("nome"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      comune: formData.get("comune"),
      messaggio: formData.get("messaggio"),
      destinatarioEmail: "info@faccio-tutto.it",
    };

    try {
      const res = await fetch("/api/invia-email-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dati),
      });

      if (res.ok) {
        setMessaggio("Richiesta inviata correttamente.");
        form.reset();
      } else {
        setMessaggio("Errore durante l'invio.");
      }
    } catch {
      setMessaggio("Errore di connessione.");
    }

    setLoading(false);
  };

  const services = [
    {
      title: "Caldaie e riscaldamento",
      desc: "Installazione, manutenzione e sostituzione caldaie ad alta efficienza.",
      icon: <FaFire />,
      img: "/images/caldaie.jpg",
    },
    {
      title: "Pompe di calore",
      desc: "Sistemi ad alta efficienza per riscaldamento e raffrescamento.",
      icon: <FaSnowflake />,
      img: "/images/pompe-calore.png",
    },
    {
      title: "Impianti a pavimento",
      desc: "Comfort termico uniforme e risparmio energetico garantito.",
      icon: <FaWater />,
      img: "/images/pavimento-radiante.png",
    },
    {
      title: "Solare termico",
      desc: "Produzione di acqua calda sanitaria con energia solare.",
      icon: <FaSolarPanel />,
      img: "/images/solare-termico.png",
    },
    {
      title: "Climatizzazione",
      desc: "Sistemi caldo/freddo per ambienti domestici e commerciali.",
      icon: <FaSnowflake />,
      img: "/images/climatizzazione.png",
    },
    {
      title: "Manutenzione impianti",
      desc: "Assistenza tecnica e controlli periodici certificati.",
      icon: <FaTools />,
      img: "/images/manutenzione-impianti.png",
    },
  ];

  return (
     <main className="bg-black text-white overflow-hidden">
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
      <header className="relative h-screen flex items-center justify-center text-center px-6">
        <Image
          src="/images/hero-riparazioni.jpg"
          alt="Impianti termici"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-3xl text-white space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light"
          >
            Impianti Termici e Climatizzazione
          </motion.h1>

          <p className="text-neutral-200 text-sm md:text-base">
            Soluzioni professionali per caldaie, pompe di calore, impianti a pavimento e solare termico.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="#contatti"
              className="bg-white text-black px-6 py-3 rounded-full text-xs uppercase tracking-widest"
            >
              Richiedi preventivo
            </Link>

            <Link
              href="#servizi"
              className="border border-white px-6 py-3 rounded-full text-xs uppercase tracking-widest"
            >
              Scopri servizi
            </Link>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center space-y-6">
        <h2 className="text-3xl font-light">
          Comfort, efficienza e tecnologia per la tua casa
        </h2>
        <p className="text-neutral-600">
          Interveniamo su impianti moderni ed evoluti per garantire efficienza energetica e massimo comfort abitativo.
        </p>
      </section>

      {/* SERVICES */}
      <section id="servizi" className="bg-neutral-50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="text-xl flex items-center gap-2">
                  {s.icon}
                  {s.title}
                </div>
                <p className="text-sm text-neutral-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA NUMBERS */}
      <section className="bg-black text-white py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">

          <div>
            <div className="text-4xl font-light">24h</div>
            <div className="text-xs text-neutral-400">Intervento medio</div>
          </div>

          <div>
            <div className="text-4xl font-light">100+</div>
            <p className="text-xs text-neutral-400">Impianti seguiti</p>
          </div>

          <div>
            <div className="text-4xl font-light">99%</div>
            <p className="text-xs text-neutral-400">Clienti soddisfatti</p>
          </div>

          <div>
            <div className="text-4xl font-light">1</div>
            <p className="text-xs text-neutral-400">Referente unico</p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contatti" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-light text-center mb-10">
          Richiedi un preventivo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-4">
            <input name="nome e cognome" placeholder="Nome e Cognome" className="border p-3 rounded-xl" required />
            <input name="telefono" placeholder="Telefono" className="border p-3 rounded-xl" required />
          </div>

          <input name="email" placeholder="Email" className="border p-3 rounded-xl w-full" required />

          <input name="comune" placeholder="Comune" className="border p-3 rounded-xl w-full" />

          <textarea
            name="messaggio"
            placeholder="Descrivi il tuo impianto o problema"
            className="border p-3 rounded-xl w-full h-32"
            required
          />

          <button
            disabled={loading}
            className="bg-black text-white w-full py-4 rounded-full text-xs uppercase tracking-widest"
          >
            {loading ? "Invio..." : "Invia richiesta"}
          </button>

          {messaggio && (
            <p className="text-center text-sm text-neutral-600">{messaggio}</p>
          )}

        </form>
      </section>

     <footer
  className="text-center py-8 bg-white border-t border-neutral-100 text-[11px] text-black font-bold tracking-wider uppercase space-y-2 md:space-y-0 md:space-x-6"
  style={{ backgroundColor: '#ffffff', borderColor: '#f5f5f5', color: '#000000' }}
>
  <span>faccio-tutto.it &copy; {new Date().getFullYear()}</span>

  <Link
    href="/privacy"
    className="hover:opacity-70 transition"
  >
    Privacy e Note Legali
  </Link>

  <Link
    href="/contatti"
    className="hover:opacity-70 transition"
  >
    Contatti
  </Link>
</footer>

     </main>
  );
}