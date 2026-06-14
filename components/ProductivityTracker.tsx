import React from 'react';
import styles from './ProductivityTracker.module.css';

interface ProductivityTrackerProps {
  value: number; // Accetta un numero (es. 85, 42, 15)
}

export default function ProductivityTracker({ value }: ProductivityTrackerProps) {
  // Sicurezza: costringe il valore a rimanere nel range tra 0 e 100
  const validatedValue = Math.max(0, Math.min(100, value));

  // Funzione che assegna la classe CSS corretta in base alla percentuale
  const getColorClass = (val: number) => {
    if (val >= 75) return styles.high;    // Verde
    if (val >= 40) return styles.medium;  // Arancione
    return styles.low;                    // Rosso
  };

  return (
    <div className={styles.container}>
      
      {/* 1. SEZIONE ICONA + TESTO (Impatto zero sulle sovrapposizioni grazie al CSS) */}
      <div className={styles.infoSection}>
        {/* Icona SVG nativa del battito/attività */}
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
          <span className={styles.label}>Producibilità:</span>
          <span className={styles.value}>{validatedValue}%</span>
        </div>
      </div>

      {/* 2. ELEMENTO GRAFICO (Barra di avanzamento fluida e dinamica) */}
      <div className={styles.progressTrack}>
        <div 
          /* Unisce la classe strutturale della barra con quella cromatica dinamica */
          className={`${styles.progressBar} ${getColorClass(validatedValue)}`}
          /* Applica la larghezza dinamica in linea basata sulla prop */
          style={{ width: `${validatedValue}%` }}
        />
      </div>

    </div>
  );
}