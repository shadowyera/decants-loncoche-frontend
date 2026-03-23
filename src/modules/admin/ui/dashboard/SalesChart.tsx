"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

type Props = {
  data: {
    _id: string
    revenue: number
    pedidos: number
  }[]
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}`
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString("es-CL")}`
}

export const SalesChart = ({ data }: Props) => {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formattedData = data.map(d => ({
    date: formatDate(d._id),
    revenue: d.revenue,
    pedidos: d.pedidos
  }))

  return (
    <div className="bg-zinc-900 rounded-xl p-4 sm:p-5">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="font-semibold text-sm sm:text-base">
          Ventas
        </h2>
        <p className="text-xs text-zinc-500">
          últimos días
        </p>
      </div>

      {/* CHART */}
      <div className="w-full aspect-[2/1] sm:aspect-[2.5/1] lg:aspect-[3/1]">

        {!mounted ? (
          <div className="w-full h-full bg-zinc-800 animate-pulse rounded-lg" />
        ) : formattedData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
            Sin datos aún
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>

              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tickFormatter={(value) => formatCurrency(Number(value))}
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />

              <Tooltip
                formatter={(value: unknown) =>
                  typeof value === "number" ? formatCurrency(value) : ""
                }
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "10px"
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="none"
                fill="url(#colorRevenue)"
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={false}
              />

            </AreaChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  )
}