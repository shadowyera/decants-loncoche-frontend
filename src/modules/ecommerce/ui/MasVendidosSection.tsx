import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { useMasVendidos } from "../../../domains/catalogo/hooks/useMasVendidos"

import { Container } from "../../../shared/components/ui/Container"

export function MasVendidosSection() {

  const { productos, isLoading } = useMasVendidos()

  const lista = productos ?? []

  if (isLoading || lista.length === 0) {
    return null
  }

  return (

    <section className="py-16 md:py-24">

      <Container className="space-y-8 md:space-y-14">

        {/* HEADER */}

        <div className="text-center space-y-2 md:space-y-4">

          <p className="text-accent text-xs sm:text-sm tracking-[0.25em] uppercase">
            Perfumes populares
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text">
            Más vendidos
          </h2>

          <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
            Algunos de los perfumes más buscados en nuestra tienda.
          </p>

        </div>


        {/* GRID */}

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            sm:gap-5
            md:gap-6
          "
        >

          {lista.map((producto) => (

            <PerfumeCard
              key={producto.id}
              producto={producto}
            />

          ))}

        </div>

      </Container>

    </section>

  )

}