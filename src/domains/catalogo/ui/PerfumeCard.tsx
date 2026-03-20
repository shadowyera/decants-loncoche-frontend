import { Link } from "react-router-dom"
import type { CatalogoProducto } from "../domain/catalogo.types"

import { Card } from "../../../shared/components/ui/Card"

interface PerfumeCardProps {
  producto: CatalogoProducto
}

export function PerfumeCard({ producto }: PerfumeCardProps) {

  const disponible = producto.disponible && producto.precioDesde > 0

  return (

    <Link
      to={`/perfume/${producto.slug}`}
      className="block focus:outline-none"
    >

      <Card
        className="
          group
          overflow-hidden
          rounded-2xl
          bg-surface
          border border-border/40
          shadow-sm
          transition-all duration-300
          hover:shadow-lg
          hover:-translate-y-[2px]
        "
      >

        {/* IMAGEN */}

        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            bg-black
          "
        >

          {/* BADGES */}

          <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">

            {producto.nuevo && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-accent text-black shadow-sm">
                Nuevo
              </span>
            )}

            {producto.masVendido && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-yellow-400 text-black">
                🔥 Top
              </span>
            )}

            {producto.pocoStock && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-red-500 text-white">
                ⚡ Stock bajo
              </span>
            )}

            {!producto.disponible && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-medium bg-white/10 text-text border border-border backdrop-blur">
                Sin stock
              </span>
            )}

          </div>


          {/* IMAGEN PERFUME */}

          {producto.imagen ? (

            <>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

            </>

          ) : (

            <div className="flex items-center justify-center h-full text-muted text-xs">
              Sin imagen
            </div>

          )}

        </div>


        {/* CONTENIDO */}

        <div className="p-3 sm:p-4 space-y-1.5">

          {/* MARCA */}

          <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
            {producto.marca}
          </p>


          {/* NOMBRE */}

          <h3
            className="
              font-serif
              text-sm
              sm:text-base
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
              ? `Desde $${producto.precioDesde.toLocaleString()}`
              : "Próximamente"}

          </p>

        </div>

      </Card>

    </Link>

  )

}