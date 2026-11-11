import React from 'react';
import { Deal } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface SalesEvolutionChartProps {
  deals: Deal[];
}

export const SalesEvolutionChart: React.FC<SalesEvolutionChartProps> = ({ deals }) => {
  // Aggregate won revenue and pipeline creation by month
  const monthlyData: { [key: string]: { month: string; wonRevenue: number; pipelineCreated: number } } = {
    '2026-01': { month: 'Ene 2026', wonRevenue: 0, pipelineCreated: 0 },
    '2026-02': { month: 'Feb 2026', wonRevenue: 0, pipelineCreated: 0 },
    '2026-03': { month: 'Mar 2026', wonRevenue: 0, pipelineCreated: 0 },
    '2026-04': { month: 'Abr 2026 (Est.)', wonRevenue: 0, pipelineCreated: 0 }
  };

  deals.forEach((deal) => {
    // Created date
    const createdMonth = deal.created_at.substring(0, 7);
    if (monthlyData[createdMonth]) {
      monthlyData[createdMonth].pipelineCreated += deal.amount;
    }

    // Closed won date
    if (deal.status === 'won' && deal.closed_at) {
      const closedMonth = deal.closed_at.substring(0, 7);
      if (monthlyData[closedMonth]) {
        monthlyData[closedMonth].wonRevenue += deal.amount;
      }
    }
  });

  const chartData = Object.values(monthlyData);

  const formatCurrency = (val: number) => {
    return `$${(val / 1000).toFixed(0)}k`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#141E28] text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs">
          <p className="font-bold text-sm text-sky-400 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="flex items-center justify-between gap-3 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}:
              </span>
              <strong className="text-white">${entry.value.toLocaleString()} USD</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E1D3] shadow-soft flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#141E28]">
              Evolución de Ventas en el Tiempo (Revenue Trend)
            </h3>
            <p className="text-xs text-slate-500">
              Ventas cerradas (Won) vs. Volumen de nuevos tratos ingresados
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-[#F9F6F0] px-2.5 py-1 rounded-lg border border-[#E8E1D3]">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Primer Trimestre 2026</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
            <Area
              type="monotone"
              dataKey="wonRevenue"
              name="Ventas Cerradas (Won)"
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorWon)"
            />
            <Area
              type="monotone"
              dataKey="pipelineCreated"
              name="Nuevos Tratos (Pipeline)"
              stroke="#38BDF8"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorPipeline)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Tendencia positiva de cierre hacia fin de mes
        </span>
        <span className="font-semibold text-slate-700">Tasa de Crecimiento: +18.4%</span>
      </div>
    </div>
  );
};
