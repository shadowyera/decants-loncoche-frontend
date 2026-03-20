import { apiClient } from "../../../shared/api/apiClient"

import type {
  Perfume,
  CrearPerfumeInput,
  ActualizarPerfumeInput,
  PerfumeDetalleAdmin
} from "../domain/perfume.types"

import type { Decant } from "../../decant/domain/decant.types"


/* =====================================================
   LISTAR PERFUMES
   GET /admin/perfumes
===================================================== */

export async function listarPerfumesAdminApi() {

  const { data } = await apiClient.get<Perfume[]>(
    "/admin/perfumes"
  )

  return data

}


/* =====================================================
   OBTENER PERFUME
   GET /admin/perfumes/:id
===================================================== */

export async function obtenerPerfumeAdminApi(
  id: string
) {

  const { data } = await apiClient.get<Perfume>(
    `/admin/perfumes/${id}`
  )

  return data

}


/* =====================================================
   DETALLE PERFUME (ADMIN)
   GET /admin/perfumes/:id/detalle
===================================================== */

export async function obtenerDetallePerfumeAdminApi(
  id: string
) {

  const { data } = await apiClient.get<PerfumeDetalleAdmin>(
    `/admin/perfumes/${id}/detalle`
  )

  return data

}


/* =====================================================
   LISTAR DECANTS POR PERFUME
   GET /admin/perfumes/:id/decants
===================================================== */

export async function listarDecantsPorPerfumeAdminApi(
  id: string
) {

  const { data } = await apiClient.get<Decant[]>(
    `/admin/perfumes/${id}/decants`
  )

  return data

}


/* =====================================================
   CREAR PERFUME
   POST /admin/perfumes
===================================================== */

export async function crearPerfumeAdminApi(
  input: CrearPerfumeInput
) {

  const { data } = await apiClient.post<Perfume>(
    "/admin/perfumes",
    input
  )

  return data

}


/* =====================================================
   ACTUALIZAR PERFUME
   PATCH /admin/perfumes/:id
===================================================== */

export async function actualizarPerfumeAdminApi(
  id: string,
  input: ActualizarPerfumeInput
) {

  const { data } = await apiClient.patch<Perfume>(
    `/admin/perfumes/${id}`,
    input
  )

  return data

}


/* =====================================================
   CAMBIAR ESTADO PERFUME
   PATCH /admin/perfumes/:id/estado
===================================================== */

export async function cambiarEstadoPerfumeAdminApi(
  id: string
) {

  const { data } = await apiClient.patch<Perfume>(
    `/admin/perfumes/${id}/estado`
  )

  return data

}