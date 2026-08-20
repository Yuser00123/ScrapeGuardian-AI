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
import { mockHealthTrendData } from '../../data/mockData';

export const CollectorHealthTrendChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockHealthTrendData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="healthyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="degradedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
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
            domain={[35, 50]}
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
            itemStyle={{ color: '#F9FAFB' }}
          />

          <Area
            type="monotone"
            dataKey="healthy"
            name="Healthy Collectors"
            stroke="#22C55E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#healthyGradient)"
          />
          <Area
            type="monotone"
            dataKey="degraded"
            name="Degraded / Healing"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#degradedGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
