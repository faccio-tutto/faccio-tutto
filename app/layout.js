import './globals.css'
// import type { Metadata } from 'next'

export const metadata = {
  title: 'faccio-tutto.it',
  description: 'Progettazione, installazioni, riparazioni e risparmio energetico: faccio-tutto.it è il tuo punto di riferimento per servizi affidabili e su misura',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}