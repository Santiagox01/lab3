import React, { useState } from 'react';
import { Deal, User, Customer, PipelineStage, DealStatus } from '../types';
import { Table, CheckCircle2, XCircle, Clock, Check, ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

interface DealsTableProps {
  deals: Deal[];
  users: User[];
  customers: Customer[];
  stages: PipelineStage[];
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onUpdateDealStatus: (dealId: string, newStatus: DealStatus, newStageId?: string) => void;
  onUpdateDealOwner: (dealId: string, newOwnerId: string) => void;
}

export const DealsTable: React.FC<DealsTableProps> = ({
  deals,
  users,
  customers,
  stages,
  statusFilter,
  onStatusFilterChange,
  onUpdateDealStatus,
  onUpdateDealOwner
}) => {
  const [sortField, setSortField] = useState<'amount' | 'created_at' | 'title'>('amount');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const getCustomer = (id: string) => customers.find((c) => c.id === id);
  const getOwner = (id: string) => users.find((u) => u.id === id);
  const getStage = (id: string) => stages.find((s) => s.id === id);

  const sortedDeals = [...deals].sort((a, b) => {
    if (sortField === 'amount') {
      return sortAsc ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortField === 'created_at') {
      return sortAsc
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  const toggleSort = (field: 'amount' | 'created_at' | 'title') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E8E1D3] shadow-soft">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#141E28]">
              Gestión de Oportunidades & Tratos Comerciales ({deals.length})
            </h3>
            <p className="text-xs text-slate-500">
              Negociaciones B2B, bloques de cupos, vuelos chárter y convenios corporativos
            </p>
          </div>
        </div>

        {/* Status Pills Filter */}
        <div className="flex items-center gap-1.5 bg-[#F9F6F0] p-1 rounded-xl border border-[#E8E1D3]">
          {(['all', 'open', 'won', 'lost'] as const).map((st) => (
            <button
              key={st}
              onClick={() => onStatusFilterChange(st)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === st
                  ? 'bg-[#141E28] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#141E28] hover:bg-slate-200/50'
              }`}
            >
              {st === 'all'
                ? 'Todos'
                : st === 'open'
                ? 'En Curso (Open)'
                : st === 'won'
                ? 'Ganados (Won)'
                : 'Perdidos (Lost)'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Helper Banner */}
      <div className="mb-4 bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-2.5 text-xs text-amber-800 flex items-center justify-between">
        <span>
          💡 <strong>Demostración Reactiva:</strong> Puedes cambiar el estado o etapa de cualquier trato desde esta tabla. Los KPIs superiores y los gráficos se recalcularán automáticamente en tiempo real.
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3 cursor-pointer select-none" onClick={() => toggleSort('title')}>
                <div className="flex items-center gap-1">
                  <span>Trato / Cliente</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Ruta / Servicio</th>
              <th className="py-3 px-3">Responsable (Owner)</th>
              <th className="py-3 px-3">Etapa del Embudo</th>
              <th className="py-3 px-3 text-right cursor-pointer select-none" onClick={() => toggleSort('amount')}>
                <div className="flex items-center justify-end gap-1">
                  <span>Monto (USD)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Estado</th>
              <th className="py-3 px-3 text-center">Acción Rápida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {sortedDeals.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No se encontraron tratos con los filtros actuales.
                </td>
              </tr>
            ) : (
              sortedDeals.map((deal) => {
                const customer = getCustomer(deal.customer_id);
                const owner = getOwner(deal.owner_id);
                const stage = getStage(deal.stage_id);

                return (
                  <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Title & Customer */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#141E28] group-hover:text-[#FF5C35] transition-colors">
                        {deal.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {customer?.company_name || 'Cliente Corporativo'} • <span className="opacity-75">{customer?.industry}</span>
                      </div>
                    </td>

                    {/* Service & Route */}
                    <td className="py-3.5 px-3">
                      <span className="inline-block bg-[#F9F6F0] border border-[#E8E1D3] text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {deal.flight_route || 'Ruta B2B'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {deal.service_type || 'Convenio Aéreo'} {deal.passengers_count ? `(${deal.passengers_count} pax)` : ''}
                      </div>
                    </td>

                    {/* Owner / Reassign dropdown */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        {owner && (
                          <img
                            src={owner.avatar_url}
                            alt={owner.full_name}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200"
                          />
                        )}
                        <select
                          value={deal.owner_id}
                          onChange={(e) => onUpdateDealOwner(deal.id, e.target.value)}
                          aria-label={`Reasignar responsable para ${deal.title}`}
                          className="bg-transparent text-xs text-slate-700 font-medium hover:underline focus:outline-none cursor-pointer"
                        >
                          {users.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.full_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Stage Selector */}
                    <td className="py-3.5 px-3">
                      <select
                        value={deal.stage_id}
                        onChange={(e) => {
                          const newStageId = e.target.value;
                          let newStatus: DealStatus = 'open';
                          if (newStageId === 's5') newStatus = 'won';
                          if (newStageId === 's6') newStatus = 'lost';
                          onUpdateDealStatus(deal.id, newStatus, newStageId);
                        }}
                        aria-label={`Cambiar etapa de negociación para ${deal.title}`}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#E8E1D3] bg-[#F9F6F0] text-slate-700 focus:outline-none cursor-pointer"
                      >
                        {stages.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.win_probability}%)
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3 text-right font-extrabold text-[#141E28]">
                      ${deal.amount.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">USD</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center">
                      {deal.status === 'won' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Won
                        </span>
                      ) : deal.status === 'lost' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-200">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Lost
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Open
                        </span>
                      )}
                    </td>

                    {/* Quick Action Buttons */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {deal.status !== 'won' && (
                          <button
                            onClick={() => onUpdateDealStatus(deal.id, 'won', 's5')}
                            title="Marcar como Ganado (Won)"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {deal.status !== 'lost' && (
                          <button
                            onClick={() => onUpdateDealStatus(deal.id, 'lost', 's6')}
                            title="Marcar como Perdido (Lost)"
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {deal.status !== 'open' && (
                          <button
                            onClick={() => onUpdateDealStatus(deal.id, 'open', 's3')}
                            title="Reabrir a Negociación (Open)"
                            className="text-[10px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-2 py-1 rounded transition"
                          >
                            Reabrir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
