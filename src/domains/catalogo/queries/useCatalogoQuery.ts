import { useQuery } from "@tanstack/react-query"

import { obtenerCatalogoApi } from "../api/catalogo.api"
import { catalogoKeys } from "./catalogo.keys"

export function useCatalogoQuery() {
  return useQuery({
    queryKey: catalogoKeys.list(),
    queryFn: obtenerCatalogoApi,
  })
}