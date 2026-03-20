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

    <tr
      className="
        border-t border-border
        hover:bg-surfaceSoft
        transition
      "
    >

      {/* PEDIDO */}

      <td className="px-4 py-3 font-medium">

        {pedido.numeroPedido}

      </td>


      {/* CLIENTE */}

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


      {/* TOTAL */}

      <td className="px-4 py-3 font-medium">

        ${pedido.total.toLocaleString()}

      </td>


      {/* ESTADO */}

      <td className="px-4 py-3">

        <EstadoBadge estado={estado} />

      </td>


      {/* ACCIONES */}

      <td className="px-4 py-3">

        <div className="flex justify-end items-center gap-2">

          {/* VER DETALLE */}

          <button
            onClick={onOpen}
            className="
              text-xs
              px-3 py-1.5
              rounded-md
              border border-border
              hover:bg-surfaceSoft
              transition
            "
          >
            Ver
          </button>


          {/* INICIAR */}

          {estado === "PENDIENTE" && (

            <button
              onClick={() => onIniciar(pedido._id)}
              className="
                text-xs
                px-3 py-1.5
                rounded-md
                bg-blue-500/10
                text-blue-500
                hover:bg-blue-500/20
                transition
              "
            >
              Iniciar
            </button>

          )}


          {/* CONFIRMAR */}

          {estado === "EN_PROCESO" && (

            <button
              onClick={() => onConfirmar(pedido._id)}
              className="
                text-xs
                px-3 py-1.5
                rounded-md
                bg-green-500/10
                text-green-500
                hover:bg-green-500/20
                transition
              "
            >
              Confirmar
            </button>

          )}

        </div>

      </td>

    </tr>

  )

}


/* ========================================
   BADGE ESTADO
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
        text-xs
        px-2 py-1
        rounded-md
        font-medium
        ${estilos[estado]}
      `}
    >
      {estado}
    </span>

  )

}