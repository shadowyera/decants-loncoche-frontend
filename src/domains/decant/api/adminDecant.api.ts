import { apiClient } from "../../../shared/api/apiClient"

import type {
  Decant,
  CrearDecantInput,
  ActualizarDecantInput
} from "../domain/decant.types"


/* =====================================================
   LISTAR DECANTS
   GET /admin/decants
===================================================== */

export async function listarDecantsAdminApi() {

  const { data } = await apiClient.get<Decant[]>(
    "/admin/decants"
  )

  return data

}


/* =====================================================
   OBTENER DECANT
   GET /admin/decants/:id
===================================================== */

export async function obtenerDecantAdminApi(id: string) {

  const { data } = await apiClient.get<Decant>(
    `/admin/decants/${id}`
  )

  return data

}


/* =====================================================
   CREAR DECANT
   POST /admin/decants
===================================================== */

export async function crearDecantAdminApi(
  input: CrearDecantInput
) {

  const { data } = await apiClient.post<Decant>(
    "/admin/decants",
    input
  )

  return data

}


/* =====================================================
   ACTUALIZAR DECANT
   PATCH /admin/decants/:id
===================================================== */

export async function actualizarDecantAdminApi(
  id: string,
  input: ActualizarDecantInput
) {

  const { data } = await apiClient.patch<Decant>(
    `/admin/decants/${id}`,
    input
  )

  return data

}


/* =====================================================
   ACTUALIZAR STOCK DECANT
   PATCH /admin/decants/:id/stock
===================================================== */

export async function actualizarStockDecantAdminApi(
  id: string,
  stockDisponible: number
) {

  const { data } = await apiClient.patch<Decant>(
    `/admin/decants/${id}/stock`,
    { stockDisponible }
  )

  return data

}


/* =====================================================
   CAMBIAR ESTADO DECANT
   PATCH /admin/decants/:id/estado
===================================================== */

export async function cambiarEstadoDecantAdminApi(
  id: string
) {

  const { data } = await apiClient.patch<Decant>(
    `/admin/decants/${id}/estado`
  )

  return data

}