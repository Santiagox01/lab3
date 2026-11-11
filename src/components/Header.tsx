import React from 'react';
import { User, FilterState } from '../types';
import { Plane, Search, RotateCcw, Plus, Sparkles, Filter } from 'lucide-react';

interface HeaderProps {
  users: User[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onOpenNewDeal: () => void;
  onOpenAIChat: () => void;
  activeDealsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  users,
  filters,
  onFilterChange,
  onResetFilters,
  onOpenNewDeal,
  onOpenAIChat,
  activeDealsCount
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-[#E8E1D3] px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5C35] to-[#E04A26] flex items-center justify-center text-white shadow-soft">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#141E28]">AeroCRM</h1>
              <span className="bg-[#FF5C35]/10 text-[#FF5C35] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#FF5C35]/20">
                B2B Airline Sales
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                n8n AI Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dashboard de Ventas Corporativas & Agente Inteligente n8n
            </p>
          </div>
        </div>

        {/* Global Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search box */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar trato, cliente o ruta..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5C35]/30 focus:border-[#FF5C35] transition"
            />
          </div>

          {/* Sales Rep Filter */}
          <div className="flex items-center gap-1.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filters.salesRepId}
              onChange={(e) => onFilterChange({ salesRepId: e.target.value })}
              aria-label="Filtrar por ejecutivo comercial"
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">Equipo Completo ({users.length})</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.full_name} ({u.role === 'manager' ? 'Líder' : 'Comercial'})
                </option>
              ))}
            </select>
          </div>

          {/* Date range filter */}
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ dateRange: e.target.value })}
            aria-label="Filtrar por periodo de fecha"
            className="bg-[#F9F6F0] border border-[#E8E1D3] text-xs text-slate-700 font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="all">Todo el Histórico</option>
            <option value="q1">Q1 2026 (Ene - Mar)</option>
            <option value="march">Marzo 2026 (Actual)</option>
            <option value="february">Febrero 2026</option>
            <option value="january">Enero 2026</option>
          </select>

          {/* Reset Filters button */}
          {(filters.salesRepId !== 'all' || filters.searchQuery !== '' || filters.stageId !== 'all' || filters.status !== 'all' || filters.dateRange !== 'all') && (
            <button
              onClick={onResetFilters}
              title="Restablecer todos los filtros"
              className="p-2 text-slate-500 hover:text-[#FF5C35] bg-[#F9F6F0] hover:bg-[#FF5C35]/10 border border-[#E8E1D3] rounded-xl transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Action buttons */}
          <button
            onClick={onOpenNewDeal}
            className="flex items-center gap-1.5 bg-[#141E28] hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Trato</span>
          </button>

          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-soft transition active:scale-95 animate-pulse hover:animate-none"
          >
            <Sparkles className="w-4 h-4" />
            <span>Asistente n8n IA</span>
          </button>
        </div>
      </div>
    </header>
  );
};
