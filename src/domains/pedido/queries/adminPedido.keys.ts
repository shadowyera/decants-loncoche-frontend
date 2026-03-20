export const adminPedidoKeys = {

  all: ["admin", "pedidos"] as const,

  lists: () => [...adminPedidoKeys.all, "list"] as const,

  list: () => [...adminPedidoKeys.lists()] as const,

  detail: (id: string) =>
    [...adminPedidoKeys.all, "detail", id] as const

}