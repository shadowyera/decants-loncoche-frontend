import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { CartState } from "../domain/cart.types"

const MAX_PERFUME_DECANTS = 5

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],

      /* =========================
         ESTADO DEL DRAWER
      ========================= */

      isOpen: false,

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      /* =========================
         ADD ITEM
      ========================= */

      addItem: (item) => {

        const items = get().items

        // cuantos decants hay de ese perfume
        const perfumeCount = items
          .filter((i) => i.perfumeId === item.perfumeId)
          .reduce((acc, i) => acc + i.cantidad, 0)

        // si ya llegó al límite
        if (perfumeCount >= MAX_PERFUME_DECANTS) {
          return
        }

        const existing = items.find(
          (i) => i.decantId === item.decantId
        )

        if (existing) {

          const nuevaCantidad = Math.min(
            existing.cantidad + item.cantidad,
            MAX_PERFUME_DECANTS - (perfumeCount - existing.cantidad)
          )

          set({
            items: items.map((i) =>
              i.decantId === item.decantId
                ? { ...i, cantidad: nuevaCantidad }
                : i
            ),
            isOpen: true
          })

          return
        }

        set({
          items: [...items, item],
          isOpen: true
        })

      },

      /* =========================
         REMOVE ITEM
      ========================= */

      removeItem: (decantId) => {

        set({
          items: get().items.filter(
            (i) => i.decantId !== decantId
          )
        })

      },

      /* =========================
         UPDATE CANTIDAD
      ========================= */

      updateCantidad: (decantId, cantidad) => {

        const items = get().items

        const item = items.find(i => i.decantId === decantId)

        if (!item) return

        if (cantidad <= 0) {

          set({
            items: items.filter(i => i.decantId !== decantId)
          })

          return
        }

        const perfumeCount = items
          .filter(i => i.perfumeId === item.perfumeId)
          .reduce((acc, i) => acc + i.cantidad, 0)

        const maxDisponible =
          MAX_PERFUME_DECANTS - (perfumeCount - item.cantidad)

        const nuevaCantidad = Math.min(cantidad, maxDisponible)

        set({
          items: items.map((i) =>
            i.decantId === decantId
              ? { ...i, cantidad: nuevaCantidad }
              : i
          )
        })

      },

      /* =========================
         CLEAR CART
      ========================= */

      clearCart: () => {

        set({ items: [] })

      },

      /* =========================
         TOTAL
      ========================= */

      total: () => {

        return get().items.reduce(
          (acc, item) => acc + item.precio * item.cantidad,
          0
        )

      }

    }),
    {
      name: "decants-loncoche-cart",

      partialize: (state) => ({
        items: state.items
      })
    }
  )
)