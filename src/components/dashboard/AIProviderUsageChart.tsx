import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { mockAIProviderUsageData } from '../../data/mockData';

export const AIProviderUsageChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockAIProviderUsageData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          <XAxis
            dataKey="time"
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
              name === 'geminiTokens' ? `${Number(value).toLocaleString()} tokens` : value,
              name === 'geminiTokens' ? 'Gemini 2.5 Flash Tokens' : name || '',
            ]}
          />

          <Line
            type="monotone"
            dataKey="geminiTokens"
            name="geminiTokens"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ fill: '#3B82F6', r: 3 }}
            activeDot={{ r: 5, stroke: '#60A5FA', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
