import { useState, useEffect, useMemo } from "react"

import type { CatalogoDecant } from "../domain/catalogo.types"

import { Button } from "../../../shared/components/ui/Button"
import { useCart } from "../../carrito/hooks/useCart"

interface DecantSelectorProps {
  decants: CatalogoDecant[]
  perfumeId: string
  perfumeNombre: string
  perfumeImagen?: string
  disabled?: boolean
}

export function DecantSelector({
  decants,
  perfumeId,
  perfumeNombre,
  perfumeImagen,
  disabled = false
}: DecantSelectorProps) {

  const { addItem, items } = useCart()

  /* =========================
     DATA DERIVADA
  ========================= */

  const decantsDisponibles = useMemo(
    () => decants.filter(d => d.stockDisponible > 0),
    [decants]
  )

  const recomendado = useMemo(
    () => decants.find(d => d.ml === 5) ?? decants[0],
    [decants]
  )

  /* =========================
     SELECCIÓN
  ========================= */

  const [selectedDecantId, setSelectedDecantId] =
    useState<string | null>(null)

  useEffect(() => {

    if (!decants.length) return

    const defaultDecant =
      decantsDisponibles[0]?.id ??
      recomendado?.id ??
      decants[0].id

    setSelectedDecantId(defaultDecant)

  }, [decants])

  const selectedDecant = decants.find(
    d => d.id === selectedDecantId
  )

  const stock = selectedDecant?.stockDisponible ?? 0

  /* =========================
     CARRITO
  ========================= */

  const cantidadEnCarrito = items
    .filter(item => item.decantId === selectedDecantId)
    .reduce((total, item) => total + item.cantidad, 0)

  const MAX_DECANTS = 5
  const limiteAlcanzado = cantidadEnCarrito >= MAX_DECANTS

  /* =========================
     ACCIÓN
  ========================= */

  function handleAddToCart() {

    if (!selectedDecant) return
    if (limiteAlcanzado) return
    if (stock === 0) return

    addItem({
      decantId: selectedDecant.id,
      perfumeId,
      ml: selectedDecant.ml,
      precio: selectedDecant.precio,
      cantidad: 1,
      perfumeNombre,
      perfumeImagen
    })

  }

  if (!selectedDecant) return null

  return (

    <div className="space-y-10">

      {/* =========================
          SELECTOR
      ========================= */}

      <div className="flex gap-3 flex-wrap">

        {decants.map((decant) => {

          const stockDecant = decant.stockDisponible ?? 0
          const isSelected = decant.id === selectedDecantId
          const sinStock = stockDecant === 0
          const isRecomendado = decant.ml === recomendado?.ml

          return (

            <button
              key={decant.id}
              onClick={() => !sinStock && setSelectedDecantId(decant.id)}
              disabled={sinStock || disabled}
              className={`
                relative
                px-4 py-2 text-sm rounded-full border
                transition-all duration-300

                ${sinStock
                  ? "border-border text-muted opacity-40 cursor-not-allowed"
                  : isSelected
                    ? "border-accent text-accent bg-transparent shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                    : "border-border text-text bg-surface hover:border-accent hover:text-accent"
                }
              `}
            >

              {decant.ml} ml

              {/* 🔥 RECOMENDADO */}
              {isRecomendado && !sinStock && (
                <span className="ml-2 text-[10px] text-accent">
                  🔥
                </span>
              )}

              {/* ⚡ STOCK BAJO */}
              {stockDecant > 0 && stockDecant <= 3 && (
                <span className="ml-1 text-[10px] text-red-400">
                  ⚡
                </span>
              )}

            </button>

          )

        })}

      </div>

      {/* =========================
          PRECIO + CTA
      ========================= */}

      <div className="flex items-center justify-between pt-8 border-t border-border">

        <div className="space-y-1">

          <p className="text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e7d7a8] to-[#caa85a]">
            ${selectedDecant.precio.toLocaleString()}
          </p>

          <p className="text-xs text-muted">
            {selectedDecant.ml} ml
          </p>

          {stock > 0 && stock <= 3 && (
            <p className="text-xs text-red-400">
              Solo {stock} disponibles
            </p>
          )}

          {limiteAlcanzado && (
            <p className="text-xs text-muted">
              Máximo {MAX_DECANTS} unidades por producto
            </p>
          )}

        </div>

        <Button
          size="md"
          onClick={handleAddToCart}
          disabled={
            disabled ||
            limiteAlcanzado ||
            stock === 0
          }
        >
          {stock === 0
            ? "Sin stock"
            : limiteAlcanzado
              ? "Límite alcanzado"
              : "Agregar al carrito"}
        </Button>

      </div>

    </div>

  )
}