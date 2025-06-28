import React, { useEffect, useState } from 'react';

function App() {
  const [pogoda, setPogoda] = useState('Ładowanie...');
  const [miasto, setMiasto] = useState('Warsaw');
  const [ikona, setIkona] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  
  useEffect(() => {
    pobierzPogode(miasto);
  }, [miasto]);

  async function pobierzPogode(miasto) {
    try {
      setFadeIn(false);
      const response = await fetch(`http://localhost:5000/pogoda?miasto=${miasto}`);
      const dane = await response.json();
      setPogoda(`Pogoda w ${dane.miasto}: ${dane.temp}°C, ${dane.opis}`);
      setIkona(`https://openweathermap.org/img/wn/${dane.ikona}@2x.png`);
      setTimeout(() => setFadeIn(true), 50);
    } catch (err) {
      setPogoda('Nie udało się pobrać pogody.');
      setIkona(null);
      setFadeIn(true);

    }
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000',
      color: '#fff',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%' // <-- WAŻNE!
      }}>
        {ikona && (
          <img
            src={ikona}
            alt="ikona pogody"
            style={{ width: '150px', height: '150px', marginBottom: '20px', opacity: fadeIn ? 1:0, transition: 'opacity 0.6s ease' }}
          />
        )}

        <div style={{
          fontSize: '24px',
          marginBottom: '20px',
          maxWidth: '90vw',
          wordWrap: 'break-word',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          {pogoda}
        </div>

        <select
          value={miasto}
          onChange={(e) => setMiasto(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#222',
            color: '#fff'
          }}
        >
          <option value="Warsaw">Warszawa</option>
          <option value="Krakow">Kraków</option>
          <option value="Gdansk">Gdańsk</option>
          <option value="Wroclaw">Wrocław</option>
          <option value="Poznan">Poznań</option>
          <option value="Bydgoszcz">Bydgoszcz</option>
        </select>
      </div>
    </div>
  );
}

export default App;
