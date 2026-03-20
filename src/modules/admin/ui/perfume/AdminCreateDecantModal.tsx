import { useState, useMemo, useEffect } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "../../../../shared/components/ui/Button"

const DECANT_SIZES = [3, 5, 10, 15]

interface Props {

  perfumeId: string

  precioBotella: number
  mlBotella: number
  mlDisponibles: number

  existingMl?: number[]

  onClose: () => void

  onCreate: (data: {
    perfumeId: string
    ml: number
    precio: number
    stockDisponible: number
  }) => Promise<void> | void

}

export function AdminCreateDecantModal({
  perfumeId,
  precioBotella,
  mlBotella,
  mlDisponibles,
  existingMl = [],
  onClose,
  onCreate
}: Props) {

  const [selectedMl, setSelectedMl] = useState<number | null>(null)

  const [precio, setPrecio] = useState("")
  const [stock, setStock] = useState("0")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  /* ===============================
     CÁLCULOS
  =============================== */

  const costoPorMl = precioBotella / mlBotella
  const multiplicador = 1.8


  const precioSugerido = useMemo(() => {

    if (!selectedMl) return null

    const precioBase =
      selectedMl * costoPorMl * multiplicador

    return Math.round(precioBase / 10) * 10

  }, [selectedMl, costoPorMl])


  const maxStock = useMemo(() => {

    if (!selectedMl) return 0

    return Math.floor(mlDisponibles / selectedMl)

  }, [selectedMl, mlDisponibles])


  const isCreated = (ml: number) =>
    existingMl.includes(ml)


  /* ===============================
     AJUSTAR STOCK AUTOMÁTICO
  =============================== */

  useEffect(() => {

    if (!selectedMl) return

    const max = Math.floor(mlDisponibles / selectedMl)

    setStock(String(max))

  }, [selectedMl, mlDisponibles])


  /* ===============================
     HANDLERS
  =============================== */

  function selectSize(ml: number) {

    if (isCreated(ml)) return

    setSelectedMl(ml)

    const precioCalc =
      ml * costoPorMl * multiplicador

    const precioFinal =
      Math.round(precioCalc / 10) * 10

    setPrecio(String(precioFinal))

  }


  async function handleCreate() {

    setError(null)

    if (!selectedMl) {
      setError("Selecciona un tamaño")
      return
    }

    if (!precio || Number(precio) <= 0) {
      setError("Debes indicar un precio válido")
      return
    }

    if (Number(stock) > maxStock) {
      setError("Stock mayor al posible según ml disponibles")
      return
    }

    try {

      setLoading(true)

      await onCreate({

        perfumeId,
        ml: selectedMl,
        precio: Number(precio),
        stockDisponible: Number(stock)

      })

      onClose()

    } catch {

      setError("No se pudo crear el decant")

    } finally {

      setLoading(false)

    }

  }


  /* ===============================
     UI
  =============================== */

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div className="relative bg-surface border border-border rounded-xl p-8 w-full max-w-md">

        <h3 className="text-xl font-semibold text-text mb-6">
          Crear decant
        </h3>

        <div className="space-y-6">


          {/* TAMAÑO */}

          <div>

            <label className="text-sm text-muted block mb-2">
              Tamaño
            </label>

            <div className="grid grid-cols-4 gap-2">

              {DECANT_SIZES.map((ml) => {

                const created = isCreated(ml)

                return (

                  <button
                    key={ml}
                    disabled={created}
                    onClick={() => selectSize(ml)}
                    className={`

                      py-2 rounded border text-sm

                      ${created
                        ? "border-border text-muted bg-background opacity-40 cursor-not-allowed"
                        : selectedMl === ml
                          ? "border-accent text-accent"
                          : "border-border text-text"}

                    `}
                  >
                    {ml} ml
                  </button>

                )

              })}

            </div>

          </div>


          {/* PRECIO */}

          <div>

            <label className="text-sm text-muted block mb-1">
              Precio CLP
            </label>

            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="
                w-full
                px-4 py-2
                bg-background
                border border-border
                rounded
                text-text
              "
            />

            {precioSugerido && (

              <p className="text-xs text-muted mt-1">
                Precio sugerido: ${precioSugerido}
              </p>

            )}

          </div>


          {/* STOCK */}

          <div>

            <label className="text-sm text-muted block mb-1">
              Stock inicial
            </label>

            <input
              type="number"
              value={stock}
              max={maxStock}
              min={0}
              onChange={(e) => setStock(e.target.value)}
              className="
                w-full
                px-4 py-2
                bg-background
                border border-border
                rounded
                text-text
              "
            />

            {selectedMl && (

              <p className="text-xs text-muted mt-1">
                Máximo posible con {mlDisponibles}ml disponibles: {maxStock}
              </p>

            )}

          </div>


          {/* ERROR */}

          {error && (

            <p className="text-sm text-red-400">
              {error}
            </p>

          )}


          {/* ACTIONS */}

          <div className="flex justify-end gap-3 pt-2">

            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center gap-2"
            >

              {loading && (
                <Loader2 className="animate-spin" size={16} />
              )}

              Crear decant

            </Button>

          </div>

        </div>

      </div>

    </div>

  )

}