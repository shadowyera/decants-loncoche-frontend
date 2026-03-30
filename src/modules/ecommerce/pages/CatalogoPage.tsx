import { useState, useMemo } from "react"
import { motion } from "framer-motion"

import { useCatalogo } from "../../../domains/catalogo/hooks/useCatalogo"
import { PerfumeCard } from "../../../domains/catalogo/ui/PerfumeCard"
import { CatalogoFilters } from "../../../domains/catalogo/ui/CatalogoFilters"

import { Container } from "../../../shared/components/ui/Container"
import { Avisos } from "../ui/Avisos"

/* ===============================
   NORMALIZAR TEXTO
=============================== */

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function CatalogoPage() {

  const { productos, isLoading } = useCatalogo()

  const [search, setSearch] = useState("")
  const [filtro, setFiltro] = useState("todos")

  const productosFiltrados = useMemo(() => {

    let lista = productos

    /* 🔍 BUSQUEDA */
    if (search.trim()) {
      const q = normalizar(search.trim())

      lista = lista.filter((p) =>
        normalizar(p.nombre).includes(q) ||
        normalizar(p.marca).includes(q)
      )
    }

    /* 🎯 FILTRO FAMILIAS (FIX REAL) */
    if (filtro !== "todos") {
      const filtroNormalizado = normalizar(filtro)

      lista = lista.filter((p) =>
        p.familiasOlfativas?.some(f =>
          normalizar(f) === filtroNormalizado
        )
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


        {/* 🔥 AVISO */}
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