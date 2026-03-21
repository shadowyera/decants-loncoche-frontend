import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, Sparkles } from "lucide-react"

import { Container } from "../../../shared/components/ui/Container"
import { Button } from "../../../shared/components/ui/Button"

import { useCatalogo } from "../../../domains/catalogo/hooks/useCatalogo"
import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"

import type { CatalogoProducto } from "../../../domains/catalogo/domain/catalogo.types"

import heroPerfume from "../../../assets/hero-perfume.png"

export function HomePage() {

  const { productos: perfumes, isLoading } = useCatalogo()

  const masVendidos =
    perfumes
      ?.filter((p) => p.masVendido)
      .slice(0, 3) ?? []

  return (

    <div className="space-y-20 pb-20">

      {/* HERO */}
      <section className="relative pt-20 pb-10 overflow-hidden">

        <Container className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

          {/* TEXTO */}
          <div className="space-y-6 text-center md:text-left">

            <p className="text-xs tracking-[0.25em] uppercase text-accent">
              Decants Loncoche
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-text">
              Descubre nuevas{" "}
              <span className="block md:inline">fragancias</span>
            </h1>

            <p className="text-muted text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Explora perfumes de diseñador en formato decant.
              Prueba aromas increíbles sin comprar el frasco completo.
            </p>

            <div className="flex justify-center md:justify-start">

              <Link to="/catalogo">
                <Button size="lg" className="w-full sm:w-auto">
                  Explorar catálogo
                </Button>
              </Link>

            </div>

          </div>

          {/* PERFUME HERO */}
          <div className="relative flex justify-center">

            <div className="absolute bottom-4 w-[180px] h-[40px] bg-black/70 blur-3xl rounded-full opacity-60" />

            <motion.img
              src={heroPerfume}
              animate={{ y: [-6, 6, -6] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 max-h-[260px] sm:max-h-[320px] md:max-h-[520px] object-contain"
            />

          </div>

        </Container>

      </section>

      {/* MÁS VENDIDOS */}
      <section>

        <Container className="space-y-10">

          <div className="text-center space-y-3">

            <p className="text-accent text-xs tracking-[0.2em] uppercase">
              Perfumes populares
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text">
              Más vendidos
            </h2>

            <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
              Algunos de los perfumes más buscados en nuestra tienda.
            </p>

          </div>

          {isLoading && (
            <p className="text-center text-muted">
              Cargando perfumes...
            </p>
          )}

          {!isLoading && masVendidos.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {masVendidos.map((producto: CatalogoProducto) => (

                <PerfumeCard
                  key={producto.id}
                  producto={producto}
                />

              ))}

            </div>

          )}

          <div className="text-center pt-4">

            <Link to="/catalogo">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver catálogo completo
              </Button>
            </Link>

          </div>

        </Container>

      </section>

      {/* BENEFICIOS */}
      <section>

        <Container>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">

            <div className="space-y-3">

              <ShieldCheck
                size={26}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium text-sm sm:text-base">
                Perfumes originales
              </h3>

              <p className="text-muted text-xs sm:text-sm max-w-xs mx-auto">
                Todas nuestras fragancias provienen de frascos originales de diseñador.
              </p>

            </div>

            <div className="space-y-3">

              <Sparkles
                size={26}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium text-sm sm:text-base">
                Decants desde 5ml
              </h3>

              <p className="text-muted text-xs sm:text-sm max-w-xs mx-auto">
                Descubre nuevos aromas sin comprar un frasco completo.
              </p>

            </div>

            <div className="space-y-3">

              <Truck
                size={26}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium text-sm sm:text-base">
                Envíos a todo Chile
              </h3>

              <p className="text-muted text-xs sm:text-sm max-w-xs mx-auto">
                Despachamos a todo el país y entregas locales en Loncoche.
              </p>

            </div>

          </div>

        </Container>

      </section>

    </div>

  )

}