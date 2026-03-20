import { Check, X } from "lucide-react"
import { AdminCard } from "./AdminCard"

import type { Decant } from "../../../domains/decant/domain/decant.types"

interface Props {

  decant: Decant

  stock: number
  precio: number
  maxStock: number

  onStockChange: (value: number) => void
  onPrecioChange: (value: number) => void

  onToggle: () => void

}

export default function DecantRow({
  decant,
  stock,
  precio,
  maxStock,
  onStockChange,
  onPrecioChange,
  onToggle
}: Props) {

  return (

    <AdminCard
      className="
        grid
        grid-cols-[80px_120px_120px_120px_110px]
        items-center
        gap-3
        px-3
        py-2
      "
    >

      {/* ML */}

      <span className="text-text font-medium">
        {decant.ml} ml
      </span>


      {/* PRECIO */}

      <input
        type="number"
        value={precio}
        min={0}
        onChange={(e) =>
          onPrecioChange(Number(e.target.value))
        }
        className="
          w-[110px]
          px-2
          py-1
          bg-background
          border
          border-border
          rounded
          text-text
        "
      />


      {/* STOCK */}

      <input
        type="number"
        value={stock}
        min={0}
        max={maxStock}
        onChange={(e) =>
          onStockChange(Number(e.target.value))
        }
        className="
          w-[100px]
          px-2
          py-1
          bg-background
          border
          border-border
          rounded
          text-text
        "
      />


      {/* MAX POSIBLE */}

      <span className="text-xs text-muted">
        {maxStock}
      </span>


      {/* ESTADO */}

      <button
        onClick={onToggle}
        className={`
          w-[100px]
          px-2
          py-1
          rounded-md
          border
          text-sm
          flex
          items-center
          justify-center
          gap-2
          transition
          ${decant.activo
            ? "border-accent text-accent"
            : "border-border text-muted"}
        `}
      >

        {decant.activo ? (
          <>
            <Check size={14} />
            Activo
          </>
        ) : (
          <>
            <X size={14} />
            Inactivo
          </>
        )}

      </button>

    </AdminCard>

  )

}