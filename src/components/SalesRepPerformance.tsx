import React from 'react';
import { User, Deal } from '../types';
import { Users, Award, AlertCircle, ArrowRight } from 'lucide-react';

interface SalesRepPerformanceProps {
  users: User[];
  deals: Deal[];
  selectedRepId: string;
  onSelectRep: (repId: string) => void;
}

export const SalesRepPerformance: React.FC<SalesRepPerformanceProps> = ({
  users,
  deals,
  selectedRepId,
  onSelectRep
}) => {
  const repStats = users.map((u) => {
    const repDeals = deals.filter((d) => d.owner_id === u.id);
    const wonDeals = repDeals.filter((d) => d.status === 'won');
    const lostDeals = repDeals.filter((d) => d.status === 'lost');
    const openDeals = repDeals.filter((d) => d.status === 'open');

    const wonRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
    const openRevenue = openDeals.reduce((sum, d) => sum + d.amount, 0);

    const closedCount = wonDeals.length + lostDeals.length;
    const winRate = closedCount > 0 ? (wonDeals.length / closedCount) * 100 : 0;
    const quotaAttainment = u.quota_amount > 0 ? (wonRevenue / u.quota_amount) * 100 : 0;

    return {
      user: u,
      dealsCount: repDeals.length,
      wonRevenue,
      openRevenue,
      winRate,
      quotaAttainment
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E1D3] shadow-soft">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#141E28]">
              Desempeño del Equipo Comercial (Sales Rep Leaderboard)
            </h3>
            <p className="text-xs text-slate-500">
              Cumplimiento de cuota mensual, pipeline activo y tasa de éxito
            </p>
          </div>
        </div>

        {selectedRepId !== 'all' && (
          <button
            onClick={() => onSelectRep('all')}
            className="text-xs text-slate-600 hover:text-[#FF5C35] font-semibold underline"
          >
            Mostrar todos los ejecutivos
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {repStats.map(({ user, wonRevenue, openRevenue, winRate, quotaAttainment }) => {
          const isSelected = selectedRepId === user.id;
          const isTopPerformer = quotaAttainment >= 100;
          const isAtRisk = quotaAttainment < 50;

          return (
            <div
              key={user.id}
              onClick={() => onSelectRep(isSelected ? 'all' : user.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-[#FF5C35] bg-[#FF5C35]/5 shadow-sm ring-2 ring-[#FF5C35]/20'
                  : 'border-[#E8E1D3] bg-[#F9F6F0]/60 hover:bg-white hover:shadow-soft'
              }`}
            >
              {isTopPerformer && (
                <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                  <Award className="w-3 h-3 text-emerald-600" />
                  Meta Superada
                </span>
              )}

              {isAtRisk && (
                <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full">
                  <AlertCircle className="w-3 h-3 text-rose-600" />
                  En Riesgo
                </span>
              )}

              <div className="flex items-center gap-2.5 mb-3">
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#141E28] truncate">{user.full_name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{user.department}</p>
                </div>
              </div>

              {/* Progress to quota */}
              <div className="mb-2">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-500">Cuota:</span>
                  <span className="font-bold text-slate-800">
                    {quotaAttainment.toFixed(0)}% (${(wonRevenue / 1000).toFixed(0)}k / ${(user.quota_amount / 1000).toFixed(0)}k)
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      quotaAttainment >= 100 ? 'bg-emerald-500' : quotaAttainment >= 70 ? 'bg-[#FF5C35]' : 'bg-rose-400'
                    }`}
                    style={{ width: `${Math.min(quotaAttainment, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-200/60 text-slate-600">
                <div>
                  <span className="block opacity-75">Pipeline Activo:</span>
                  <strong className="text-slate-800">${(openRevenue / 1000).toFixed(0)}k</strong>
                </div>
                <div>
                  <span className="block opacity-75">Win Rate:</span>
                  <strong className="text-slate-800">{winRate.toFixed(0)}%</strong>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end text-[10px] text-[#FF5C35] font-semibold group">
                <span>{isSelected ? 'Filtro Aplicado' : 'Filtrar Tratos'}</span>
                <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
