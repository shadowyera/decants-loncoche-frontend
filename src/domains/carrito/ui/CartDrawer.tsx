import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, Plus, Minus } from "lucide-react"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"

import { useCart } from "../hooks/useCart"

import { Button } from "../../../shared/components/ui/Button"
import { API_URL } from "../../../shared/api/api"

const MAX_PERFUME_DECANTS = 5

export function CartDrawer() {

  const navigate = useNavigate()

  const {
    items,
    removeItem,
    updateCantidad,
    total,
    isOpen,
    closeCart
  } = useCart()

  const totalPrice = total()

  /**
   * BLOQUEAR SCROLL CUANDO EL DRAWER ESTÁ ABIERTO
   */

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }

  }, [isOpen])


  function handleCheckout() {

    if (items.length === 0) return

    closeCart()

    navigate("/checkout")

  }


  return createPortal(

    <AnimatePresence>

      {isOpen && (

        <>

          {/* BACKDROP */}

          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* DRAWER */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="
              fixed
              right-0
              top-0
              h-dvh
              w-[380px]
              bg-background
              border-l
              border-border
              z-50
              flex
              flex-col
              text-text
            "
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-border">

              <h2 className="font-serif text-xl">
                Carrito
              </h2>

              <button
                onClick={closeCart}
                className="text-muted hover:text-text transition"
              >
                <X size={20} />
              </button>

            </div>


            {/* ITEMS */}

            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {items.length === 0 && (

                <p className="text-muted text-center mt-10">
                  Tu carrito está vacío
                </p>

              )}

              {items.map((item) => {

                const subtotal = item.precio * item.cantidad

                const perfumeTotal = items
                  .filter(i => i.perfumeId === item.perfumeId)
                  .reduce((acc, i) => acc + i.cantidad, 0)

                const reachedLimit = perfumeTotal >= MAX_PERFUME_DECANTS

                return (

                  <div
                    key={item.decantId}
                    className="
                      flex
                      gap-4
                      p-4
                      rounded-xl
                      bg-white/5
                      border
                      border-border
                    "
                  >

                    {/* IMAGE */}

                    {item.perfumeImagen && (

                      <img
                        src={`${API_URL}${item.perfumeImagen}`}
                        className="w-16 h-16 object-contain"
                      />

                    )}

                    {/* INFO */}

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        {item.perfumeNombre}
                      </p>

                      <p className="text-xs text-muted">
                        {item.ml} ml
                      </p>

                      <p className="text-xs text-muted mt-1">
                        ${item.precio.toLocaleString()} c/u
                      </p>

                      {/* CONTROLES */}

                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() =>
                            updateCantidad(item.decantId, item.cantidad - 1)
                          }
                          className="
                            w-7 h-7
                            flex
                            items-center
                            justify-center
                            rounded-md
                            bg-surface
                            hover:bg-surface-soft
                          "
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-sm w-6 text-center">
                          {item.cantidad}
                        </span>

                        <button
                          disabled={reachedLimit}
                          onClick={() =>
                            updateCantidad(item.decantId, item.cantidad + 1)
                          }
                          className="
                            w-7 h-7
                            flex
                            items-center
                            justify-center
                            rounded-md
                            bg-surface
                            hover:bg-surface-soft
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                        >
                          <Plus size={14} />
                        </button>

                      </div>

                      {reachedLimit && (
                        <p className="text-[10px] text-muted mt-1">
                          Máximo 5 decants por perfume
                        </p>
                      )}

                    </div>


                    {/* SUBTOTAL */}

                    <div className="flex flex-col items-end justify-between">

                      <button
                        onClick={() => removeItem(item.decantId)}
                        className="text-muted hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>

                      <p className="text-sm font-medium">
                        ${subtotal.toLocaleString()}
                      </p>

                    </div>

                  </div>

                )

              })}

            </div>


            {/* FOOTER */}

            <div className="border-t border-border p-6 space-y-4">

              <div className="flex justify-between text-lg font-medium">

                <span>Total</span>

                <span>
                  ${totalPrice.toLocaleString()}
                </span>

              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Ir al checkout
              </Button>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>,

    document.body

  )

}