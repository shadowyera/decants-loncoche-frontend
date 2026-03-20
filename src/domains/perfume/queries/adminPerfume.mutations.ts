import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  crearPerfumeAdminApi,
  actualizarPerfumeAdminApi,
  cambiarEstadoPerfumeAdminApi
} from "../api/adminPerfume.api"

import { adminPerfumeKeys } from "./adminPerfumeKeys"

export function useCrearPerfumeAdmin() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: crearPerfumeAdminApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPerfumeKeys.all
      })

    }

  })

}

export function useActualizarPerfume() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: ({
      id,
      input
    }: {
      id: string
      input: any
    }) => actualizarPerfumeAdminApi(id, input),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPerfumeKeys.all
      })

    }

  })

}

export function useTogglePerfume() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: cambiarEstadoPerfumeAdminApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPerfumeKeys.all
      })

    }

  })

}