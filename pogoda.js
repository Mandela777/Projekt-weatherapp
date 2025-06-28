const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require("cors");

const app = express();
const PORT = 5000;
 
app.use(cors());

app.get("/pogoda", async (req, res) => {
  const miasto = req.query.miasto || "Warsaw";
  const apiKey = "a6088887607c0c145b1b0a24dd79e166";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${apiKey}&units=metric&lang=pl`;

  try {
    const response = await fetch(url);
    console.log("URL który wysyłam do API:", url);
    console.log("Kod odpowiedzi:", response.status);

    const dane = await response.json();
    console.log("=== OTRZYMANE DANE Z API ===");
    console.log(JSON.stringify(dane, null, 2));

    if (!dane.main || !dane.weather || !dane.weather[0]) {
      return res.status(500).json({ error: "Brak danych pogodowych", dane });
    }

    const wynik = {
      temp: dane.main.temp,
      opis: dane.weather[0].description,
      miasto: miasto,
      ikona: dane.weather[0].icon
    };

    res.json(wynik);
  } catch (err) {
    console.error("Błąd w pobieraniu danych z API:", err);
    res.status(500).json({ error: "Błąd pobierania pogody", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer backend działa na http://localhost:${PORT}`);
});

