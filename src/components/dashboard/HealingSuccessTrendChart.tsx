import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { mockHealingSuccessTrendData } from '../../data/mockData';

export const HealingSuccessTrendChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockHealingSuccessTrendData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          
          <XAxis
            dataKey="week"
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

          <Legend
            wrapperStyle={{
              fontFamily: 'monospace',
              fontSize: '11px',
              paddingTop: '8px',
            }}
          />

          <Bar
            dataKey="autoRepaired"
            name="Autonomous Self-Healed"
            fill="#22C55E"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="humanEscalated"
            name="Human Intervention"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
