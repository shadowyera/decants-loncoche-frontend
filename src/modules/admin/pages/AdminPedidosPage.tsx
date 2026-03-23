import { useState, useMemo } from "react"

import { Container } from "../../../shared/components/ui/Container"

import {
  useAdminPedidos
} from "../../../domains/pedido/queries/adminPedido.queries"

import {
  useIniciarPedido,
  useConfirmarPedido,
  useCancelarPedido
} from "../../../domains/pedido/queries/adminPedido.mutations"

import type {
  Pedido,
  ESTADO_PEDIDO
} from "../../../domains/pedido/domain/pedido.types"

import AdminPedidoDetailModal from "../ui/pedido/AdminPedidoDetailModal"
import PedidoRow from "../ui/pedido/PedidoRow"

export default function AdminPedidosPage() {

  const [page, setPage] = useState(1)

  const { data, isLoading } = useAdminPedidos(page)

  const pedidos = data?.data ?? []
  const pagination = data?.pagination

  const iniciarPedido = useIniciarPedido()
  const confirmarPedido = useConfirmarPedido()
  const cancelarPedido = useCancelarPedido()

  const [filtroEstado, setFiltroEstado] =
    useState<ESTADO_PEDIDO | "TODOS">("TODOS")

  const [selectedPedido, setSelectedPedido] =
    useState<Pedido | null>(null)

  const pedidosFiltrados = useMemo(() => {
    if (filtroEstado === "TODOS") return pedidos
    return pedidos.filter(p => p.estado === filtroEstado)
  }, [pedidos, filtroEstado])

  async function handleIniciar(id: string) {
    await iniciarPedido.mutateAsync(id)
    setSelectedPedido(null)
  }

  async function handleConfirmar(id: string) {
    await confirmarPedido.mutateAsync(id)
    setSelectedPedido(null)
  }

  async function handleCancelar(id: string) {
    await cancelarPedido.mutateAsync(id)
    setSelectedPedido(null)
  }

  return (
    <div className="py-6 sm:py-10">

      <Container>

        <div className="space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-text">
              Pedidos
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Gestiona los pedidos de la tienda
            </p>
          </div>

          {/* FILTROS */}
          <div className="flex gap-2 flex-wrap">
            <FiltroEstado label="Todos" activo={filtroEstado === "TODOS"} onClick={() => setFiltroEstado("TODOS")} />
            <FiltroEstado label="Pendientes" activo={filtroEstado === "PENDIENTE"} onClick={() => setFiltroEstado("PENDIENTE")} />
            <FiltroEstado label="En proceso" activo={filtroEstado === "EN_PROCESO"} onClick={() => setFiltroEstado("EN_PROCESO")} />
            <FiltroEstado label="Pagados" activo={filtroEstado === "PAGADO"} onClick={() => setFiltroEstado("PAGADO")} />
            <FiltroEstado label="Cancelados" activo={filtroEstado === "CANCELADO"} onClick={() => setFiltroEstado("CANCELADO")} />
          </div>

          {/* =========================
              MOBILE (CARDS)
          ========================= */}
          <div className="lg:hidden space-y-3">

            {isLoading && (
              <p className="text-center text-muted py-6">
                Cargando pedidos...
              </p>
            )}

            {!isLoading && pedidosFiltrados.length === 0 && (
              <p className="text-center text-muted py-6">
                No hay pedidos
              </p>
            )}

            {pedidosFiltrados.map((pedido) => (

              <div
                key={pedido._id}
                className="
                  bg-surface
                  border border-border
                  rounded-xl
                  p-4
                  space-y-3
                "
              >

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Pedido</span>
                  <span className="font-medium">
                    #{pedido._id.slice(-6)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Cliente</span>
                  <span>{pedido.clienteNombre}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Total</span>
                  <span className="font-medium">
                    ${pedido.total.toLocaleString("es-CL")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Estado</span>
                  <span className="text-xs px-2 py-1 rounded bg-surfaceSoft">
                    {pedido.estado}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">

                  <button
                    onClick={() => setSelectedPedido(pedido)}
                    className="
                      flex-1 text-xs px-3 py-2
                      border border-border rounded-md
                      hover:bg-surfaceSoft
                    "
                  >
                    Ver
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* =========================
              DESKTOP (TABLA)
          ========================= */}
          <div
            className="
              hidden lg:block
              bg-surface
              border border-border
              rounded-xl
              overflow-hidden
            "
          >

            <table className="w-full text-sm">

              <thead className="bg-surfaceSoft text-muted">
                <tr>
                  <th className="text-left px-4 py-3">Pedido</th>
                  <th className="text-left px-4 py-3">Cliente</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-right px-4 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>

                {isLoading && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-muted">
                      Cargando pedidos...
                    </td>
                  </tr>
                )}

                {!isLoading && pedidosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-muted">
                      No hay pedidos
                    </td>
                  </tr>
                )}

                {pedidosFiltrados.map((pedido) => (
                  <PedidoRow
                    key={pedido._id}
                    pedido={pedido}
                    onOpen={() => setSelectedPedido(pedido)}
                    onIniciar={handleIniciar}
                    onConfirmar={handleConfirmar}
                  />
                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINACION */}
          {pagination && (

            <div className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-3 text-sm text-muted
            ">

              <span className="text-center sm:text-left">
                Página {pagination.page} de {pagination.totalPages}
              </span>

              <div className="flex justify-center sm:justify-end gap-2">

                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="
                    px-3 py-1 rounded border border-border
                    disabled:opacity-40
                  "
                >
                  Anterior
                </button>

                <button
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="
                    px-3 py-1 rounded border border-border
                    disabled:opacity-40
                  "
                >
                  Siguiente
                </button>

              </div>

            </div>

          )}

        </div>

      </Container>

      {/* MODAL */}
      {selectedPedido && (
        <AdminPedidoDetailModal
          pedido={selectedPedido}
          onClose={() => setSelectedPedido(null)}
          onIniciar={handleIniciar}
          onConfirmar={handleConfirmar}
          onCancelar={handleCancelar}
        />
      )}

    </div>
  )
}


/* ========================================
   FILTRO COMPONENT
======================================== */

function FiltroEstado({
  label,
  activo,
  onClick
}: {
  label: string
  activo: boolean
  onClick: () => void
}) {

  return (
    <button
      onClick={onClick}
      className={`
        text-xs px-3 py-1.5 rounded-md border transition

        ${activo
          ? "bg-accent/10 text-accent border-accent/30"
          : "border-border text-muted hover:bg-surfaceSoft"}
      `}
    >
      {label}
    </button>
  )
}