import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  iniciarPedidoAdminApi,
  confirmarPedidoAdminApi,
  cancelarPedidoAdminApi
} from "../api/adminPedido.api"

import { adminPedidoKeys } from "./adminPedido.keys"


/* =====================================================
   INICIAR PEDIDO
===================================================== */

export function useIniciarPedido() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: iniciarPedidoAdminApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPedidoKeys.all
      })

    }

  })

}


/* =====================================================
   CONFIRMAR PEDIDO
===================================================== */

export function useConfirmarPedido() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: confirmarPedidoAdminApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPedidoKeys.all
      })

    }

  })

}


/* =====================================================
   CANCELAR PEDIDO
===================================================== */

export function useCancelarPedido() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: cancelarPedidoAdminApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: adminPedidoKeys.all
      })

    }

  })

}