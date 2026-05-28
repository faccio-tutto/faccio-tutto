"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <Image
              src="/logo faccio tutto 3.png"
              alt="Logo"
              width={140}
              height={50}
              className="object-contain"
            />

            <span className="text-lg tracking-wide font-light">
              faccio-tutto.it
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            <Link href="/">Home</Link>
            <Link href="/mission">Mission</Link>
            <Link href="/vision">Vision</Link>
            <Link href="/contatti">Contatti</Link>
          </div>

          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://www.instagram.com/infofacciotutto/"
              target="_blank"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/faccio-tutto/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center">

        <Image
          src="/images/hero-professionale.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl px-6"
        >
          <h1 className="text-5xl md:text-8xl font-semibold tracking-tight leading-none">
            Ogni talento
            <br />
            merita spazio.
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Creiamo connessioni tra persone, competenze e opportunità reali.
          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">

            <Link
              href="/affiliazione"
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Unisciti a noi
            </Link>

            <Link
              href="/contatti"
              className="border border-white/40 px-8 py-4 rounded-full hover:bg-white/10 transition"
            >
              Scopri di più
            </Link>

          </div>
        </motion.div>
      </section>

      {/* SECTION 1 */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center px-6">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/talento.jpg"
              alt="Talento"
              width={900}
              height={700}
              className="rounded-3xl object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-semibold leading-tight">
              Le persone
              <br />
              prima di tutto.
            </h2>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed">
              Crediamo che ogni individuo possieda capacità straordinarie
              spesso invisibili nel mondo del lavoro tradizionale.
            </p>

            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              La nostra missione è trasformare queste capacità
              in opportunità concrete.
            </p>
          </motion.div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-32 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-semibold">
              Un nuovo modo di lavorare
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Talento",
                text: "Valorizziamo le capacità autentiche delle persone."
              },
              {
                title: "Community",
                text: "Creiamo connessioni professionali reali."
              },
              {
                title: "Opportunità",
                text: "Trasformiamo competenze in lavoro e crescita."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10"
              >
                <h3 className="text-3xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* PARALLAX IMAGE */}
      <section className="relative h-[80vh] flex items-center justify-center">

        <Image
          src="/images/community.jpg"
          alt="Community"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6">
          <div className="text-5xl md:text-7xl font-semibold max-w-4xl leading-tight">
            Un network costruito
            <br />
            sul valore umano.
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-black">
        <div className="text-5xl md:text-7xl font-semibold">
          Inizia oggi.
        </div>

        <p className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto">
          Entra in una piattaforma dove le competenze diventano opportunità reali.
        </p>

        <Link
          href="/contatti"
          className="inline-flex items-center gap-4 mt-12 bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:scale-105 transition"
        >
          Contattaci
          <FaArrowRight />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} faccio-tutto.it
      </footer>

    </main>
  );
}