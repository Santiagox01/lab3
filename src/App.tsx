import React, { useState, useMemo } from 'react';
import { USERS, PIPELINE_STAGES, CUSTOMERS, INITIAL_DEALS } from './data/mockData';
import { Deal, FilterState, KpiMetrics, DealStatus } from './types';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { PipelineStageChart } from './components/PipelineStageChart';
import { SalesEvolutionChart } from './components/SalesEvolutionChart';
import { SalesRepPerformance } from './components/SalesRepPerformance';
import { DealsTable } from './components/DealsTable';
import { AIChatModal } from './components/AIChatModal';
import { NewDealModal } from './components/NewDealModal';
import { MessageSquareText, FileCode2, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    salesRepId: 'all',
    stageId: 'all',
    status: 'all',
    dateRange: 'all'
  });

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);

  // Filter deals based on current global filter state
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const customer = CUSTOMERS.find((c) => c.id === deal.customer_id);
        const matchesTitle = deal.title.toLowerCase().includes(query);
        const matchesCustomer = customer?.company_name.toLowerCase().includes(query);
        const matchesRoute = deal.flight_route?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCustomer && !matchesRoute) return false;
      }

      // Sales Rep filter
      if (filters.salesRepId !== 'all' && deal.owner_id !== filters.salesRepId) {
        return false;
      }

      // Stage filter
      if (filters.stageId !== 'all' && deal.stage_id !== filters.stageId) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && deal.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const dealMonth = deal.created_at.substring(5, 7);
        if (filters.dateRange === 'january' && dealMonth !== '01') return false;
        if (filters.dateRange === 'february' && dealMonth !== '02') return false;
        if (filters.dateRange === 'march' && dealMonth !== '03') return false;
        if (filters.dateRange === 'q1' && !['01', '02', '03'].includes(dealMonth)) return false;
      }

      return true;
    });
  }, [deals, filters]);

  // Dynamically recalculate all KPIs based on filtered deals
  const kpiMetrics: KpiMetrics = useMemo(() => {
    const wonDeals = filteredDeals.filter((d) => d.status === 'won');
    const lostDeals = filteredDeals.filter((d) => d.status === 'lost');
    const openDeals = filteredDeals.filter((d) => d.status === 'open');

    const totalRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
    const activeDealsValue = openDeals.reduce((sum, d) => sum + d.amount, 0);

    const closedCount = wonDeals.length + lostDeals.length;
    const winRatePercent = closedCount > 0 ? (wonDeals.length / closedCount) * 100 : 0;
    const avgDealSize = wonDeals.length > 0 ? totalRevenue / wonDeals.length : 0;

    // Filtered users quota
    const relevantUsers = filters.salesRepId === 'all'
      ? USERS
      : USERS.filter((u) => u.id === filters.salesRepId);

    const totalTeamQuota = relevantUsers.reduce((sum, u) => sum + u.quota_amount, 0);
    const quotaAttainmentPercent = totalTeamQuota > 0 ? (totalRevenue / totalTeamQuota) * 100 : 0;

    // Previous period simulation (e.g. 84% of current revenue for comparative trend)
    const previousPeriodRevenue = totalRevenue * 0.84;
    const revenueGrowthPercent = previousPeriodRevenue > 0
      ? ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100
      : 0;

    return {
      totalRevenue,
      previousPeriodRevenue,
      revenueGrowthPercent,
      activeDealsCount: openDeals.length,
      activeDealsValue,
      winRatePercent,
      avgDealSize,
      totalTeamQuota,
      quotaAttainmentPercent,
      wonCount: wonDeals.length,
      lostCount: lostDeals.length
    };
  }, [filteredDeals, filters.salesRepId]);

  // Handlers for reactive state changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      salesRepId: 'all',
      stageId: 'all',
      status: 'all',
      dateRange: 'all'
    });
  };

  const handleUpdateDealStatus = (dealId: string, newStatus: DealStatus, newStageId?: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          return {
            ...deal,
            status: newStatus,
            stage_id: newStageId || deal.stage_id,
            closed_at: newStatus !== 'open' ? new Date().toISOString() : undefined
          };
        }
        return deal;
      })
    );
  };

  const handleUpdateDealOwner = (dealId: string, newOwnerId: string) => {
    setDeals((prev) =>
      prev.map((deal) => (deal.id === dealId ? { ...deal, owner_id: newOwnerId } : deal))
    );
  };

  const handleAddDeal = (newDeal: Deal) => {
    setDeals((prev) => [newDeal, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex flex-col selection:bg-[#FF5C35] selection:text-white">
      {/* Sticky Header */}
      <Header
        users={USERS}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onOpenNewDeal={() => setIsNewDealOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        activeDealsCount={kpiMetrics.activeDealsCount}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 space-y-6">
        {/* KPI Cards Row */}
        <KpiCards metrics={kpiMetrics} />

        {/* Charts Row: Pipeline by Stage + Sales Evolution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <PipelineStageChart
              stages={PIPELINE_STAGES}
              deals={filteredDeals}
              selectedStageId={filters.stageId}
              onSelectStage={(stageId) => handleFilterChange({ stageId })}
            />
          </div>
          <div className="lg:col-span-5">
            <SalesEvolutionChart deals={filteredDeals} />
          </div>
        </div>

        {/* Sales Rep Leaderboard Row */}
        <SalesRepPerformance
          users={USERS}
          deals={deals}
          selectedRepId={filters.salesRepId}
          onSelectRep={(repId) => handleFilterChange({ salesRepId: repId })}
        />

        {/* Full Deals Table */}
        <DealsTable
          deals={filteredDeals}
          users={USERS}
          customers={CUSTOMERS}
          stages={PIPELINE_STAGES}
          statusFilter={filters.status}
          onStatusFilterChange={(status) => handleFilterChange({ status })}
          onUpdateDealStatus={handleUpdateDealStatus}
          onUpdateDealOwner={handleUpdateDealOwner}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E1D3] bg-white/70 py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Universidad de Antioquia</span>
            <span>•</span>
            <span>Fundamentos de Sistemas de Información (2026)</span>
            <span>•</span>
            <span className="text-[#FF5C35] font-semibold">Laboratorio Nro 3: n8n + Agentes IA</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Santiagox01/lab3"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-[#141E28] font-medium transition"
            >
              <FileCode2 className="w-4 h-4" />
              <span>GitHub: Santiagox01/lab3</span>
              <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Launcher Button */}
      {!isAIChatOpen && (
        <button
          onClick={() => setIsAIChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 active:scale-95 group"
        >
          <div className="relative">
            <MessageSquareText className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-800 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-800"></span>
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
            Asistente n8n IA
          </span>
        </button>
      )}

      {/* Modals */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        deals={deals}
        users={USERS}
        metrics={kpiMetrics}
        onReassignDeal={handleUpdateDealOwner}
      />

      <NewDealModal
        isOpen={isNewDealOpen}
        onClose={() => setIsNewDealOpen(false)}
        users={USERS}
        customers={CUSTOMERS}
        stages={PIPELINE_STAGES}
        onAddDeal={handleAddDeal}
      />
    </div>
  );
};
