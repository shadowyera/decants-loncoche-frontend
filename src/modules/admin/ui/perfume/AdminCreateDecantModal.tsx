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
    const precioBase = selectedMl * costoPorMl * multiplicador
    return Math.round(precioBase / 10) * 10
  }, [selectedMl, costoPorMl])

  const maxStock = useMemo(() => {
    if (!selectedMl) return 0
    return Math.floor(mlDisponibles / selectedMl)
  }, [selectedMl, mlDisponibles])

  const isCreated = (ml: number) =>
    existingMl.includes(ml)

  /* ===============================
     AUTO STOCK
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

    const precioCalc = ml * costoPorMl * multiplicador
    const precioFinal = Math.round(precioCalc / 10) * 10

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

    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="
        relative
        w-full
        sm:max-w-lg

        bg-surface
        border border-border

        rounded-t-2xl sm:rounded-xl

        p-4 sm:p-6

        max-h-[90vh]
        overflow-y-auto

        pb-[env(safe-area-inset-bottom)]
      ">

        {/* HANDLE (mobile) */}
        <div className="w-10 h-1.5 bg-border rounded-full mx-auto mb-4 sm:hidden" />

        <h3 className="text-lg sm:text-xl font-semibold text-text mb-4 sm:mb-6">
          Crear decant
        </h3>

        <div className="space-y-5 sm:space-y-6">

          {/* TAMAÑO */}
          <div>
            <label className="text-sm text-muted block mb-2">
              Tamaño
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

              {DECANT_SIZES.map((ml) => {

                const created = isCreated(ml)

                return (
                  <button
                    key={ml}
                    disabled={created}
                    onClick={() => selectSize(ml)}
                    className={`
                      py-3 sm:py-2
                      rounded border text-sm

                      transition

                      ${created
                        ? "border-border text-muted bg-background opacity-40 cursor-not-allowed"
                        : selectedMl === ml
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-text hover:border-accent"}
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
                px-4 py-3
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
                px-4 py-3
                bg-background
                border border-border
                rounded
                text-text
              "
            />

            {selectedMl && (
              <p className="text-xs text-muted mt-1">
                Máximo con {mlDisponibles}ml: {maxStock}
              </p>
            )}
          </div>


          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

        </div>


        {/* ACTIONS */}
        <div className="
          sticky bottom-0
          bg-surface
          pt-4 mt-6

          flex flex-col sm:flex-row
          gap-2 sm:gap-3
        ">

          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="w-full"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full"
          >
            {loading && (
              <Loader2 className="animate-spin" size={16} />
            )}
            Crear decant
          </Button>

        </div>

      </div>

    </div>

  )
}