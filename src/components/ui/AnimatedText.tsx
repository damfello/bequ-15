'use client';

import { useState, useEffect } from 'react';
import styles from './AnimatedText.module.css';

const phrases = [
  'MedTech regulations',
  'regulatory monitoring',
  'MedTech classifications'
];

export default function AnimatedText() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setCurrentPhrase(phrases[index]);
    }, 4000); // Cambia la frase cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-900 text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold my-2">
        BeQu simplifies
      </h1>
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        <h2 key={currentPhrase} className={`${styles.slideIn} text-xl sm:text-2xl md:text-3xl lg:text-7xl text-pink-500 font-semibold`}>
          {currentPhrase}
        </h2>
      </div>
      <p className="text-xl sm:text-2xl my-4">
        Tailored to Medical Devices certifications requirements in EU market
      </p>
    </div>
  );
}
