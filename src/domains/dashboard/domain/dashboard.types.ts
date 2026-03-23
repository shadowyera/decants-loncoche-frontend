export interface DashboardResumen {
  revenue: number
  pedidos: number
  decants: number
  aov: number
}

export interface TopPerfume {
  _id: string
  nombre: string
  cantidad: number
  revenue: number
}

export interface VentaPorDia {
  _id: string // fecha string "2026-03-22"
  revenue: number
  pedidos: number
}

export interface StockCritico {
  _id: string
  ml: number
  stockDisponible: number
  perfumeId: {
    nombre: string
    marca?: string
  }
}

export interface DashboardData {
  resumen: DashboardResumen
  topPerfumes: TopPerfume[]
  ventasPorDia: VentaPorDia[]
  stockCritico: StockCritico[]
}

export interface DashboardFilters {
  from?: string
  to?: string
}