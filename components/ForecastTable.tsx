import React from 'react';
import type { ForecastEntry } from '../types';
import WindArrow from './WindArrow';
import { WeatherIcon } from './Icons';

interface ForecastTableProps {
  data: ForecastEntry[];
}

const getTemperatureColor = (temp: number): string => {
  if (temp < 10) return 'bg-blue-100 text-blue-800';
  if (temp < 20) return 'bg-cyan-100 text-cyan-800';
  if (temp < 25) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
};

const getCloudColor = (cover: number): string => {
    if (cover < 25) return 'bg-slate-100 text-slate-700';
    if (cover < 75) return 'bg-slate-200 text-slate-800';
    return 'bg-slate-300 text-slate-900';
};

const getWindColor = (speed: number): string => {
  if (speed < 10) return 'bg-green-100 text-green-800';
  if (speed < 15) return 'bg-lime-100 text-lime-800';
  if (speed < 20) return 'bg-yellow-100 text-yellow-800';
  if (speed < 25) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

const getWaveColor = (height: number): string => {
  if (height < 1) return 'bg-sky-100 text-sky-800';
  if (height < 2) return 'bg-blue-100 text-blue-800';
  if (height < 3) return 'bg-indigo-100 text-indigo-800';
  return 'bg-purple-100 text-purple-800';
};

const DesktopTable: React.FC<{ data: ForecastEntry[] }> = ({ data }) => {
  const renderRow = (label: string, key: keyof ForecastEntry | 'time' | 'weather') => (
    <div className="grid grid-cols-9 text-center items-center">
      <div className="col-span-2 text-left font-semibold text-slate-700 py-3 px-2 text-sm">{label}</div>
      {data.map((entry, index) => {
        let content;
        switch (key) {
          case 'time':
            content = <span className="font-bold text-slate-800">{new Date(entry.time).getHours()}:00</span>;
            break;
          case 'temperature':
             content = (
              <div className={`w-full h-full flex items-center justify-center p-2 rounded-md ${getTemperatureColor(entry.temperature)}`}>
                <span className="font-bold text-lg">{entry.temperature}°</span>
              </div>
            );
            break;
          case 'cloudCover':
             content = (
              <div className={`w-full h-full flex items-center justify-center p-2 rounded-md ${getCloudColor(entry.cloudCover)}`}>
                <span className="font-bold text-lg">{entry.cloudCover}%</span>
              </div>
            );
            break;
          case 'windSpeed':
            content = (
              <div className={`w-full h-full flex flex-col items-center justify-center p-1 rounded-md ${getWindColor(entry.windSpeed)}`}>
                <span className="font-bold text-lg">{entry.windSpeed}</span>
                <span className="text-xs">{entry.windGust}</span>
              </div>
            );
            break;
          case 'windDirection':
            content = (
              <div className="flex flex-col items-center justify-center">
                <WindArrow degrees={entry.windDirection} />
                <span className="text-xs text-slate-500 mt-1">{entry.windDirection}°</span>
              </div>
            );
            break;
          case 'waveHeight':
             content = (
              <div className={`w-full h-full flex items-center justify-center p-2 rounded-md ${getWaveColor(entry.waveHeight)}`}>
                <span className="font-bold text-lg">{entry.waveHeight}</span>
              </div>
            );
            break;
          case 'weather':
            content = (
              <div className="flex flex-col items-center justify-center">
                <WeatherIcon cloudCover={entry.cloudCover} precipitation={entry.precipitation} />
                 {entry.precipitation > 0 && <span className="text-xs text-blue-500 mt-1">{entry.precipitation}mm</span>}
              </div>
            );
            break;
          default:
            content = <span>{entry[key as keyof ForecastEntry]}</span>;
            break;
        }
        return (
          <div key={index} className="flex items-center justify-center py-2 px-1 text-sm">
            {content}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header Row */}
        <div className="grid grid-cols-9 text-center bg-slate-100/70 font-bold sticky top-0 z-10">
          <div className="col-span-2 text-left py-3 px-2 text-sm text-sky-700">Parámetro</div>
          {data.map((entry) => (
            <div key={entry.time} className="py-3 px-1 text-sm text-sky-700">
              {new Date(entry.time).toLocaleTimeString('es-ES', { hour: '2-digit' })}h
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-slate-200">
          {renderRow('Temperatura (°C)', 'temperature')}
          {renderRow('Nubosidad (%)', 'cloudCover')}
          {renderRow('Viento (nudos)', 'windSpeed')}
          {renderRow('Dirección', 'windDirection')}
          {renderRow('Clima', 'weather')}
          {renderRow('Olas (m)', 'waveHeight')}
          {renderRow('Periodo (s)', 'wavePeriod')}
        </div>
      </div>
    </div>
  );
};

const MobileTable: React.FC<{ data: ForecastEntry[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto p-2">
      <div className="flex space-x-3">
        {data.map((entry, index) => (
          <div key={index} className="bg-white/70 rounded-lg p-3 w-32 flex-shrink-0 text-center shadow">
            <div className="font-bold text-sky-600 mb-3 pb-2 border-b border-slate-300">
              {new Date(entry.time).toLocaleTimeString('es-ES', { hour: '2-digit' })}h
            </div>
            <div className="space-y-3 text-sm">
              {/* Temperature */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Temp.</div>
                 <div className={`w-full flex items-center justify-center p-1 rounded-md ${getTemperatureColor(entry.temperature)}`}>
                    <span className="font-bold text-base">{entry.temperature}°C</span>
                  </div>
              </div>
              
               {/* Cloud Cover */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Nubes</div>
                 <div className={`w-full flex items-center justify-center p-1 rounded-md ${getCloudColor(entry.cloudCover)}`}>
                    <span className="font-bold text-base">{entry.cloudCover}%</span>
                  </div>
              </div>

              {/* Wind */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Viento</div>
                <div className={`w-full flex flex-col items-center justify-center p-1 rounded-md ${getWindColor(entry.windSpeed)}`}>
                  <span className="font-bold text-base">{entry.windSpeed}</span>
                  <span className="text-xs">{entry.windGust}</span>
                </div>
              </div>
              
              {/* Direction */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Dirección</div>
                <WindArrow degrees={entry.windDirection} />
                <span className="text-xs text-slate-500 mt-1">{entry.windDirection}°</span>
              </div>

              {/* Weather */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Clima</div>
                  <WeatherIcon cloudCover={entry.cloudCover} precipitation={entry.precipitation} />
                  {entry.precipitation > 0 && <span className="text-xs text-blue-500 mt-1">{entry.precipitation}mm</span>}
              </div>

              {/* Waves */}
              <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Olas</div>
                  <div className={`w-full flex items-center justify-center p-1 rounded-md ${getWaveColor(entry.waveHeight)}`}>
                    <span className="font-bold text-base">{entry.waveHeight}m</span>
                  </div>
              </div>
              
              {/* Period */}
                <div className="flex flex-col items-center">
                <div className="text-slate-500 mb-1 text-xs">Periodo</div>
                <span className="font-semibold">{entry.wavePeriod}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const ForecastTable: React.FC<ForecastTableProps> = ({ data }) => {
  return (
    <div className="bg-white/60 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopTable data={data} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <MobileTable data={data} />
      </div>
    </div>
  );
};

export default ForecastTable;