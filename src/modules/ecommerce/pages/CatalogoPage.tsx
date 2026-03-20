import { useState, useMemo } from "react"
import { motion } from "framer-motion"

import { useCatalogo } from "../../../domains/catalogo/hooks/useCatalogo"
import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { CatalogoFilters } from "../../../domains/catalogo/ui/CatalogoFilters"

import { Container } from "../../../shared/components/ui/Container"

export function CatalogoPage() {

  const { productos, isLoading } = useCatalogo()

  const [search, setSearch] = useState("")
  const [filtro, setFiltro] = useState("todos")

  const productosFiltrados = useMemo(() => {

    let lista = productos

    /* =========================
       SEARCH
    ========================= */

    if (search.trim()) {

      const q = search.toLowerCase()

      lista = lista.filter((p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q)
      )

    }

    /* =========================
       FILTRO POR FAMILIA
    ========================= */

    if (filtro !== "todos") {

      lista = lista.filter((p) =>
        p.familiasOlfativas?.includes(filtro)
      )

    }

    return lista

  }, [productos, search, filtro])

  if (isLoading) {
    return (
      <Container className="py-24 text-center">
        <p className="text-muted">
          Cargando catálogo...
        </p>
      </Container>
    )
  }

  return (

    <div className="pb-24">

      <Container className="pt-28 space-y-12">

        {/* HEADER */}

        <div className="space-y-4">

          <h1 className="font-serif text-4xl text-text">
            Catálogo
          </h1>

          <p className="text-muted">
            Descubre nuestras fragancias disponibles en formato decant.
          </p>

        </div>


        {/* FILTROS */}

        <CatalogoFilters
          search={search}
          onSearchChange={setSearch}
          filtro={filtro}
          onFiltroChange={setFiltro}
        />


        <div className="gold-divider" />


        {/* RESULTADOS */}

        <p className="text-sm text-muted">

          {productosFiltrados.length} perfumes encontrados

        </p>


        {/* GRID */}

        <motion.div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-x-6
            gap-y-10
          "
        >

          {productosFiltrados.map((producto) => (

            <PerfumeCard
              key={producto.id}
              producto={producto}
            />

          ))}

        </motion.div>

      </Container>

    </div>

  )

}