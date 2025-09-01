import type { ForecastData, ForecastEntry, DailyForecast } from '../types';

export const getMockForecast = (): ForecastData => {
  const spotName = 'Arenales del Sol, Spain (Datos de Ejemplo)';
  const now = new Date();
  const dailyForecasts: DailyForecast = {};

  const generateRandomEntry = (baseDate: Date, hourIndex: number): ForecastEntry => {
    const entryDate = new Date(baseDate);
    entryDate.setHours(hourIndex * 3, 0, 0, 0);

    // Simular ciclo de temperatura diurno
    const tempFluctuation = Math.sin((entryDate.getHours() - 6) / 12 * Math.PI) * 6; // Pico a las 15:00
    const temp = 18 + tempFluctuation + (Math.random() - 0.5) * 2;
    const windSpeed = 8 + Math.random() * 12;

    return {
      time: entryDate.toISOString(),
      temperature: Math.round(temp),
      feelsLike: Math.round(temp - windSpeed / 10), // Fórmula simplificada
      cloudCover: Math.floor(Math.random() * 70) + 10,
      windSpeed: Math.round(windSpeed),
      windGust: Math.round(windSpeed + Math.random() * 5),
      windDirection: Math.floor(Math.random() * 360),
      precipitation: Math.random() > 0.9 ? parseFloat((Math.random() * 2).toFixed(1)) : 0,
    };
  };

  for (let i = 0; i < 5; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() + i);
    const dayKey = day.toISOString().split('T')[0];
    dailyForecasts[dayKey] = [];
    for (let j = 0; j < 8; j++) { // 8 entradas por día, cada 3 horas
      dailyForecasts[dayKey].push(generateRandomEntry(day, j));
    }
  }

  return {
    spotName,
    generatedAt: new Date().toISOString(),
    dailyForecasts,
  };
};