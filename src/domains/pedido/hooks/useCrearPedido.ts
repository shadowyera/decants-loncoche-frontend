import { useMutation } from "@tanstack/react-query"

import { crearPedidoApi } from "../api/pedido.api"

export function useCrearPedido() {

  return useMutation({
    mutationFn: crearPedidoApi
  })

}