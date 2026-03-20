import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { useMasVendidos } from "../../../domains/catalogo/hooks/useMasVendidos"

import { Container } from "../../../shared/components/ui/Container"

export function MasVendidosSection() {

  const { productos, isLoading } = useMasVendidos()

  if (isLoading || productos.length === 0) {
    return null
  }

  return (

    <section className="py-24">

      <Container className="space-y-14">

        <div className="text-center space-y-4">

          <p className="text-accent text-sm tracking-[0.3em] uppercase">
            Perfumes populares
          </p>

          <h2 className="font-serif text-4xl text-text">
            Más vendidos
          </h2>

          <p className="text-muted">
            Algunos de los perfumes más buscados en nuestra tienda.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-x-6
            gap-y-10
          "
        >

          {productos.map((producto) => (

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