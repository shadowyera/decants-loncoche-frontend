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

  /* =============================
     MÁS VENDIDOS
  ============================= */

  const masVendidos =
    perfumes
      ?.filter((p) => p.masVendido)
      .slice(0, 3) ?? []

  return (

    <div className="space-y-32 pb-32">

      {/* HERO */}

      <section className="relative pt-32 pb-20 overflow-hidden">

        <Container className="grid md:grid-cols-2 items-center gap-16">

          {/* TEXTO */}

          <div className="space-y-8">

            <p
              className="
                text-sm
                tracking-[0.25em]
                uppercase
                text-accent
              "
            >
              Decants Loncoche
            </p>

            <h1
              className="
                font-serif
                text-5xl
                md:text-6xl
                leading-tight
                text-text
              "
            >
              Descubre nuevas
              <br />
              fragancias
            </h1>

            <p className="text-muted max-w-md text-lg">
              Explora perfumes de diseñador en formato decant.
              Prueba aromas increíbles sin comprar el frasco completo.
            </p>

            <div className="flex gap-4">

              <Link to="/catalogo">

                <Button size="lg">
                  Explorar catálogo
                </Button>

              </Link>

            </div>

          </div>


          {/* PERFUME HERO */}

          <div className="relative flex justify-center">

            <div
              className="
                absolute
                bottom-8
                w-[260px]
                h-[60px]
                bg-black/70
                blur-3xl
                rounded-full
                opacity-60
              "
            />

            <motion.img
              src={heroPerfume}
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="
                relative
                z-10
                max-h-[520px]
                object-contain
              "
            />

          </div>

        </Container>

      </section>


      {/* MÁS VENDIDOS */}

      <section>

        <Container className="space-y-16">

          <div className="text-center space-y-4">

            <p className="text-accent text-sm tracking-[0.2em] uppercase">
              Perfumes populares
            </p>

            <h2 className="font-serif text-4xl text-text">
              Más vendidos
            </h2>

            <p className="text-muted max-w-xl mx-auto">
              Algunos de los perfumes más buscados en nuestra tienda.
            </p>

          </div>


          {isLoading && (
            <p className="text-center text-muted">
              Cargando perfumes...
            </p>
          )}


          {!isLoading && masVendidos.length > 0 && (

            <div
              className="
                grid
                sm:grid-cols-2
                md:grid-cols-3
                gap-10
              "
            >

              {masVendidos.map((producto: CatalogoProducto) => (

                <PerfumeCard
                  key={producto.id}
                  producto={producto}
                />

              ))}

            </div>

          )}


          <div className="text-center">

            <Link to="/catalogo">

              <Button variant="secondary" size="lg">
                Ver catálogo completo
              </Button>

            </Link>

          </div>

        </Container>

      </section>


      {/* BENEFICIOS */}

      <section>

        <Container>

          <div
            className="
              grid
              md:grid-cols-3
              gap-12
              text-center
            "
          >

            <div className="space-y-4">

              <ShieldCheck
                size={28}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium">
                Perfumes originales
              </h3>

              <p className="text-muted text-sm max-w-xs mx-auto">
                Todas nuestras fragancias provienen de frascos
                originales de diseñador.
              </p>

            </div>


            <div className="space-y-4">

              <Sparkles
                size={28}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium">
                Decants desde 5ml
              </h3>

              <p className="text-muted text-sm max-w-xs mx-auto">
                Descubre nuevos aromas sin necesidad de comprar
                un frasco completo.
              </p>

            </div>


            <div className="space-y-4">

              <Truck
                size={28}
                className="text-accent mx-auto"
              />

              <h3 className="text-text font-medium">
                Envíos a todo Chile
              </h3>

              <p className="text-muted text-sm max-w-xs mx-auto">
                Despachamos a todo el país y entregas locales
                en Loncoche.
              </p>

            </div>

          </div>

        </Container>

      </section>

    </div>

  )

}