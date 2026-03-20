import { Container } from "../../../shared/components/ui/Container"
import { Link } from "react-router-dom"
import { ShieldCheck, Truck, Sparkles } from "lucide-react"

export function Footer() {

  const year = new Date().getFullYear()

  return (

    <footer className="mt-28 border-t border-border/40 bg-surface">

      <div className="gold-divider" />

      <Container className="py-16">

        <div className="grid md:grid-cols-4 gap-12 text-sm">

          {/* MARCA */}

          <div className="space-y-4">

            <p className="font-serif text-lg text-text">
              Decants Loncoche
            </p>

            <p className="text-muted leading-relaxed max-w-xs">
              Fragancias originales en formato decant para descubrir perfumes
              sin comprar el frasco completo.
            </p>

          </div>


          {/* NAVEGACIÓN */}

          <div>

            <p className="font-medium mb-4 text-text">
              Navegación
            </p>

            <div className="flex flex-col gap-2 text-muted">

              <Link
                to="/"
                className="hover:text-text transition-colors"
              >
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="hover:text-text transition-colors"
              >
                Catálogo
              </Link>

            </div>

          </div>


          {/* COMPRA SEGURA */}

          <div>

            <p className="font-medium mb-4 text-text">
              Compra segura
            </p>

            <div className="space-y-3 text-muted">

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" />
                Perfumes originales
              </div>

              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                Decants desde 5ml
              </div>

              <div className="flex items-center gap-2">
                <Truck size={16} className="text-accent" />
                Envíos a todo Chile
              </div>

            </div>

          </div>


          {/* CONTACTO */}

          <div>

            <p className="font-medium mb-4 text-text">
              Contacto
            </p>

            <div className="flex flex-col gap-2 text-muted">

              <p>
                Loncoche, Chile
              </p>

              <a
                href="https://wa.me/56930913587"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors"
              >
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/decantsloncoche/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors"
              >
                @decantsloncoche
              </a>

            </div>

          </div>

        </div>


        {/* FOOTER BOTTOM */}

        <div
          className="
            border-t
            border-border/40
            mt-14
            pt-6
            text-xs
            text-muted
            text-center
          "
        >

          © {year} Decants Loncoche. Todos los derechos reservados.

        </div>

      </Container>

    </footer>

  )

}