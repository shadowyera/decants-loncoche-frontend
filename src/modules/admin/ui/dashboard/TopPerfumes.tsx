type Props = {
  data: {
    _id: string
    nombre: string
    cantidad: number
    revenue: number
  }[]
}

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString("es-CL")}`
}

export const TopPerfumes = ({ data }: Props) => {

  return (
    <div className="bg-zinc-900 rounded-xl p-4 sm:p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm sm:text-base">
          Top Perfumes
        </h2>

        <span className="text-xs sm:text-sm text-zinc-400">
          más vendidos
        </span>
      </div>

      {/* LISTA */}
      <div className="space-y-2 sm:space-y-3">

        {data.length === 0 && (
          <p className="text-xs sm:text-sm text-zinc-400">
            Sin datos aún
          </p>
        )}

        {data.map((p, index) => {

          const position = index + 1

          return (
            <div
              key={p._id}
              className="
                flex items-center justify-between
                p-3 sm:p-3.5
                rounded-lg
                hover:bg-zinc-800
                transition
              "
            >

              {/* IZQUIERDA */}
              <div className="flex items-center gap-3 min-w-0">

                {/* POSICIÓN */}
                <div
                  className={`
                    shrink-0
                    w-6 h-6 sm:w-7 sm:h-7
                    flex items-center justify-center
                    text-[10px] sm:text-xs font-bold
                    rounded-full
                    ${position === 1 && "bg-yellow-500 text-black"}
                    ${position === 2 && "bg-zinc-400 text-black"}
                    ${position === 3 && "bg-amber-700 text-white"}
                    ${position > 3 && "bg-zinc-700 text-white"}
                  `}
                >
                  {position}
                </div>

                {/* NOMBRE */}
                <div className="min-w-0">
                  <p className="text-sm sm:text-[15px] font-medium truncate">
                    {p.nombre}
                  </p>

                  <p className="text-[11px] sm:text-xs text-zinc-400">
                    {p.cantidad} ventas
                  </p>
                </div>

              </div>

              {/* DERECHA */}
              <div className="text-right shrink-0">

                <p className="text-sm sm:text-base font-semibold text-green-400">
                  {formatCurrency(p.revenue)}
                </p>

                {/* badge solo en desktop */}
                <p className="hidden sm:block text-[11px] text-zinc-500">
                  ingresos
                </p>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}