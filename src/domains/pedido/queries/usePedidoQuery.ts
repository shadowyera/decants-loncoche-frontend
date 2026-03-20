import { useQuery } from "@tanstack/react-query"
import { obtenerPedidoApi } from "../api/pedido.api"

export function usePedidoQuery(id: string) {

  return useQuery({
    queryKey: ["pedido", id],
    queryFn: () => obtenerPedidoApi(id),
    enabled: !!id
  })

}