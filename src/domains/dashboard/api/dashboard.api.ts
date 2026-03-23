import { apiClient } from "../../../shared/api/apiClient"

import type {
  DashboardData,
  DashboardFilters
} from "../domain/dashboard.types"

/**
 * GET ADMIN DASHBOARD
 */
export const getDashboardApi = async (
  filters?: DashboardFilters
): Promise<DashboardData> => {

  const { data } = await apiClient.get<{
    ok: boolean
    data: DashboardData
  }>("/admin/dashboard", {
    params: filters
  })

  return data.data
}