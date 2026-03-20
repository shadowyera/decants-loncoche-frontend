import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { useProductoQuery } from "../../../domains/catalogo/queries/useProductoQuery"
import { useRecomendacionesQuery } from "../../../domains/catalogo/queries/useRecomendacionesQuery"

import { DecantSelector } from "../../../domains/catalogo/ui/DecantSelector"
import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { ProductTrustBadges } from "../../../domains/catalogo/ui/ProductTrustBadges"

import { Container } from "../../../shared/components/ui/Container"

export function PerfumePage() {

  const { slug } = useParams()
  const navigate = useNavigate()

  const {
    data: producto,
    isLoading,
    isError
  } = useProductoQuery(slug ?? "")

  const {
    data: recomendaciones
  } = useRecomendacionesQuery(slug ?? "")

  if (isLoading) {
    return (
      <Container className="py-24 text-center">
        <p className="text-muted">
          Cargando perfume...
        </p>
      </Container>
    )
  }

  if (isError || !producto) {
    return (
      <Container className="py-24 text-center">
        <p className="text-muted">
          Producto no encontrado
        </p>
      </Container>
    )
  }

  /* =========================
     DISPONIBILIDAD REAL
  ========================= */

  const hayDecants = producto.decants.length > 0

  const disponible = producto.decants.some(
    (d) => d.stockDisponible > 0
  )

  const pocoStock = producto.decants.some(
    (d) => d.stockDisponible > 0 && d.stockDisponible <= 3
  )

  return (

    <div className="py-24 space-y-32">

      <Container className="max-w-6xl">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate("/catalogo")}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-muted
            hover:text-text
            transition
            mb-6
          "
        >
          <ArrowLeft size={18} />
          Volver al catálogo
        </button>


        {/* BREADCRUMB */}

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-muted
            mb-12
          "
        >

          <Link
            to="/catalogo"
            className="hover:text-accent transition"
          >
            Catálogo
          </Link>

          <span className="opacity-50">/</span>

          <span className="text-text">
            {producto.nombre}
          </span>

        </div>


        {/* PRODUCTO */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-2 gap-24 items-start"
        >

          {/* PERFUME IMAGE */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              p-12
            "
          >

            <div
              className="
                absolute
                bottom-6
                w-[240px]
                h-[50px]
                bg-black/70
                blur-3xl
                rounded-full
                opacity-60
              "
            />

            {producto.imagen ? (

              <motion.img
                src={`${import.meta.env.VITE_API_URL}${producto.imagen}`}
                alt={producto.nombre}
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="
                  relative
                  z-10
                  object-contain
                  max-h-[520px]
                  mx-auto
                "
              />

            ) : (

              <div className="flex items-center justify-center h-[400px] text-muted">
                Sin imagen
              </div>

            )}

          </div>


          {/* INFO */}

          <div className="space-y-12">

            {/* BRAND + NAME */}

            <div>

              <p
                className="
                  text-sm
                  tracking-[0.25em]
                  uppercase
                  text-accent
                "
              >
                {producto.marca}
              </p>

              <h1
                className="
                  font-serif
                  text-4xl
                  md:text-5xl
                  leading-tight
                  mt-3
                  text-text
                "
              >
                {producto.nombre}
              </h1>

              {/* ESTADO STOCK */}

              <div className="pt-4 flex gap-3">

                {!hayDecants && (

                  <span className="
                    text-xs px-3 py-1 rounded-full
                    border border-border text-muted
                  ">
                    Próximamente
                  </span>

                )}

                {hayDecants && !disponible && (

                  <span className="
                    text-xs px-3 py-1 rounded-full
                    border border-border text-muted
                  ">
                    Sin stock
                  </span>

                )}

                {disponible && pocoStock && (

                  <span className="
                    text-xs px-3 py-1 rounded-full
                    bg-red-500 text-white
                  ">
                    ⚡ Poco stock
                  </span>

                )}

              </div>

            </div>


            {/* DESCRIPCIÓN */}

            {producto.descripcion && (

              <p className="
                text-muted text-lg leading-relaxed max-w-lg
              ">
                {producto.descripcion}
              </p>

            )}


            {/* PERFIL OLFATIVO */}

            {(producto.familiasOlfativas?.length ?? 0) > 0 && (

              <div className="space-y-4">

                <p className="
                  text-sm text-muted tracking-[0.2em] uppercase
                ">
                  Perfil olfativo
                </p>

                <div className="flex flex-wrap gap-2">

                  {producto.familiasOlfativas?.map((familia) => (

                    <span
                      key={familia}
                      className="
                        px-3 py-1 text-xs rounded-full
                        border border-accent/30
                        text-accent bg-accent/10
                      "
                    >
                      {familia}
                    </span>

                  ))}

                </div>

              </div>

            )}


            {/* DECANT SELECTOR */}

            <div className="space-y-4">

              <p className="
                text-sm font-medium tracking-wide text-text
              ">
                Tamaño
              </p>

              {!hayDecants ? (

                <p className="text-muted">
                  Disponible próximamente
                </p>

              ) : !disponible ? (

                <p className="text-muted">
                  Sin stock actualmente
                </p>

              ) : (

                <DecantSelector
                  decants={producto.decants}
                  perfumeId={producto.id} // 🔥 FIX
                  perfumeNombre={producto.nombre}
                  perfumeImagen={producto.imagen}
                />

              )}

            </div>


            {/* BADGES */}

            <ProductTrustBadges />


            {/* NOTAS */}

            {(producto.notas?.length ?? 0) > 0 && (

              <div className="pt-8 border-t border-border">

                <p className="
                  text-sm text-muted mb-5 tracking-[0.2em] uppercase
                ">
                  Notas principales
                </p>

                <div className="flex flex-wrap gap-3">

                  {producto.notas?.map((nota) => (

                    <span
                      key={nota}
                      className="
                        px-4 py-1.5 text-sm rounded-full
                        text-text bg-white/5 border border-border
                        backdrop-blur hover:border-accent
                        hover:text-accent transition-all duration-300
                      "
                    >
                      {nota}
                    </span>

                  ))}

                </div>

              </div>

            )}

          </div>

        </motion.div>

      </Container>


      {/* RECOMENDACIONES */}

      {(recomendaciones?.length ?? 0) > 0 && (

        <section className="pt-20">

          <Container className="space-y-12">

            <h2 className="font-serif text-3xl text-text">
              También te podría gustar
            </h2>

            <div className="
              grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              gap-x-6 gap-y-10
            ">

              {(recomendaciones ?? []).map((perfume) => (

                <PerfumeCard
                  key={perfume.id}
                  producto={perfume}
                />

              ))}
            </div>

          </Container>

        </section>

      )}

    </div>

  )

}