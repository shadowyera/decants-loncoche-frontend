export const dashboardKeys = {
  all: ["admin-dashboard"] as const,

  list: (filters?: { from?: string; to?: string }) =>
    [...dashboardKeys.all, filters] as const,
}