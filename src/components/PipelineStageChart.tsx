import React from 'react';
import { PipelineStage, Deal } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

interface PipelineStageChartProps {
  stages: PipelineStage[];
  deals: Deal[];
  selectedStageId: string;
  onSelectStage: (stageId: string) => void;
}

export const PipelineStageChart: React.FC<PipelineStageChartProps> = ({
  stages,
  deals,
  selectedStageId,
  onSelectStage
}) => {
  // Aggregate revenue and deal count per stage
  const data = stages
    .sort((a, b) => a.display_order - b.display_order)
    .map((stage) => {
      const stageDeals = deals.filter((d) => d.stage_id === stage.id);
      const totalAmount = stageDeals.reduce((sum, d) => sum + d.amount, 0);
      return {
        id: stage.id,
        name: stage.name,
        revenue: totalAmount,
        dealCount: stageDeals.length,
        winProbability: stage.win_probability,
        color: stage.color
      };
    });

  const totalPipelineRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);

  const formatYAxis = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#141E28] text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs">
          <p className="font-bold text-sm text-[#FF5C35] mb-1">{item.name}</p>
          <p className="text-slate-300">
            Ingresos Totales: <strong className="text-white">${item.revenue.toLocaleString()} USD</strong>
          </p>
          <p className="text-slate-300">
            Cantidad de Tratos: <strong className="text-white">{item.dealCount}</strong>
          </p>
          <p className="text-slate-300">
            Probabilidad de Éxito: <strong className="text-white">{item.winProbability}%</strong>
          </p>
          <p className="text-[10px] text-slate-400 mt-1 italic">
            Haz clic para filtrar tratos de esta etapa
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E1D3] shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#141E28]">
              Ingresos por Etapa del Pipeline (Revenue by Stage)
            </h3>
            <p className="text-xs text-slate-500">
              Distribución de volumen monetario por etapa del embudo comercial
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">
            Volumen Total: <strong className="text-[#141E28]">${totalPipelineRevenue.toLocaleString()} USD</strong>
          </span>
          {selectedStageId !== 'all' && (
            <button
              onClick={() => onSelectStage('all')}
              className="text-[#FF5C35] font-semibold hover:underline text-xs bg-[#FF5C35]/10 px-2 py-0.5 rounded-md"
            >
              Ver todas las etapas
            </button>
          )}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              radius={[8, 8, 2, 2]}
              cursor="pointer"
              onClick={(entry) => onSelectStage(entry.id === selectedStageId ? 'all' : entry.id)}
            >
              {data.map((entry) => {
                const isSelected = selectedStageId === entry.id;
                const isDimmed = selectedStageId !== 'all' && !isSelected;
                return (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={entry.color}
                    opacity={isDimmed ? 0.35 : 1}
                    stroke={isSelected ? '#000000' : 'none'}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stage Legend and shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4 pt-3 border-t border-slate-100">
        {data.map((st) => (
          <button
            key={st.id}
            onClick={() => onSelectStage(st.id === selectedStageId ? 'all' : st.id)}
            className={`flex flex-col p-2 rounded-xl border text-left transition ${
              selectedStageId === st.id
                ? 'bg-[#141E28] text-white border-[#141E28]'
                : 'bg-[#F9F6F0] hover:bg-slate-100 border-[#E8E1D3] text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }}></span>
              <span className="text-[11px] font-bold truncate">{st.name}</span>
            </div>
            <span className="text-xs font-semibold">${(st.revenue / 1000).toFixed(0)}k</span>
            <span className="text-[10px] opacity-75">{st.dealCount} tratos ({st.winProbability}%)</span>
          </button>
        ))}
      </div>
    </div>
  );
};
