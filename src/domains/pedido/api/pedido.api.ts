import { apiClient } from "../../../shared/api/apiClient"

import type {
  Pedido,
  CrearPedidoInput
} from "../domain/pedido.types"


/* =====================================================
   CREAR PEDIDO
   POST /pedido
===================================================== */

export async function crearPedidoApi(
  input: CrearPedidoInput
) {

  const { data } = await apiClient.post<Pedido>(
    "/pedidos",
    input
  )

  return data

}


/* =====================================================
   OBTENER PEDIDO
   GET /pedido/:id
===================================================== */

export async function obtenerPedidoApi(
  id: string
) {

  const { data } = await apiClient.get<Pedido>(
    `/pedidos/${id}`
  )

  return data

}