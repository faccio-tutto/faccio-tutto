"use client";

import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
    return (
        <div>
            <Head>
                <title>Contattaci</title>
                <meta name="description" content="Pagina di contatto del mio sito web" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Modulo di Contatto</h1>
                <p>Compila il modulo sottostante per contattarci.</p>
                <ContactForm /> {/* Inserisci qui il componente ContactForm */}
            </main>

            <footer>
                <p>© 2025 Il mio sito web</p>
            </footer>
        </div>
    );
}
