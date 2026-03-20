import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Truck, MapPin } from "lucide-react"

import { Container } from "../../../shared/components/ui/Container"
import { Button } from "../../../shared/components/ui/Button"

import { useCart } from "../../../domains/carrito/hooks/useCart"
import { crearPedidoApi } from "../../../domains/pedido/api/pedido.api"

export function CheckoutPage() {

  const navigate = useNavigate()

  const { items, total, clearCart } = useCart()
  const totalPrice = total()

  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState<{
    nombre?: string
    telefono?: string
  }>({})

  const [serverError, setServerError] = useState<string | null>(null)

  function validate() {

    const newErrors: typeof errors = {}

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio"
    } else {
      const clean = telefono.replace(/\s/g, "")
      if (!/^(\+56)?9\d{8}$/.test(clean)) {
        newErrors.telefono = "Teléfono inválido"
      }
    }

    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()
    setServerError(null)

    if (!items.length) {
      setServerError("Tu carrito está vacío")
      return
    }

    const validation = validate()

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setErrors({})

    try {

      setLoading(true)

      const pedido = await crearPedidoApi({
        clienteNombre: nombre,
        clienteTelefono: telefono,
        direccion,
        items: items.map(i => ({
          decantId: i.decantId,
          cantidad: i.cantidad
        }))
      })

      clearCart()
      navigate(`/pedido/${pedido._id}`)

    } catch (err) {

      if (err instanceof Error) {
        setServerError(err.message)
      } else {
        setServerError("No se pudo crear el pedido")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="py-16 md:py-24">

      <Container className="max-w-6xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* FORMULARIO */}

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">

            <div className="space-y-2 text-center md:text-left">

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text">
                Checkout
              </h1>

              <p className="text-muted text-xs sm:text-sm">
                Completa tus datos para crear el pedido.
              </p>

            </div>

            {serverError && (
              <p className="text-red-400 text-xs sm:text-sm">
                {serverError}
              </p>
            )}

            {/* NOMBRE */}

            <div className="space-y-1.5 md:space-y-2">

              <label className="block text-xs sm:text-sm text-muted">
                Nombre
              </label>

              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="
                  w-full
                  bg-surface
                  border border-border
                  rounded-lg
                  px-3 py-2.5
                  sm:px-4 sm:py-3
                  text-sm
                  text-text
                  placeholder:text-subtle
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                  transition
                "
              />

              {errors.nombre && (
                <p className="text-red-400 text-[11px] sm:text-xs">
                  {errors.nombre}
                </p>
              )}

            </div>

            {/* TELEFONO */}

            <div className="space-y-1.5 md:space-y-2">

              <label className="block text-xs sm:text-sm text-muted">
                Teléfono
              </label>

              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+56 9..."
                className="
                  w-full
                  bg-surface
                  border border-border
                  rounded-lg
                  px-3 py-2.5
                  sm:px-4 sm:py-3
                  text-sm
                  text-text
                  placeholder:text-subtle
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                  transition
                "
              />

              {errors.telefono && (
                <p className="text-red-400 text-[11px] sm:text-xs">
                  {errors.telefono}
                </p>
              )}

            </div>

            {/* DIRECCION */}

            <div className="space-y-1.5 md:space-y-2">

              <label className="block text-xs sm:text-sm text-muted">
                Dirección (opcional)
              </label>

              <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección de entrega"
                className="
                  w-full
                  bg-surface
                  border border-border
                  rounded-lg
                  px-3 py-2.5
                  sm:px-4 sm:py-3
                  text-sm
                  text-text
                  placeholder:text-subtle
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent
                  transition
                "
              />

            </div>

            {/* BOTON */}

            <Button
              size="lg"
              className="w-full"
              disabled={loading || items.length === 0}
            >
              {loading ? "Creando pedido..." : "Confirmar pedido"}
            </Button>

            {/* BENEFICIOS */}

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 text-[10px] sm:text-xs text-muted border-t border-border">

              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck size={16} className="text-accent" />
                <span>Compra segura</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck size={16} className="text-accent" />
                <span>Envíos Chile</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center">
                <MapPin size={16} className="text-accent" />
                <span>Loncoche</span>
              </div>

            </div>

          </form>


          {/* RESUMEN */}

          <div className="space-y-4 md:space-y-6 md:sticky md:top-24">

            <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-text text-center md:text-left">
              Tu pedido
            </h2>

            <div className="bg-white/5 border border-border rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">

              {items.map((item) => (

                <div
                  key={item.decantId}
                  className="flex items-center justify-between gap-3 sm:gap-4"
                >

                  <div className="flex items-center gap-3 sm:gap-4">

                    {item.perfumeImagen && (
                      <img
                        src={item.perfumeImagen}
                        className="
                          w-12 h-12 sm:w-14 sm:h-14
                          object-contain
                          rounded-md
                          bg-surface
                          border border-border
                          p-1
                        "
                      />
                    )}

                    <div className="space-y-0.5 sm:space-y-1">

                      <p className="text-text text-sm sm:text-base font-medium">
                        {item.perfumeNombre}
                      </p>

                      <p className="text-muted text-xs sm:text-sm">
                        {item.cantidad} × {item.ml} ml
                      </p>

                    </div>

                  </div>

                  <p className="text-text text-sm sm:text-base font-medium">
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </p>

                </div>

              ))}

              {/* TOTAL */}

              <div className="border-t border-border pt-3 sm:pt-4 flex justify-between text-sm sm:text-lg">

                <span className="text-text">
                  Total
                </span>

                <span className="text-accent font-semibold">
                  ${totalPrice.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </Container>

    </div>

  )

}