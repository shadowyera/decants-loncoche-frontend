type Props = {
  resumen: {
    revenue: number
    pedidos: number
    decants: number
    aov: number
  }
}

/**
 * FORMATEAR DINERO
 */
const formatCurrency = (value: number) => {
  return `$${value.toLocaleString("es-CL")}`
}

export const DashboardStats = ({ resumen }: Props) => {

  const stats = [
    {
      label: "Revenue",
      value: formatCurrency(resumen.revenue),
    },
    {
      label: "Pedidos",
      value: resumen.pedidos,
    },
    {
      label: "Decants",
      value: resumen.decants,
    },
    {
      label: "Ticket Prom.",
      value: formatCurrency(Math.round(resumen.aov)),
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-zinc-900 rounded-xl p-4 transition hover:bg-zinc-800"
        >
          <p className="text-sm text-zinc-400">
            {stat.label}
          </p>

          <p className="text-xl font-bold mt-1">
            {stat.value}
          </p>
        </div>
      ))}

    </div>
  )
}