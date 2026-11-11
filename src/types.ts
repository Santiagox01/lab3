export type Role = 'admin' | 'manager' | 'sales_rep';
export type UserStatus = 'active' | 'inactive';
export type DealStatus = 'open' | 'won' | 'lost';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  avatar_url: string;
  quota_amount: number;
  status: UserStatus;
  department?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  display_order: number;
  win_probability: number;
  color: string;
}

export interface Customer {
  id: string;
  company_name: string;
  industry: string;
  contact_person: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Deal {
  id: string;
  title: string;
  customer_id: string;
  owner_id: string;
  stage_id: string;
  amount: number;
  currency: string;
  status: DealStatus;
  created_at: string;
  expected_close_date?: string;
  closed_at?: string;
  loss_reason?: string;
  service_type?: string;
  passengers_count?: number;
  flight_route?: string;
}

export interface FilterState {
  searchQuery: string;
  salesRepId: string; // 'all' | user_id
  stageId: string; // 'all' | stage_id
  status: string; // 'all' | 'open' | 'won' | 'lost'
  dateRange: string; // 'all' | 'q1' | 'q2' | 'q3' | 'q4' | 'month'
}

export interface KpiMetrics {
  totalRevenue: number;
  previousPeriodRevenue: number;
  revenueGrowthPercent: number;
  activeDealsCount: number;
  activeDealsValue: number;
  winRatePercent: number;
  avgDealSize: number;
  totalTeamQuota: number;
  quotaAttainmentPercent: number;
  wonCount: number;
  lostCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}
