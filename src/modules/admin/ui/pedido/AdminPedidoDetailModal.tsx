import { Button } from "../../../../shared/components/ui/Button"

import type {
  Pedido,
  ESTADO_PEDIDO
} from "../../../../domains/pedido/domain/pedido.types"

interface Props {
  pedido: Pedido
  onClose: () => void
  onIniciar: (id: string) => void
  onConfirmar: (id: string) => void
  onCancelar: (id: string) => void
}

export default function AdminPedidoDetailModal({
  pedido,
  onClose,
  onIniciar,
  onConfirmar,
  onCancelar
}: Props) {

  const estado = pedido.estado as ESTADO_PEDIDO

  return (

    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="
        relative
        w-full
        sm:max-w-xl

        bg-surface
        border border-border

        rounded-t-2xl sm:rounded-xl

        p-4 sm:p-6

        max-h-[90vh]
        overflow-y-auto

        pb-[env(safe-area-inset-bottom)]

        space-y-6
      ">

        {/* HANDLE */}
        <div className="w-10 h-1.5 bg-border rounded-full mx-auto sm:hidden" />

        {/* HEADER */}
        <div className="flex justify-between items-start gap-3">

          <div className="space-y-1">

            <h2 className="text-base sm:text-lg font-semibold">
              Pedido {pedido.numeroPedido}
            </h2>

            <p className="text-xs text-muted">
              {new Date(pedido.createdAt).toLocaleString()}
            </p>

          </div>

          <EstadoBadge estado={estado} />

        </div>


        {/* CLIENTE */}
        <div className="space-y-2">

          <p className="text-sm font-semibold text-muted">
            Cliente
          </p>

          <div className="space-y-1 text-sm">

            <p>{pedido.clienteNombre ?? "Cliente"}</p>

            {pedido.clienteTelefono && (
              <p className="text-muted">
                {pedido.clienteTelefono}
              </p>
            )}

            {pedido.direccion && (
              <p className="text-muted">
                {pedido.direccion}
              </p>
            )}

          </div>

        </div>


        {/* PRODUCTOS */}
        <div className="space-y-3">

          <p className="text-sm font-semibold text-muted">
            Productos
          </p>

          <div className="space-y-2">

            {pedido.items.map((item, i) => {

              const decant = item.decantId
              const perfume = decant.perfumeId

              return (

                <div
                  key={i}
                  className="
                    bg-background
                    border border-border
                    rounded-lg
                    p-3
                    space-y-2
                  "
                >

                  <div className="flex justify-between gap-2">

                    <div>

                      <p className="font-medium text-sm">
                        {perfume.marca} {perfume.nombre}
                      </p>

                      <p className="text-xs text-muted">
                        {decant.ml}ml × {item.cantidad}
                      </p>

                    </div>

                    <p className="font-medium text-sm whitespace-nowrap">
                      ${(item.precioUnitario * item.cantidad).toLocaleString()}
                    </p>

                  </div>

                </div>

              )

            })}

          </div>

        </div>


        {/* TOTAL */}
        <div className="
          flex justify-between items-center
          pt-4 border-t border-border
        ">

          <span className="text-muted text-sm">
            Total
          </span>

          <span className="font-semibold text-lg">
            ${pedido.total.toLocaleString()}
          </span>

        </div>


        {/* ACTIONS */}
        <div className="
          sticky bottom-0
          bg-surface
          pt-4

          flex flex-col sm:flex-row
          gap-2 sm:justify-between
        ">

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>

          <div className="
            flex flex-col sm:flex-row
            gap-2 sm:gap-3
            w-full sm:w-auto
          ">

            {estado === "PENDIENTE" && (
              <>
                <Button
                  onClick={() => onIniciar(pedido._id)}
                  className="w-full sm:w-auto"
                >
                  Iniciar pedido
                </Button>

                <button
                  onClick={() => onCancelar(pedido._id)}
                  className="
                    text-sm
                    text-red-500
                    hover:text-red-400
                    transition
                    w-full sm:w-auto
                    text-center
                  "
                >
                  Cancelar
                </button>
              </>
            )}

            {estado === "EN_PROCESO" && (
              <>
                <Button
                  onClick={() => onConfirmar(pedido._id)}
                  className="w-full sm:w-auto"
                >
                  Confirmar pago
                </Button>

                <button
                  onClick={() => onCancelar(pedido._id)}
                  className="
                    text-sm
                    text-red-500
                    hover:text-red-400
                    transition
                    w-full sm:w-auto
                    text-center
                  "
                >
                  Cancelar
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </div>

  )

}


/* BADGE */

function EstadoBadge({
  estado
}: {
  estado: ESTADO_PEDIDO
}) {

  const estilos = {
    PENDIENTE: "bg-yellow-500/10 text-yellow-500",
    EN_PROCESO: "bg-blue-500/10 text-blue-500",
    PAGADO: "bg-green-500/10 text-green-500",
    CANCELADO: "bg-red-500/10 text-red-500"
  }

  return (
    <span
      className={`
        text-xs px-2 py-1 rounded-md
        whitespace-nowrap
        ${estilos[estado]}
      `}
    >
      {estado}
    </span>
  )

}