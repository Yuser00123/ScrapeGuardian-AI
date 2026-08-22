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
import { Database } from 'lucide-react';

export const CollectorHealthTrendChart: React.FC = () => {
  const { collectors, activityLogs } = useApp();

  // Compute 7-day health trend directly from Firestore collectors and activity logs
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const healthyCount = collectors.filter((c) => c.status === 'healthy').length;
  const degradedCount = collectors.filter((c) => c.status === 'degraded' || c.status === 'broken').length;
  const totalCollectors = collectors.length;

  const trendData = days.map((day, idx) => {
    // Count day activity logs
    const dayLogs = activityLogs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return (logDate.getDay() + 6) % 7 === idx;
    });
    const logHealthy = dayLogs.filter((l) => l.status === 'success').length;
    const logErrors = dayLogs.filter((l) => l.status === 'error' || l.status === 'warning').length;

    return {
      day,
      healthy: Math.max(healthyCount, logHealthy + healthyCount),
      degraded: Math.max(degradedCount, logErrors),
      total: Math.max(totalCollectors, logHealthy + logErrors + totalCollectors),
    };
  });

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          <Database className="h-3 w-3 text-emerald-400" />
          Source: Firestore Collector Telemetry ({collectors.length} Active Nodes)
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Firestore
        </span>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
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
              domain={[35, 52]}
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
    </div>
  );
};

