import { useRef } from "react"

import DecantRow from "../../../../shared/components/ui/DecantRow"
import { useDecantInventory } from "../../../../domains/decant/hooks/useDecantInventory"

import type { Perfume } from "../../../../domains/perfume/domain/perfume.types"
import type { Decant } from "../../../../domains/decant/domain/decant.types"

interface Props {

  perfume: Perfume
  decants: Decant[]

  stockEdit: Record<string, number>
  precioEdit: Record<string, number>

  setStockEdit: React.Dispatch<React.SetStateAction<Record<string, number>>>
  setPrecioEdit: React.Dispatch<React.SetStateAction<Record<string, number>>>

  mlDisponiblesReal: number

  onStockUpdate: (id: string, stock: number) => void
  onPrecioUpdate: (id: string, precio: number) => void
  onToggle: (id: string) => void
}

export default function AdminDecantGroup({
  perfume,
  decants,

  stockEdit,
  precioEdit,

  setStockEdit,
  setPrecioEdit,

  onStockUpdate,
  onPrecioUpdate,
  onToggle
}: Props) {

  const debounceTimers =
    useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const mlBotella = perfume.mlBotella ?? 100

  const {
    getStock,
    calcularMaxStock
  } = useDecantInventory(
    decants,
    stockEdit,
    mlBotella
  )

  /* ===============================
     DEBOUNCE SAVE
  =============================== */

  function scheduleSave(
    id: string,
    value: number,
    type: "stock" | "precio"
  ) {

    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id])
    }

    debounceTimers.current[id] = setTimeout(() => {

      if (type === "stock") {
        onStockUpdate(id, value)
      } else {
        onPrecioUpdate(id, value)
      }

    }, 600)

  }

  /* ===============================
     UI
  =============================== */

  return (

    <div className="space-y-4">

      {/* HEADER COLUMNAS */}

      <div className="grid grid-cols-[80px_120px_120px_120px_110px] text-xs text-muted px-3">

        <span>ML</span>

        <span>Precio</span>

        <span>Stock</span>

        <span>Máx posible</span>

        <span className="text-right">
          Estado
        </span>

      </div>

      {/* FILAS DECANTS */}

      <div className="space-y-2">

        {decants.map((d) => {

          const stock = getStock(d)

          const precio =
            precioEdit[d._id] !== undefined
              ? precioEdit[d._id]
              : d.precio

          const maxStock =
            calcularMaxStock(d)

          return (

            <DecantRow
              key={d._id}
              decant={d}

              stock={stock}
              precio={precio}

              maxStock={maxStock}

              onStockChange={(value) => {

                if (value > maxStock) {
                  value = maxStock
                }

                setStockEdit((prev) => ({
                  ...prev,
                  [d._id]: value
                }))

                scheduleSave(d._id, value, "stock")

              }}

              onPrecioChange={(value) => {

                setPrecioEdit((prev) => ({
                  ...prev,
                  [d._id]: value
                }))

                scheduleSave(d._id, value, "precio")

              }}

              onToggle={() => onToggle(d._id)}

            />

          )

        })}

      </div>

    </div>

  )

}