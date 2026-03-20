import {
  listarPerfumesAdminApi,
  obtenerPerfumeAdminApi,
  obtenerDetallePerfumeAdminApi
} from "../api/adminPerfume.api"

import { adminPerfumeKeys } from "./adminPerfumeKeys"

export const adminPerfumeQueries = {

  listar: {
    queryKey: adminPerfumeKeys.list(),
    queryFn: listarPerfumesAdminApi
  },

  obtener: (id: string) => ({

    queryKey: adminPerfumeKeys.detail(id),

    queryFn: () => obtenerPerfumeAdminApi(id)

  }),

  detalle: (id: string) => ({

    queryKey: adminPerfumeKeys.detail(id),

    queryFn: () => obtenerDetallePerfumeAdminApi(id),

    enabled: !!id

  })

}