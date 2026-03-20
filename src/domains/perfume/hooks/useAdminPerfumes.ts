import { useQuery } from "@tanstack/react-query"

import { adminPerfumeQueries } from "../queries/adminPerfume.queries"

import {
  useCrearPerfumeAdmin,
  useActualizarPerfume,
  useTogglePerfume
} from "../queries/adminPerfume.mutations"

export function useAdminPerfumes() {

  /* ===============================
     QUERY
  =============================== */

  const perfumesQuery = useQuery({
    ...adminPerfumeQueries.listar
  })


  /* ===============================
     MUTATIONS
  =============================== */

  const crearPerfumeMutation = useCrearPerfumeAdmin()
  const actualizarPerfumeMutation = useActualizarPerfume()
  const togglePerfumeMutation = useTogglePerfume()


  /* ===============================
     ACTIONS
  =============================== */

  const crearPerfume = crearPerfumeMutation.mutateAsync
  const actualizarPerfume = actualizarPerfumeMutation.mutateAsync
  const togglePerfume = togglePerfumeMutation.mutateAsync


  /* ===============================
     STATES
  =============================== */

  const isSaving =
    crearPerfumeMutation.isPending ||
    actualizarPerfumeMutation.isPending

  const isToggling =
    togglePerfumeMutation.isPending


  /* ===============================
     RETURN
  =============================== */

  return {

    perfumes: perfumesQuery.data ?? [],

    isLoading: perfumesQuery.isLoading,

    error: perfumesQuery.error,


    crearPerfume,
    actualizarPerfume,
    togglePerfume,


    isSaving,
    isToggling

  }

}