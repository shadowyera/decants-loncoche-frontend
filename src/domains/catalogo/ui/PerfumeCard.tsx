import { Link } from "react-router-dom"
import type { CatalogoProducto } from "../domain/catalogo.types"

import { Card } from "../../../shared/components/ui/Card"

interface PerfumeCardProps {
  producto: CatalogoProducto
}

const LOW_STOCK_THRESHOLD = 5

export function PerfumeCard({ producto }: PerfumeCardProps) {

  const disponible = producto.disponible && producto.precioDesde > 0

  const stock =
    "stock" in producto && typeof producto.stock === "number"
      ? producto.stock
      : undefined

  const isOutOfStock =
    !producto.disponible || (stock !== undefined && stock === 0)

  const isLowStock =
    !isOutOfStock &&
    (stock !== undefined
      ? stock <= LOW_STOCK_THRESHOLD
      : producto.pocoStock)

  // 🎨 base común de badges (clave para que todo se vea uniforme)
  const badgeBase =
    "text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur border"

  return (

    <Link
      to={`/perfume/${producto.slug}`}
      className="block focus:outline-none"
    >

      <Card
        className="
          group overflow-hidden rounded-2xl
          bg-surface border border-border/40
          shadow-sm transition-all duration-300
          hover:shadow-xl hover:-translate-y-[3px]
        "
      >

        {/* IMAGEN */}

        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-neutral-900 to-black">

          {/* BADGES */}

          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">

            {isOutOfStock && (
              <span className={`${badgeBase} bg-zinc-600/80 text-white border-white/10`}>
                Sin stock
              </span>
            )}

            {!isOutOfStock && isLowStock && (
              <span className={`${badgeBase} bg-red-500/80 text-white border-white/10`}>
                {stock !== undefined
                  ? stock === 1
                    ? "Queda 1 unidad"
                    : `Quedan ${stock} unidades`
                  : "Quedan pocos"}
              </span>
            )}

            {producto.nuevo && (
              <span className={`${badgeBase} bg-accent/90 text-white border-white/10`}>
                Nuevo
              </span>
            )}

            {producto.masVendido && (
              <span className={`${badgeBase} bg-yellow-400/90 text-black border-white/10`}>
                🔥 Top
              </span>
            )}

          </div>


          {/* IMAGEN */}

          {producto.imagen ? (

            <div className="w-full h-full flex items-center justify-center p-4">

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="
                  max-h-full max-w-full
                  object-contain
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />

            </div>

          ) : (

            <div className="flex items-center justify-center h-full text-muted text-xs">
              Sin imagen
            </div>

          )}

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        </div>


        {/* CONTENIDO */}

        <div className="p-3 sm:p-4 space-y-1.5">

          {/* MARCA */}

          <p className="text-[10px] tracking-[0.25em] uppercase text-muted">
            {producto.marca}
          </p>


          {/* NOMBRE */}

          <h3
            className="
              font-serif
              text-sm sm:text-base
              leading-tight
              text-text
              line-clamp-2
              group-hover:text-accent
              transition-colors
            "
          >
            {producto.nombre}
          </h3>


          {/* PRECIO */}

          <p className="text-accent font-semibold text-sm sm:text-base pt-1">

            {disponible
              ? `Desde $${producto.precioDesde.toLocaleString("es-CL")}`
              : "Próximamente"}

          </p>

        </div>

      </Card>

    </Link>

  )

}