import { useQuery } from "@tanstack/react-query"

import { obtenerProductoApi } from "../api/catalogo.api"
import { catalogoKeys } from "./catalogo.keys"

export function useProductoQuery(slug: string) {
  return useQuery({
    queryKey: catalogoKeys.detail(slug),
    queryFn: () => obtenerProductoApi(slug),
    enabled: !!slug,
  })
}