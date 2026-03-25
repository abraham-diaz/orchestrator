import { fetchJSON } from './client';
import type { DashboardData } from '../types';

export function getDashboard(): Promise<DashboardData> {
  return fetchJSON('/api/dashboard');
}
