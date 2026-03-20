/**
 * ==========================================
 * ESTADOS DEL PEDIDO
 * ==========================================
 */

export const ESTADO_PEDIDO = {
  PENDIENTE: "PENDIENTE",
  EN_PROCESO: "EN_PROCESO",
  PAGADO: "PAGADO",
  CANCELADO: "CANCELADO"
} as const

export type ESTADO_PEDIDO =
  (typeof ESTADO_PEDIDO)[keyof typeof ESTADO_PEDIDO]



/**
 * ==========================================
 * PERFUME (PARCIAL PARA POPULATE)
 * ==========================================
 */

export interface PerfumePedido {
  _id: string
  nombre: string
  marca: string
}



/**
 * ==========================================
 * DECANT (PARCIAL PARA POPULATE)
 * ==========================================
 */

export interface DecantPedido {
  _id: string
  ml: number
  perfumeId: PerfumePedido
}



/**
 * ==========================================
 * ITEM DEL PEDIDO
 * ==========================================
 */

export interface PedidoItem {

  decantId: DecantPedido

  cantidad: number

  precioUnitario: number
}



/**
 * ==========================================
 * PEDIDO
 * ==========================================
 */

export interface Pedido {

  _id: string

  numeroPedido: string

  clienteNombre?: string

  clienteTelefono?: string

  direccion?: string

  items: PedidoItem[]

  total: number

  estado: ESTADO_PEDIDO

  createdAt: string

  updatedAt: string
}



/**
 * ==========================================
 * CREAR PEDIDO (CHECKOUT)
 * ==========================================
 */

export interface CrearPedidoInput {

  clienteNombre?: string

  clienteTelefono?: string

  direccion?: string

  items: {
    decantId: string
    cantidad: number
  }[]

}



/**
 * ==========================================
 * PARAMETROS ACCIONES ADMIN
 * ==========================================
 */

export interface PedidoActionParams {
  id: string
}



/**
 * ==========================================
 * PAGINACION ADMIN PEDIDOS
 * ==========================================
 */

export interface PedidosAdminResponse {

  data: Pedido[]

  pagination: {

    page: number

    limit: number

    total: number

    totalPages: number

  }

}