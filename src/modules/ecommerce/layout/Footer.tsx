import { Container } from "../../../shared/components/ui/Container"
import { Link } from "react-router-dom"
import { ShieldCheck, Truck, Sparkles } from "lucide-react"

export function Footer() {

  const year = new Date().getFullYear()

  return (

    <footer className="mt-20 sm:mt-28 border-t border-border/40 bg-surface">

      <div className="gold-divider" />

      <Container className="py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 text-sm">

          {/* MARCA */}

          <div className="space-y-3 text-center sm:text-left">

            <p className="font-serif text-base sm:text-lg text-text">
              Decants Loncoche
            </p>

            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Fragancias originales en formato decant para descubrir perfumes
              sin comprar el frasco completo.
            </p>

          </div>


          {/* NAVEGACIÓN */}

          <div className="text-center sm:text-left">

            <p className="font-medium mb-3 text-text text-sm">
              Navegación
            </p>

            <div className="flex flex-col gap-1.5 text-muted text-xs sm:text-sm">

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

          <div className="text-center sm:text-left">

            <p className="font-medium mb-3 text-text text-sm">
              Compra segura
            </p>

            <div className="space-y-2 text-muted text-xs sm:text-sm">

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck size={14} className="text-accent" />
                Perfumes originales
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Sparkles size={14} className="text-accent" />
                Decants desde 5ml
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Truck size={14} className="text-accent" />
                Envíos a todo Chile
              </div>

            </div>

          </div>


          {/* CONTACTO */}

          <div className="text-center sm:text-left">

            <p className="font-medium mb-3 text-text text-sm">
              Contacto
            </p>

            <div className="flex flex-col gap-1.5 text-muted text-xs sm:text-sm">

              <p>Loncoche, Chile</p>

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
            mt-10
            pt-5
            text-[10px]
            sm:text-xs
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