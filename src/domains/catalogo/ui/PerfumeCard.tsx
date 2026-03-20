import { Link } from "react-router-dom"
import type { CatalogoProducto } from "../domain/catalogo.types"

import { Card } from "../../../shared/components/ui/Card"
import { API_URL } from "../../../shared/api/api"

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
          bg-surface
          border border-border/50
          shadow-sm
          transition-all duration-300 ease-premium
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

          <div
            className="
              absolute
              top-3
              left-3
              flex
              flex-col
              gap-2
              z-10
            "
          >

            {producto.nuevo && (

              <span
                className="
    text-[10px]
    px-2.5
    py-1
    rounded-full
    font-medium
    bg-accent
    text-black
    shadow-sm
    tracking-wide
  "
              >
                Nuevo
              </span>

            )}

            {producto.pocoStock && (

              <span
                className="
                  text-[10px]
                  px-2.5
                  py-1
                  rounded-full
                  font-medium
                  bg-red-500
                  text-white
                "
              >
                ⚡ Poco stock
              </span>

            )}

            {!producto.disponible && (

              <span
                className="
                  text-[10px]
                  px-2.5
                  py-1
                  rounded-full
                  font-medium
                  bg-white/10
                  text-text
                  border
                  border-border
                  backdrop-blur
                "
              >
                Sin stock
              </span>

            )}

          </div>


          {/* IMAGEN PERFUME */}

          {producto.imagen ? (

            <>
              <img
                src={`${API_URL}${producto.imagen}`}
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

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-black/10
                  to-transparent
                  pointer-events-none
                "
              />

            </>

          ) : (

            <div
              className="
                flex
                items-center
                justify-center
                h-full
                text-muted
                text-sm
              "
            >
              Sin imagen
            </div>

          )}

        </div>


        {/* CONTENIDO */}

        <div className="p-5 space-y-2">

          {/* MARCA */}

          <p
            className="
              text-[11px]
              tracking-[0.2em]
              uppercase
              text-muted
            "
          >
            {producto.marca}
          </p>


          {/* NOMBRE */}

          <h3
            className="
              font-serif
              text-lg
              leading-tight
              text-text
              group-hover:text-accent
              transition-colors
            "
          >
            {producto.nombre}
          </h3>


          {/* PRECIO */}

          <p
            className="
              text-accent
              font-semibold
              pt-2
            "
          >

            {disponible
              ? `Desde $${producto.precioDesde.toLocaleString()}`
              : "Próximamente"}

          </p>

        </div>

      </Card>

    </Link>

  )

}