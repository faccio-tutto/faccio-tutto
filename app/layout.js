import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.faccio-tutto.it'),
  title: {
    default: 'faccio-tutto.it',
    template: '%s | faccio-tutto.it',
  },
  description:
    'Progettazione, installazioni, riparazioni e risparmio energetico: faccio-tutto.it è il tuo punto di riferimento per servizi affidabili e su misura.',
  keywords: [
    'fotovoltaico',
    'infissi',
    'bonus casa',
    'efficientamento energetico',
    'ristrutturazioni',
    'energie rinnovabili',
    'installazioni',
  ],
    openGraph: {
    title: 'faccio-tutto.it',
    description:
      'Progettazione, installazioni, riparazioni e risparmio energetico: scopri come migliorare la tua casa con faccio-tutto.it',
    url: 'https://www.faccio-tutto.it',
    siteName: 'faccio-tutto.it',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // opzionale: aggiungi un’immagine 1200x630 per la condivisione
        width: 1200,
        height: 630,
        alt: 'faccio-tutto.it',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
 robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.faccio-tutto.it',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}