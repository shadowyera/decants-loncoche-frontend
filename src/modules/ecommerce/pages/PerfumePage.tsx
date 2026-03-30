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
      <Container className="py-20 text-center">
        <p className="text-muted text-sm">
          Cargando perfume...
        </p>
      </Container>
    )
  }

  if (isError || !producto) {
    return (
      <Container className="py-20 text-center">
        <p className="text-muted text-sm">
          Producto no encontrado
        </p>
      </Container>
    )
  }

  const notas = producto.notas ?? []
  const familias = producto.familiasOlfativas ?? []
  const recs = recomendaciones ?? []

  const hayDecants = producto.decants.length > 0

  const disponible = producto.decants.some(
    (d) => d.stockDisponible > 0
  )

  const pocoStock = producto.decants.some(
    (d) => d.stockDisponible > 0 && d.stockDisponible <= 3
  )

  return (

    <div className="py-16 md:py-24 space-y-16 md:space-y-32">

      <Container className="max-w-6xl">

        {/* BACK */}
        <button
          onClick={() => navigate("/catalogo")}
          className="flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-text transition mb-4"
        >
          <ArrowLeft size={16} />
          Volver
        </button>

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted mb-6 md:mb-12">

          <Link to="/catalogo" className="hover:text-accent transition">
            Catálogo
          </Link>

          <span className="opacity-50">/</span>

          <span className="text-text truncate">
            {producto.nombre}
          </span>

        </div>

        {/* PRODUCTO */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start"
        >

          {/* IMAGEN (SIN SOMBRA) */}
          <div className="relative flex items-center justify-center p-6 sm:p-10 md:p-16">

            {producto.imagen ? (

              <motion.img
                src={producto.imagen}
                alt={producto.nombre}
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 object-contain w-full max-h-[700px] md:max-h-[750px]"
              />

            ) : (

              <div className="flex items-center justify-center h-[250px] text-muted text-sm">
                Sin imagen
              </div>

            )}

          </div>

          {/* INFO */}
          <div className="space-y-8 md:space-y-12">

            {/* TITULO */}
            <div>

              <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-accent">
                {producto.marca}
              </p>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl leading-tight mt-2 md:mt-3 text-text">
                {producto.nombre}
              </h1>

              <div className="pt-3 flex gap-2 flex-wrap">

                {!hayDecants && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted">
                    Próximamente
                  </span>
                )}

                {hayDecants && !disponible && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted">
                    Sin stock
                  </span>
                )}

                {disponible && pocoStock && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white">
                    ⚡ Poco stock
                  </span>
                )}

              </div>

            </div>

            {/* DESCRIPCIÓN */}
            {producto.descripcion && (
              <p className="text-muted text-sm sm:text-base leading-relaxed max-w-lg">
                {producto.descripcion}
              </p>
            )}

            {/* PERFIL OLFATIVO */}
            {familias.length > 0 && (

              <div className="space-y-3">

                <p className="text-xs tracking-[0.2em] uppercase text-muted">
                  Perfil olfativo
                </p>

                <div className="flex flex-wrap gap-2">

                  {familias.map((familia) => (

                    <span
                      key={familia}
                      className="px-2.5 py-1 text-[10px] sm:text-xs rounded-full border border-accent/30 text-accent bg-accent/10"
                    >
                      {familia}
                    </span>

                  ))}

                </div>

              </div>

            )}

            {/* SELECTOR */}
            <div className="space-y-3">

              <p className="text-sm font-medium text-text">
                Tamaño
              </p>

              {!hayDecants ? (
                <p className="text-muted text-sm">
                  Disponible próximamente
                </p>
              ) : !disponible ? (
                <p className="text-muted text-sm">
                  Sin stock actualmente
                </p>
              ) : (
                <DecantSelector
                  decants={producto.decants}
                  perfumeId={producto.id}
                  perfumeNombre={producto.nombre}
                  perfumeImagen={producto.imagen}
                />
              )}

            </div>

            {/* BADGES */}
            <ProductTrustBadges />

            {/* NOTAS */}
            {notas.length > 0 && (

              <div className="pt-6 md:pt-8 border-t border-border">

                <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                  Notas principales
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3">

                  {notas.map((nota) => (

                    <span
                      key={nota}
                      className="px-3 py-1 text-xs sm:text-sm rounded-full text-text bg-white/5 border border-border"
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
      {recs.length > 0 && (

        <section>

          <Container className="space-y-6 md:space-y-12">

            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-text">
              También te podría gustar
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">

              {recs.map((perfume) => (

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