import { useParams, Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

import { Container } from "../../../shared/components/ui/Container"

import { usePedidoQuery } from "../../../domains/pedido/queries/usePedidoQuery"

export function PedidoConfirmadoPage() {

  const { id } = useParams()

  const { data: pedido, isLoading } = usePedidoQuery(id ?? "")

  if (isLoading) {
    return (
      <Container className="py-24 text-center">
        <p className="text-muted">Cargando pedido...</p>
      </Container>
    )
  }

  if (!pedido) {
    return (
      <Container className="py-24 text-center">
        <p className="text-muted">Pedido no encontrado</p>
      </Container>
    )
  }

  const itemsTexto = pedido.items
    .map((item) => {
      const nombre = item.decantId.perfumeId.nombre
      const ml = item.decantId.ml
      return `• ${nombre} ${ml}ml x${item.cantidad}`
    })
    .join("\n")

  const mensaje = [
    "Hola! Quiero confirmar mi pedido",
    "",
    `Pedido ${pedido.numeroPedido}`,
    "",
    `Cliente: ${pedido.clienteNombre ?? "-"}`,
    `Teléfono: ${pedido.clienteTelefono ?? "-"}`,
    pedido.direccion ? `Dirección: ${pedido.direccion}` : "",
    "",
    "Productos:",
    itemsTexto,
    "",
    `Total: $${pedido.total.toLocaleString()}`
  ]
    .filter(Boolean)
    .join("\n")

  const whatsappUrl =
    `https://wa.me/56930913587?text=${encodeURIComponent(mensaje)}`

  function handleWhatsappClick() {
    window.open(whatsappUrl, "_blank")
  }

  return (

    <div className="py-28">

      <Container className="max-w-xl text-center space-y-10">

        {/* ICONO + TITULO */}

        <div className="flex flex-col items-center gap-4">

          <CheckCircle size={48} className="text-accent" />

          <h1 className="font-serif text-4xl text-text">
            Pedido creado
          </h1>

          <p className="text-muted text-lg">
            Solo falta un paso para confirmarlo 👇
          </p>

        </div>


        {/* NUMERO PEDIDO */}

        <div
          className="
            text-accent
            text-xl
            border
            border-border
            rounded-lg
            px-6
            py-4
            bg-white/5
          "
        >
          Pedido {pedido.numeroPedido}
        </div>


        {/* CLIENTE */}

        {(pedido.clienteNombre || pedido.clienteTelefono || pedido.direccion) && (

          <div className="text-left bg-white/5 border border-border rounded-lg p-6 space-y-2">

            {pedido.clienteNombre && (
              <p className="text-text">
                <span className="text-muted">Nombre:</span> {pedido.clienteNombre}
              </p>
            )}

            {pedido.clienteTelefono && (
              <p className="text-text">
                <span className="text-muted">Teléfono:</span> {pedido.clienteTelefono}
              </p>
            )}

            {pedido.direccion && (
              <p className="text-text">
                <span className="text-muted">Dirección:</span> {pedido.direccion}
              </p>
            )}

          </div>

        )}


        {/* RESUMEN */}

        <div className="text-left bg-white/5 border border-border rounded-lg p-6 space-y-3">

          {pedido.items.map((item, i) => {

            const nombre = item.decantId.perfumeId.nombre
            const ml = item.decantId.ml

            return (

              <div key={i} className="flex justify-between text-text">

                <span>
                  {nombre} {ml}ml x{item.cantidad}
                </span>

                <span>
                  ${(item.precioUnitario * item.cantidad).toLocaleString()}
                </span>

              </div>

            )

          })}

          <div className="border-t border-border pt-3 flex justify-between text-lg text-accent">

            <span>Total</span>

            <span>
              ${pedido.total.toLocaleString()}
            </span>

          </div>

        </div>


        {/* BOTONES */}

        <div className="flex flex-col gap-4">

          <button
            onClick={handleWhatsappClick}
            className="
              px-6
              py-4
              rounded-lg
              font-medium
              bg-accent
              text-black
              hover:brightness-110
              transition
              text-lg
            "
          >
            Confirmar por WhatsApp
          </button>

          <p className="text-xs text-muted">
            Se abrirá WhatsApp con tu pedido listo para enviar
          </p>

          <Link
            to="/"
            className="
              px-6
              py-3
              rounded-lg
              border
              border-accent
              text-accent
              hover:bg-accent
              hover:text-black
              transition
            "
          >
            Volver al catálogo
          </Link>

        </div>

      </Container>

    </div>

  )

}