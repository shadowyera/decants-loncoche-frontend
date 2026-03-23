import { useQuery } from "@tanstack/react-query"

import { getDashboardApi } from "../api/dashboard.api"
import { dashboardKeys } from "./dashboardKeys"
import type { DashboardFilters } from "../domain/dashboard.types"

export const useDashboardQuery = (filters?: DashboardFilters) => {

  return useQuery({
    queryKey: dashboardKeys.list(filters),
    queryFn: () => getDashboardApi(filters),
  })

}