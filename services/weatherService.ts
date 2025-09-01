
import type { ForecastData, ForecastEntry, DailyForecast } from '../types';

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const generateForecastEntry = (date: Date): ForecastEntry => {
  const hour = date.getHours();
  
  // Simulate diurnal patterns
  const tempVariation = Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 5; // Varies over the day
  const windVariation = Math.sin((hour / 24) * Math.PI * 2) * 0.5 + 0.8; // Stronger in afternoon

  const windSpeed = getRandom(5, 20) * windVariation;
  const windGust = windSpeed * getRandom(1.2, 1.5);
  const windDirection = getRandom(0, 360);
  const waveHeight = windSpeed / 10 + getRandom(0.1, 0.5);
  const wavePeriod = getRandom(4, 10);
  const temperature = 18 + tempVariation + getRandom(-1, 1);
  const cloudCover = getRandom(0, 100);
  const precipitation = cloudCover > 70 ? getRandom(0, 2) : 0;

  return {
    time: date.toISOString(),
    windSpeed: Math.round(windSpeed),
    windGust: Math.round(windGust),
    windDirection: Math.round(windDirection),
    waveHeight: parseFloat(waveHeight.toFixed(1)),
    wavePeriod: Math.round(wavePeriod),
    temperature: Math.round(temperature),
    cloudCover: Math.round(cloudCover),
    precipitation: parseFloat(precipitation.toFixed(1)),
  };
};

export const getForecast = (): Promise<ForecastData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      now.setMinutes(0, 0, 0);

      const dailyForecasts: DailyForecast = {};

      for (let d = 0; d < 5; d++) { // 5 days of forecast
        const day = new Date(now);
        day.setDate(day.getDate() + d);
        const dayKey = day.toISOString().split('T')[0];
        dailyForecasts[dayKey] = [];

        for (let h = 0; h < 24; h += 3) { // 3-hour intervals
          const forecastDate = new Date(day);
          forecastDate.setHours(h);
          dailyForecasts[dayKey].push(generateForecastEntry(forecastDate));
        }
      }

      const data: ForecastData = {
        spotName: 'Arenales del Sol, Spain',
        generatedAt: new Date().toISOString(),
        dailyForecasts,
      };
      resolve(data);
    }, 1000); // Simulate network delay
  });
};