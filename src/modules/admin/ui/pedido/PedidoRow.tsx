import type {
  Pedido,
  ESTADO_PEDIDO
} from "../../../../domains/pedido/domain/pedido.types"

interface PedidoRowProps {
  pedido: Pedido
  onOpen: () => void
  onIniciar: (id: string) => void
  onConfirmar: (id: string) => void
}

export default function PedidoRow({
  pedido,
  onOpen,
  onIniciar,
  onConfirmar
}: PedidoRowProps) {

  const estado = pedido.estado as ESTADO_PEDIDO

  return (
    <>
      {/* =========================
          MOBILE (CARD)
      ========================= */}
      <div className="sm:hidden">

        <div className="
          bg-surface
          border border-border
          rounded-xl
          p-4
          space-y-3
        ">

          {/* HEADER */}
          <div className="flex justify-between items-start">

            <div>
              <p className="font-semibold">
                Pedido {pedido.numeroPedido}
              </p>

              <p className="text-xs text-muted">
                {pedido.clienteNombre ?? "Cliente"}
              </p>

              {pedido.clienteTelefono && (
                <p className="text-xs text-muted">
                  {pedido.clienteTelefono}
                </p>
              )}
            </div>

            <EstadoBadge estado={estado} />

          </div>

          {/* TOTAL */}
          <div className="flex justify-between text-sm">

            <span className="text-muted">
              Total
            </span>

            <span className="font-medium">
              ${pedido.total.toLocaleString()}
            </span>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-2 pt-2">

            <button
              onClick={onOpen}
              className="
                w-full
                text-sm
                py-2
                rounded-md
                border border-border
                hover:bg-surfaceSoft
              "
            >
              Ver detalle
            </button>

            {estado === "PENDIENTE" && (
              <button
                onClick={() => onIniciar(pedido._id)}
                className="
                  w-full
                  text-sm
                  py-2
                  rounded-md
                  bg-blue-500/10
                  text-blue-500
                "
              >
                Iniciar pedido
              </button>
            )}

            {estado === "EN_PROCESO" && (
              <button
                onClick={() => onConfirmar(pedido._id)}
                className="
                  w-full
                  text-sm
                  py-2
                  rounded-md
                  bg-green-500/10
                  text-green-500
                "
              >
                Confirmar pago
              </button>
            )}

          </div>

        </div>

      </div>


      {/* =========================
          DESKTOP (TABLE ROW)
      ========================= */}
      <tr
        className="
          hidden sm:table-row
          border-t border-border
          hover:bg-surfaceSoft
          transition
        "
      >

        <td className="px-4 py-3 font-medium">
          {pedido.numeroPedido}
        </td>

        <td className="px-4 py-3">
          <div className="flex flex-col">
            <span>
              {pedido.clienteNombre ?? "Cliente"}
            </span>
            {pedido.clienteTelefono && (
              <span className="text-xs text-muted">
                {pedido.clienteTelefono}
              </span>
            )}
          </div>
        </td>

        <td className="px-4 py-3 font-medium">
          ${pedido.total.toLocaleString()}
        </td>

        <td className="px-4 py-3">
          <EstadoBadge estado={estado} />
        </td>

        <td className="px-4 py-3">
          <div className="flex justify-end items-center gap-2">

            <button
              onClick={onOpen}
              className="
                text-xs
                px-3 py-1.5
                rounded-md
                border border-border
                hover:bg-surfaceSoft
              "
            >
              Ver
            </button>

            {estado === "PENDIENTE" && (
              <button
                onClick={() => onIniciar(pedido._id)}
                className="
                  text-xs
                  px-3 py-1.5
                  rounded-md
                  bg-blue-500/10
                  text-blue-500
                "
              >
                Iniciar
              </button>
            )}

            {estado === "EN_PROCESO" && (
              <button
                onClick={() => onConfirmar(pedido._id)}
                className="
                  text-xs
                  px-3 py-1.5
                  rounded-md
                  bg-green-500/10
                  text-green-500
                "
              >
                Confirmar
              </button>
            )}

          </div>
        </td>

      </tr>
    </>
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
        text-xs
        px-2 py-1
        rounded-md
        font-medium
        whitespace-nowrap
        ${estilos[estado]}
      `}
    >
      {estado}
    </span>
  )

}