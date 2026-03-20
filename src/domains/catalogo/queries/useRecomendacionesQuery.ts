import { useQuery } from "@tanstack/react-query"

import { obtenerRecomendacionesApi } from "../api/catalogo.api"

export function useRecomendacionesQuery(slug: string) {

  return useQuery({
    queryKey: ["recomendaciones", slug],
    queryFn: () => obtenerRecomendacionesApi(slug),
    enabled: !!slug
  })

}