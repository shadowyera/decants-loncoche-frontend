type Props = {
  data: {
    _id: string
    ml: number
    stockDisponible: number
    perfumeId: {
      nombre: string
    }
  }[]
}

const getStockLevel = (stock: number) => {
  if (stock <= 2) return "critical"
  if (stock <= 5) return "low"
  return "ok"
}

export const StockAlerts = ({ data }: Props) => {

  return (
    <div className="bg-zinc-900 rounded-xl p-4 sm:p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm sm:text-base">
          Stock crítico
        </h2>

        <span className="text-xs sm:text-sm text-zinc-400">
          reponer pronto
        </span>
      </div>

      {/* LISTA */}
      <div className="space-y-2 sm:space-y-3">

        {data.length === 0 && (
          <p className="text-xs sm:text-sm text-zinc-400">
            Todo en orden
          </p>
        )}

        {data.map((d) => {

          const level = getStockLevel(d.stockDisponible)

          return (
            <div
              key={d._id}
              className="
                flex items-center justify-between
                p-3 sm:p-3.5
                rounded-lg
                hover:bg-zinc-800
                transition
              "
            >

              {/* IZQUIERDA */}
              <div className="min-w-0">

                <p className="text-sm sm:text-[15px] font-medium truncate">
                  {d.perfumeId?.nombre ?? "Perfume"} {d.ml}ml
                </p>

                <p className="text-[11px] sm:text-xs text-zinc-400">
                  Stock restante
                </p>

              </div>

              {/* DERECHA */}
              <div className="flex items-center gap-2">

                {/* BADGE */}
                <span
                  className={`
                    text-[10px] px-2 py-0.5 rounded-md hidden sm:inline-block
                    ${level === "critical" && "bg-red-500/10 text-red-500"}
                    ${level === "low" && "bg-yellow-500/10 text-yellow-400"}
                    ${level === "ok" && "bg-green-500/10 text-green-400"}
                  `}
                >
                  {level === "critical" && "Crítico"}
                  {level === "low" && "Bajo"}
                  {level === "ok" && "OK"}
                </span>

                {/* STOCK */}
                <span
                  className={`
                    text-sm sm:text-base font-semibold
                    ${level === "critical" && "text-red-500"}
                    ${level === "low" && "text-yellow-400"}
                    ${level === "ok" && "text-green-400"}
                  `}
                >
                  {d.stockDisponible}
                </span>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}