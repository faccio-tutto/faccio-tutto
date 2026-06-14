import React from 'react';
import styles from './ProductivityTracker.module.css';

interface ProductivityTrackerProps {
  location: string;      // Es: "Milano", "Roma", "Palermo"
  inclination: number;   // Inclinazione in gradi (es: 30)
}

export default function ProductivityTracker({ location, inclination }: ProductivityTrackerProps) {
  
  // FUNZIONE DI CALCOLO DINAMICO DEL RENDIMENTO (PR)
  const calculatePerformanceRatio = (loc: string, tilt: number): number => {
    let prBase = 85; // 85% di efficienza massima teorica stimata
    
    // 1. Calcolo perdite termiche in base alla località (città più calde = più perdite)
    let temperatureLoss = 0;
    const normalizedLoc = loc.toLowerCase().trim();
    
    if (normalizedLoc === 'palermo' || normalizedLoc === 'catania' || normalizedLoc === 'napoli') {
      temperatureLoss = 5; // Il sud soffre di più il calore estivo
    } else if (normalizedLoc === 'roma' || normalizedLoc === 'firenze') {
      temperatureLoss = 3; // Centro Italia
    } else if (normalizedLoc === 'milano' || normalizedLoc === 'torino') {
      temperatureLoss = 1; // Al nord fa più fresco, i pannelli lavorano meglio
    } else {
      temperatureLoss = 3; // Fallback per altre località
    }

    // 2. Calcolo perdite per inclinazione (TILT)
    // Sotto i 15° la pioggia non lava i pannelli (soiling). Sopra i 50° c'è troppo riflesso.
    let tiltLoss = 0;
    if (tilt < 15) {
      tiltLoss = 4; // Perdita per accumulo sporcizia
    } else if (tilt > 50) {
      tiltLoss = 2; // Perdita per angolo di incidenza della luce
    } else {
      tiltLoss = 0; // Tra 15° e 50° l'inclinazione è ottimale per il rendimento interno
    }

    // Risultato finale
    const finalPR = prBase - temperatureLoss - tiltLoss;
    
    // Sicurezza per non sforare i limiti 0-100
    return Math.max(0, Math.min(100, finalPR));
  };

  // Eseguiamo il calcolo in tempo reale
  const currentPR = calculatePerformanceRatio(location, inclination);

  // Determina la classe colore in base al risultato ottenuto
  const getColorClass = (val: number) => {
    if (val >= 80) return styles.high;    // Verde
    if (val >= 76) return styles.medium;  // Arancione
    return styles.low;                    // Rosso
  }

  return (
    <div className={styles.container}>
      
      {/* 1. SEZIONE ICONA + TESTO */}
      <div className={styles.infoSection}>
        <svg 
          className={styles.icon} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        
        <div className={styles.textContainer}>
          <span className={styles.label}>Rendimento Sistema ({location}):</span>
          <span className={styles.value}>{currentPR}%</span>
        </div>
      </div>

      {/* 2. BARRA GRAFICA DINAMICA */}
      <div className={styles.progressTrack}>
        <div 
          className={`${styles.progressBar} ${getColorClass(currentPR)}`}
          style={{ width: `${currentPR}%` }}
        />
      </div>

    </div>
  );
}