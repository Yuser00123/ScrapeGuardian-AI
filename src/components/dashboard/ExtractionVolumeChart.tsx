import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Globe } from 'lucide-react';

export const ExtractionVolumeChart: React.FC = () => {
  const { brightDataStatus, datasetExecutions } = useApp();

  const baseRecords = brightDataStatus?.totalRecordsCollected || 1489200;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = days.map((day, idx) => {
    // Derive daily record distribution from dataset executions and daily base slice
    const dayExecs = datasetExecutions.filter((exec) => {
      const d = new Date(exec.timestamp);
      return (d.getDay() + 6) % 7 === idx;
    });
    const execRecords = dayExecs.reduce((acc, curr) => acc + (curr.recordsCount || 100), 0);
    const dailyBase = Math.round(baseRecords / 7);
    const records = dailyBase + execRecords;
    const bandwidth = Math.round((records * 0.00035) * 10) / 10;
    return {
      day,
      records,
      bandwidth,
    };
  });

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          <Globe className="h-3 w-3 text-emerald-400" />
          Source: Bright Data SERP Ingestion ({datasetExecutions.length} Datasets Active)
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Bright Data
        </span>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            
            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
              formatter={(value: unknown, name: string | undefined) => [
                name === 'records' ? `${Number(value).toLocaleString()} records` : `${value} GB`,
                name === 'records' ? 'Extracted Records' : 'Bandwidth (GB)',
              ]}
            />

            <Area
              type="monotone"
              dataKey="records"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#volumeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

