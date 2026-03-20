import { useMemo } from "react"
import { useCatalogo } from "./useCatalogo"

export function useMasVendidos() {

  const { productos, isLoading } = useCatalogo()

  const masVendidos = useMemo(() => {

    if (!productos) return []

    return productos
      .filter((p) => p.masVendido)
      .slice(0, 4)

  }, [productos])

  return {
    productos: masVendidos,
    isLoading
  }

}