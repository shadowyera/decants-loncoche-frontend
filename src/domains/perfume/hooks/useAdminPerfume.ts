import { useQuery } from "@tanstack/react-query"

import { adminPerfumeQueries } from "../queries/adminPerfume.queries"

export function useAdminPerfume(id?: string) {

  const detalleQuery = useQuery({
    ...adminPerfumeQueries.detalle(id!),
    enabled: !!id
  })

  return {

    detalle: detalleQuery.data ?? null,

    isLoading: detalleQuery.isLoading

  }

}