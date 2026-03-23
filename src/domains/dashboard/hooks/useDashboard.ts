import { useDashboardQuery } from "../queries/dashboard.queries"

export const useDashboard = () => {

  const query = useDashboardQuery()

  return {
    ...query,
    resumen: query.data?.resumen,
    topPerfumes: query.data?.topPerfumes ?? [],
    ventasPorDia: query.data?.ventasPorDia ?? [],
    stockCritico: query.data?.stockCritico ?? [],
  }

}