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
===================================================== */

export async function listarPerfumesAdminApi() {
  const { data } = await apiClient.get<Perfume[]>("/admin/perfumes")
  return data
}


/* =====================================================
   OBTENER PERFUME
===================================================== */

export async function obtenerPerfumeAdminApi(id: string) {
  if (!id) throw new Error("ID requerido")

  const { data } = await apiClient.get<Perfume>(
    `/admin/perfumes/${id}`
  )

  return data
}


/* =====================================================
   DETALLE PERFUME (ADMIN)
===================================================== */

export async function obtenerDetallePerfumeAdminApi(id: string) {
  if (!id) throw new Error("ID requerido")

  const { data } = await apiClient.get<PerfumeDetalleAdmin>(
    `/admin/perfumes/${id}/detalle`
  )

  return data
}


/* =====================================================
   LISTAR DECANTS POR PERFUME
===================================================== */

export async function listarDecantsPorPerfumeAdminApi(id: string) {
  if (!id) throw new Error("ID requerido")

  const { data } = await apiClient.get<Decant[]>(
    `/admin/perfumes/${id}/decants`
  )

  return data
}


/* =====================================================
   CREAR PERFUME
===================================================== */

export async function crearPerfumeAdminApi(
  input: CrearPerfumeInput
) {
  const payload = {
    ...input,
    notas: input.notas?.map(n => n.trim())
  }

  const { data } = await apiClient.post<Perfume>(
    "/admin/perfumes",
    payload
  )

  return data
}


/* =====================================================
   ACTUALIZAR PERFUME
===================================================== */

export async function actualizarPerfumeAdminApi(
  id: string,
  input: ActualizarPerfumeInput
) {
  if (!id) throw new Error("ID requerido")

  const payload = {
    ...input,
    notas: input.notas?.map(n => n.trim())
  }

  const { data } = await apiClient.patch<Perfume>(
    `/admin/perfumes/${id}`,
    payload
  )

  return data
}


/* =====================================================
   CAMBIAR ESTADO PERFUME
===================================================== */

export async function cambiarEstadoPerfumeAdminApi(id: string) {
  if (!id) throw new Error("ID requerido")

  const { data } = await apiClient.patch<Perfume>(
    `/admin/perfumes/${id}/estado`
  )

  return data
}