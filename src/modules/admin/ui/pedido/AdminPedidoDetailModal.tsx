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

    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div
        className="
          bg-surface
          border border-border
          rounded-xl
          w-full max-w-xl
          p-6
          space-y-6
          shadow-xl
        "
      >

        {/* HEADER */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-lg font-semibold">
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

          <div className="border border-border rounded-lg overflow-hidden">

            {pedido.items.map((item, i) => {

              const decant = item.decantId
              const perfume = decant.perfumeId

              return (

                <div
                  key={i}
                  className="
                    flex justify-between
                    px-4 py-3
                    border-b border-border
                    last:border-0
                  "
                >

                  <div>

                    <p className="font-medium">
                      {perfume.marca} {perfume.nombre}
                    </p>

                    <p className="text-xs text-muted">
                      {decant.ml}ml × {item.cantidad}
                    </p>

                  </div>

                  <p className="font-medium">
                    ${(item.precioUnitario * item.cantidad).toLocaleString()}
                  </p>

                </div>

              )

            })}

          </div>

        </div>


        {/* TOTAL */}

        <div className="flex justify-between pt-4 border-t border-border">

          <span className="text-muted text-sm">
            Total
          </span>

          <span className="font-semibold text-lg">
            ${pedido.total.toLocaleString()}
          </span>

        </div>


        {/* ACTIONS */}

        <div className="flex items-center justify-between pt-2">

          {/* LEFT */}

          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cerrar
          </Button>


          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {estado === "PENDIENTE" && (

              <>
                <Button
                  onClick={() => onIniciar(pedido._id)}
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


/* ========================================
   BADGE
======================================== */

function EstadoBadge({
  estado
}: {
  estado: ESTADO_PEDIDO
}) {

  const estilos = {

    PENDIENTE:
      "bg-yellow-500/10 text-yellow-500",

    EN_PROCESO:
      "bg-blue-500/10 text-blue-500",

    PAGADO:
      "bg-green-500/10 text-green-500",

    CANCELADO:
      "bg-red-500/10 text-red-500"

  }

  return (

    <span
      className={`
        text-xs px-2 py-1 rounded-md
        ${estilos[estado]}
      `}
    >
      {estado}
    </span>

  )

}