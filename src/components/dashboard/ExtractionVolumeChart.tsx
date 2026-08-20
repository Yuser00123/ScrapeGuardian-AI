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
import { mockExtractionVolumeData } from '../../data/mockData';

export const ExtractionVolumeChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockExtractionVolumeData}
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
            tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
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
  );
};
