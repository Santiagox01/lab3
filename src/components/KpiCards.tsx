import React from 'react';
import { KpiMetrics } from '../types';
import { DollarSign, Briefcase, TrendingUp, Percent, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardsProps {
  metrics: KpiMetrics;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. TOTAL REVENUE (Won deals) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E1D3] shadow-soft hover:shadow-soft-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#FF5C35]/10 via-[#FF5C35]/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-[#141E28] tracking-tight">
            {formatCurrency(metrics.totalRevenue)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`flex items-center font-bold px-1.5 py-0.5 rounded-md ${metrics.revenueGrowthPercent >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
            {metrics.revenueGrowthPercent >= 0 ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {metrics.revenueGrowthPercent >= 0 ? '+' : ''}{metrics.revenueGrowthPercent.toFixed(1)}%
          </span>
          <span className="text-slate-500">vs. periodo anterior ({formatCurrency(metrics.previousPeriodRevenue)})</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
          <span>Tratos ganados: <strong className="text-[#141E28]">{metrics.wonCount}</strong></span>
          <span>Meta: {metrics.quotaAttainmentPercent.toFixed(0)}% cuota</span>
        </div>
      </div>

      {/* 2. ACTIVE DEALS (Open pipeline) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E1D3] shadow-soft hover:shadow-soft-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-sky-500/10 via-sky-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Deals (Pipeline)
          </span>
          <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-[#141E28] tracking-tight">
            {metrics.activeDealsCount}
          </span>
          <span className="text-xs text-sky-600 font-medium">
            en negociación activa
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Valor acumulado en juego:</span>
          <strong className="text-slate-800 font-semibold">{formatCurrency(metrics.activeDealsValue)}</strong>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Estado: <strong className="text-amber-600">En curso</strong></span>
          <span className="text-emerald-600 font-medium">+4 nuevos esta semana</span>
        </div>
      </div>

      {/* 3. WIN RATE (%) */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E1D3] shadow-soft hover:shadow-soft-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-emerald-500/10 via-emerald-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Win Rate
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Percent className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-[#141E28] tracking-tight">
            {metrics.winRatePercent.toFixed(1)}%
          </span>
          <span className="text-xs text-emerald-600 font-medium">efectividad de cierre</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Ganados ({metrics.wonCount}) vs Perdidos ({metrics.lostCount})</span>
        </div>
        {/* Progress bar visual */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(metrics.winRatePercent, 100)}%` }}
            ></div>
            <div
              className="bg-rose-400 h-full transition-all duration-500"
              style={{ width: `${Math.max(100 - metrics.winRatePercent, 0)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. AVG DEAL SIZE */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E1D3] shadow-soft hover:shadow-soft-lg transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Avg Deal Size
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Target className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl lg:text-3xl font-extrabold text-[#141E28] tracking-tight">
            {formatCurrency(metrics.avgDealSize)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Ticket promedio por convenio cerrado</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
          <span>Contratos B2B & Charters</span>
          <span className="text-indigo-600 font-semibold">Alta rentabilidad</span>
        </div>
      </div>
    </div>
  );
};
