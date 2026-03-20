import { useCartStore } from "../store/cart.store"

export function useCart() {

  const items = useCartStore((state) => state.items)

  const addItem = useCartStore((state) => state.addItem)

  const removeItem = useCartStore((state) => state.removeItem)

  const updateCantidad = useCartStore((state) => state.updateCantidad)

  const clearCart = useCartStore((state) => state.clearCart)

  const total = useCartStore((state) => state.total)

  const isOpen = useCartStore((state) => state.isOpen)

  const openCart = useCartStore((state) => state.openCart)

  const closeCart = useCartStore((state) => state.closeCart)

  return {
    items,
    addItem,
    removeItem,
    updateCantidad,
    clearCart,
    total,
    isOpen,
    openCart,
    closeCart
  }

}