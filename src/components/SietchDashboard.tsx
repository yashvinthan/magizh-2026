import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Radio, ShieldAlert, Cpu, Wind, Droplets } from 'lucide-react';

export function SietchDashboard() {
  const [spiceYield, setSpiceYield] = useState(482.17);
  const [spiceTrend, setSpiceTrend] = useState(1.4);
  const [windSpeed, setWindSpeed] = useState(45.2);
  const [humidity, setHumidity] = useState(0.12);
  const [resonance, setResonance] = useState(68.4);
  const [sensorStatuses, setSensorStatuses] = useState([
    { id: 'SEN_S_01', name: 'West Ridge Sietch', status: 'OPTIMAL', color: 'text-emerald-500' },
    { id: 'SEN_S_02', name: 'Shield Wall Gate', status: 'SIGNAL DISTORTED', color: 'text-amber-500' },
    { id: 'SEN_S_03', name: 'Deep Desert Basin', status: 'WORM SIGN DETECTED', color: 'text-red-500 animate-pulse font-bold' },
    { id: 'SEN_S_04', name: 'Sietch Gathering Spire', status: 'CALIBRATING', color: 'text-blue-400' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate spice yield slightly
      setSpiceYield(prev => {
        const change = (Math.random() - 0.5) * 4.5;
        const next = parseFloat((prev + change).toFixed(2));
        setSpiceTrend(parseFloat(((change / prev) * 100).toFixed(2)));
        return next < 300 ? 300 : next;
      });

      // Fluctuate environment
      setWindSpeed(prev => {
        const delta = (Math.random() - 0.5) * 1.8;
        return parseFloat((prev + delta).toFixed(1));
      });

      setHumidity(prev => {
        const delta = (Math.random() - 0.5) * 0.01;
        const next = parseFloat((prev + delta).toFixed(2));
        return next < 0.05 ? 0.05 : next > 0.3 ? 0.3 : next;
      });

      // Resonance
      setResonance(prev => {
        const change = (Math.random() - 0.5) * 3;
        const next = parseFloat((prev + change).toFixed(1));
        return next < 10 ? 10 : next > 100 ? 100 : next;
      });

      // Randomly change a sensor status
      setSensorStatuses(prev => {
        const indexToChange = Math.floor(Math.random() * prev.length);
        const options = [
          { status: 'OPTIMAL', color: 'text-emerald-500' },
          { status: 'CALIBRATING', color: 'text-blue-400' },
          { status: 'WEATHER BURST', color: 'text-amber-400' },
          { status: 'SIETCH LINK OPEN', color: 'text-emerald-400' },
        ];
        // Leave the critical worm alert occasionally
        if (Math.random() < 0.15) {
          options.push({ status: 'WORM SIGN DETECTED', color: 'text-red-500 animate-pulse font-bold' });
        }
        
        const newStatus = options[Math.floor(Math.random() * options.length)];
        return prev.map((sensor, idx) => {
          if (idx === indexToChange) {
            return {
              ...sensor,
              status: newStatus.status,
              color: newStatus.color,
            };
          }
          return sensor;
        });
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-x border-b border-dune-border/60 bg-[#080808]/80 p-6 font-mono text-xs text-dune-sand-muted mb-8 relative z-10 rounded-b">
      {/* 1. Live Spice Yield Monitor */}
      <div className="border border-dune-border/40 p-4 bg-black/40 rounded flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-dune-border/30 pb-2 mb-3">
            <span className="text-[9px] tracking-widest text-[#ebd197] flex items-center gap-1.5 uppercase">
              <Activity size={12} className="text-dune-spice" />
              LIVE SPICE YIELD
            </span>
            <span className="text-[7.5px] font-bold text-dune-spice/70">HARVESTER_09</span>
          </div>
          <div className="py-2">
            <span className="text-3xl font-bold tracking-tight text-white">{spiceYield}</span>
            <span className="text-[9px] text-dune-sand-muted ml-1.5">KG/S</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[8px] border-t border-dune-border/20 pt-2 mt-2">
          <span>COEFFICIENT TREK:</span>
          <span className={spiceTrend >= 0 ? "text-emerald-500" : "text-amber-500"}>
            {spiceTrend >= 0 ? "▲" : "▼"} {Math.abs(spiceTrend)}% (2S_DEC)
          </span>
        </div>
      </div>

      {/* 2. Tactical Sensor Feeds */}
      <div className="border border-dune-border/40 p-4 bg-black/40 rounded flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-dune-border/30 pb-2 mb-2">
            <span className="text-[9px] tracking-widest text-[#ebd197] flex items-center gap-1.5 uppercase">
              <Radio size={12} className="text-dune-spice" />
              TACTICAL SENSOR SIGNALS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-2 py-1">
            {sensorStatuses.map((sensor) => (
              <div key={sensor.id} className="flex justify-between items-center text-[9px] leading-tight">
                <span className="text-dune-sand-muted/80">{sensor.id} // {sensor.name}</span>
                <span className={`text-[8.5px] uppercase tracking-wider ${sensor.color}`}>
                  {sensor.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Atmos observation & Sietch Resonance */}
      <div className="border border-dune-border/40 p-4 bg-black/40 rounded flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-dune-border/30 pb-2 mb-3">
            <span className="text-[9px] tracking-widest text-[#ebd197] flex items-center gap-1.5 uppercase">
              <Cpu size={12} className="text-dune-spice" />
              ATMOSPHERIC VECTORS
            </span>
            <span className="text-[7.5px] text-dune-sand-muted">SECTOR_O4</span>
          </div>
          <div className="grid grid-cols-2 gap-3 py-1">
            <div className="flex flex-col">
              <span className="text-[7.5px] uppercase tracking-wider text-dune-sand-muted">Wind Speed:</span>
              <span className="text-sm font-semibold text-white mt-1 flex items-center gap-1">
                <Wind size={10} className="text-dune-spice" />
                {windSpeed} km/h
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[7.5px] uppercase tracking-wider text-dune-sand-muted">Humidity level:</span>
              <span className="text-sm font-semibold text-white mt-1 flex items-center gap-1">
                <Droplets size={10} className="text-[#ebd197]" />
                {humidity}%
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-dune-border/20 pt-2 mt-2 flex items-center justify-between text-[8px]">
          <span>THUMPER RESONANCE FREQ:</span>
          <span className="text-[9px] font-bold text-dune-spice">{resonance} Hz</span>
        </div>
      </div>
    </div>
  );
}
