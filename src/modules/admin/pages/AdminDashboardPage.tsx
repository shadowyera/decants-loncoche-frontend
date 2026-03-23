import { useDashboard } from "../../../domains/dashboard/hooks/useDashboard"

import { DashboardStats } from "../ui/dashboard/DashboardStats"
import { SalesChart } from "../ui/dashboard/SalesChart"
import { TopPerfumes } from "../ui/dashboard/TopPerfumes"
import { StockAlerts } from "../ui/dashboard/StockAlerts"

export const AdminDashboardPage = () => {
  const {
    isLoading,
    resumen,
    ventasPorDia,
    topPerfumes,
    stockCritico
  } = useDashboard()

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 bg-zinc-800 rounded" />
          <div className="h-4 w-60 bg-zinc-800 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1400px] mx-auto">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Resumen general del negocio
        </p>
      </div>

      {/* KPIs */}
      {resumen && (
        <DashboardStats resumen={resumen} />
      )}

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">

        {/* CHART */}
        <div className="lg:col-span-2 min-w-0">
          <SalesChart data={ventasPorDia} />
        </div>

        {/* TOP PERFUMES */}
        <div className="min-w-0">
          <TopPerfumes data={topPerfumes} />
        </div>

      </div>

      {/* GRID SECUNDARIO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 items-start">

        <div className="min-w-0">
          <StockAlerts data={stockCritico} />
        </div>

        {/* espacio para futuro widget */}
        <div className="hidden xl:block" />

      </div>

    </div>
  )
}