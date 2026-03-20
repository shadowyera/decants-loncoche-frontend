import { useQuery } from "@tanstack/react-query"

import { listarPedidosAdminApi } from "../api/adminPedido.api"

import { adminPedidoKeys } from "./adminPedido.keys"

import type { PedidosAdminResponse } from "../domain/pedido.types"


export function useAdminPedidos(page: number) {

  return useQuery<PedidosAdminResponse>({

    queryKey: [...adminPedidoKeys.list(), page],

    queryFn: () => listarPedidosAdminApi(page),

    placeholderData: (previousData) => previousData

  })

}