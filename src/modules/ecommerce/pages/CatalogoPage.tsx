import { useState, useMemo } from "react"
import { motion } from "framer-motion"

import { useCatalogo } from "../../../domains/catalogo/hooks/useCatalogo"
import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { CatalogoFilters } from "../../../domains/catalogo/ui/CatalogoFilters"

import { Container } from "../../../shared/components/ui/Container"
import { Avisos } from "../ui/Avisos"

export function CatalogoPage() {

  const { productos, isLoading } = useCatalogo()

  const [search, setSearch] = useState("")
  const [filtro, setFiltro] = useState("todos")

  const productosFiltrados = useMemo(() => {

    let lista = productos

    if (search.trim()) {
      const q = search.toLowerCase()
      lista = lista.filter((p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q)
      )
    }

    if (filtro !== "todos") {
      lista = lista.filter((p) =>
        p.familiasOlfativas?.includes(filtro)
      )
    }

    return lista

  }, [productos, search, filtro])


  if (isLoading) {
    return (
      <Container className="py-20 text-center">
        <p className="text-muted text-sm">
          Cargando catálogo...
        </p>
      </Container>
    )
  }


  return (

    <div className="pb-20">

      <Container className="pt-20 md:pt-28 space-y-8 md:space-y-12">

        {/* HEADER */}
        <div className="space-y-2 text-center md:text-left">

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text">
            Catálogo
          </h1>

          <p className="text-muted text-sm sm:text-base max-w-md mx-auto md:mx-0">
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


        {/* 🔥 AVISO (AQUÍ VA EL POWER) */}
        <Avisos />


        <div className="gold-divider" />


        {/* RESULTADOS */}
        <p className="text-xs sm:text-sm text-muted text-center md:text-left">
          {productosFiltrados.length} perfumes encontrados
        </p>


        {/* GRID */}
        <motion.div
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