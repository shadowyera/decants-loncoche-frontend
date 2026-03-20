import { useCatalogoQuery } from "../queries/useCatalogoQuery"

export function useCatalogo() {

  const { data, isLoading, error } = useCatalogoQuery()

  return {
    productos: data ?? [],
    isLoading,
    error,
  }
}