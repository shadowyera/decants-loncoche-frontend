import { useState, useMemo } from "react"
import { Edit3, AlertTriangle } from "lucide-react"

import { Button } from "../../../../shared/components/ui/Button"
import Switch from "../../../../shared/components/ui/Switch"
import ConsumptionBar from "../../../../shared/components/ui/ConsumptionBar"

import AdminDecantGroup from "./AdminDecantGroup"

import { calcularPrecioMl } 
from "../../../../shared/utils/calculateDecantPrice"

import { recalcularPreciosDecants }
from "../../../../shared/utils/recalculateDecantPrices"

import type { Perfume } from "../../../../domains/perfume/domain/perfume.types"
import type { PerfumeDetalleAdmin } from "../../../../domains/perfume/domain/perfume.types"

interface Props {
  detalle: PerfumeDetalleAdmin | null

  onEdit: (perfume: Perfume) => void
  onToggle: (id: string) => void

  onStockUpdate: (id: string, stock: number) => void
  onPrecioUpdate: (id: string, precio: number) => void
  onToggleDecant: (id: string) => void

  onCreateDecant: () => void
}

export default function AdminPerfumeDetail({
  detalle,
  onEdit,
  onToggle,
  onStockUpdate,
  onPrecioUpdate,
  onToggleDecant,
  onCreateDecant
}: Props) {

  const [stockEdit, setStockEdit] =
    useState<Record<string, number>>({})

  const [precioEdit, setPrecioEdit] =
    useState<Record<string, number>>({})

  const perfume = detalle?.perfume
  const decants = detalle?.decants ?? []

  const mlBotella = perfume?.mlBotella ?? 0
  const precioBotella = perfume?.precioBotella ?? 0
  const multiplicador = perfume?.multiplicadorDecant ?? 1

  /* ===============================
     CALCULOS NEGOCIO
  =============================== */

  const costoMl =
    mlBotella > 0
      ? precioBotella / mlBotella
      : 0

  const precioMl =
    calcularPrecioMl(
      precioBotella,
      mlBotella,
      multiplicador
    )

  const margen =
    costoMl > 0
      ? ((precioMl - costoMl) / costoMl) * 100
      : 0


  /* ===============================
     ML RESERVADOS
  =============================== */

  const mlReservados = useMemo(() => {

    return decants.reduce((total, d) => {

      if (!d.activo) return total

      const stock =
        stockEdit[d._id] !== undefined
          ? stockEdit[d._id]
          : d.stockDisponible

      return total + d.ml * stock

    }, 0)

  }, [decants, stockEdit])

  const mlDisponiblesReal =
    Math.max(mlBotella - mlReservados, 0)

  const mlUsados =
    mlBotella - mlDisponiblesReal


  /* ===============================
     VALORES ECONOMICOS
  =============================== */

  const valorRestante = useMemo(() => {

    return decants.reduce((total, d) => {

      if (!d.activo) return total

      const posibles =
        Math.floor(mlDisponiblesReal / d.ml)

      return total + posibles * d.precio

    }, 0)

  }, [decants, mlDisponiblesReal])


  const valorMaximoBotella = useMemo(() => {

    return decants.reduce((total, d) => {

      if (!d.activo) return total

      const posibles =
        Math.floor(mlBotella / d.ml)

      return total + posibles * d.precio

    }, 0)

  }, [decants, mlBotella])


  /* ===============================
     WARNING
  =============================== */

  const lowMlWarning =
    mlDisponiblesReal > 0 && mlDisponiblesReal <= 10


  /* ===============================
     RECALCULAR PRECIOS
  =============================== */

  function handleRecalcularPrecios() {

    if (!perfume) return

    const nuevosPrecios =
      recalcularPreciosDecants(
        perfume,
        decants
      )

    Object.entries(nuevosPrecios)
      .forEach(([id, precio]) => {

        setPrecioEdit((prev) => ({
          ...prev,
          [id]: precio
        }))

        onPrecioUpdate(id, precio)

      })

  }


  if (!detalle || !perfume) {

    return (
      <div className="p-10 text-center text-muted border border-border rounded-lg bg-surface">
        Selecciona un perfume para ver detalles
      </div>
    )

  }

  return (

    <div className="p-6 space-y-6 border border-border rounded-xl bg-surface">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="space-y-1">

          <div className="flex items-center gap-3">

            <h2 className="text-xl font-semibold text-text whitespace-nowrap">
              {perfume.nombre}
            </h2>

            {lowMlWarning && (

              <div className="flex items-center gap-1 text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20 whitespace-nowrap">

                <AlertTriangle size={14} />

                {mlDisponiblesReal}ml restantes

              </div>

            )}

          </div>

          <p className="text-muted text-sm">
            {perfume.marca}
          </p>

        </div>

        <div className="flex items-center gap-4">

          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(perfume)}
            className="flex items-center gap-2"
          >
            <Edit3 size={14} />
            Editar
          </Button>

          <div className="flex items-center gap-2 w-[110px] justify-between">

            <Switch
              checked={perfume.activo}
              onChange={() => onToggle(perfume._id)}
            />

            <span className="text-sm text-muted w-[60px] text-right">
              {perfume.activo ? "Activo" : "Inactivo"}
            </span>

          </div>

        </div>

      </div>


      {/* METRICAS */}

      <div className="grid grid-cols-4 gap-4">

        <Metric
          label="Botella"
          value={`${mlBotella} ml`}
        />

        <Metric
          label="Disponible"
          value={`${mlDisponiblesReal} ml`}
        />

        <Metric
          label="Valor restante"
          value={`$${valorRestante.toLocaleString()}`}
          accent
        />

        <Metric
          label="Valor máximo"
          value={`$${valorMaximoBotella.toLocaleString()}`}
          success
        />

      </div>


      {/* METRICAS NEGOCIO */}

      <div className="grid grid-cols-3 gap-4">

        <Metric
          label="Costo por ml"
          value={`$${Math.round(costoMl).toLocaleString()}`}
        />

        <Metric
          label="Precio por ml"
          value={`$${precioMl.toLocaleString()}`}
          accent
        />

        <Metric
          label="Margen"
          value={`${Math.round(margen)}%`}
          success
        />

      </div>


      {/* BARRA CONSUMO */}

      <div>

        <ConsumptionBar
          mlTotales={mlBotella}
          mlDisponibles={mlDisponiblesReal}
        />

        <div className="text-xs text-muted text-right mt-1">
          {mlUsados} / {mlBotella} ml usados
        </div>

      </div>


      {/* DECANTS */}

      <div>

        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-3">

            <h3 className="font-semibold text-text">
              Decants
            </h3>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleRecalcularPrecios}
            >
              Recalcular precios
            </Button>

          </div>

          <Button
            size="sm"
            onClick={onCreateDecant}
          >
            + Crear decant
          </Button>

        </div>

        <AdminDecantGroup
          perfume={perfume}
          decants={decants}

          stockEdit={stockEdit}
          precioEdit={precioEdit}

          setStockEdit={setStockEdit}
          setPrecioEdit={setPrecioEdit}

          mlDisponiblesReal={mlDisponiblesReal}

          onStockUpdate={onStockUpdate}
          onPrecioUpdate={onPrecioUpdate}
          onToggle={onToggleDecant}
        />

      </div>

    </div>

  )

}


/* METRIC CARD */

function Metric({
  label,
  value,
  accent,
  success
}: {
  label: string
  value: string
  accent?: boolean
  success?: boolean
}) {

  return (

    <div className="p-4 rounded-lg border border-border bg-background">

      <p className="text-xs text-muted mb-1">
        {label}
      </p>

      <p
        className={`text-lg font-semibold ${
          accent
            ? "text-accent"
            : success
            ? "text-green-400"
            : "text-text"
        }`}
      >
        {value}
      </p>

    </div>

  )

}