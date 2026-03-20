import { apiClient } from "../../../shared/api/apiClient"

import type { Pedido } from "../domain/pedido.types"


/* =====================================================
   TIPOS PAGINACION
===================================================== */

export interface PedidosAdminResponse {

  data: Pedido[]

  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }

}


/* =====================================================
   LISTAR PEDIDOS
   GET /admin/pedidos?page=1&limit=10
===================================================== */

export async function listarPedidosAdminApi(
  page: number = 1,
  limit: number = 10
) {

  const { data } = await apiClient.get<PedidosAdminResponse>(
    "/admin/pedidos",
    {
      params: {
        page,
        limit
      }
    }
  )

  return data

}


/* =====================================================
   INICIAR PEDIDO
   POST /admin/pedidos/:id/iniciar
   Reserva stock
===================================================== */

export async function iniciarPedidoAdminApi(
  id: string
) {

  const { data } = await apiClient.post<Pedido>(
    `/admin/pedidos/${id}/iniciar`
  )

  return data

}


/* =====================================================
   CONFIRMAR PEDIDO
   POST /admin/pedidos/:id/confirmar
   Confirma venta
===================================================== */

export async function confirmarPedidoAdminApi(
  id: string
) {

  const { data } = await apiClient.post<Pedido>(
    `/admin/pedidos/${id}/confirmar`
  )

  return data

}


/* =====================================================
   CANCELAR PEDIDO
   POST /admin/pedidos/:id/cancelar
===================================================== */

export async function cancelarPedidoAdminApi(
  id: string
) {

  const { data } = await apiClient.post<Pedido>(
    `/admin/pedidos/${id}/cancelar`
  )

  return data

}