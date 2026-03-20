export interface CartItem {
  decantId: string
  perfumeId: string

  ml: number
  precio: number
  cantidad: number

  perfumeNombre: string
  perfumeImagen?: string
}

export interface CartState {
  items: CartItem[]

  /* =========================
     DRAWER STATE
  ========================= */

  isOpen: boolean

  openCart: () => void
  closeCart: () => void

  /* =========================
     CART ACTIONS
  ========================= */

  addItem: (item: CartItem) => void
  removeItem: (decantId: string) => void
  updateCantidad: (decantId: string, cantidad: number) => void
  clearCart: () => void

  total: () => number
}