import { MessageCircle, Instagram } from "lucide-react"
import { Container } from "../../../shared/components/ui/Container"

export function Avisos() {
  return (
    <Container className="mt-4 sm:mt-6">
      
      <div className="
        w-full
        rounded-2xl
        border border-border/40
        bg-surface/60
        backdrop-blur-sm
        px-4 py-3
        flex flex-col sm:flex-row
        items-center
        justify-between
        gap-3
      ">

        {/* TEXTO */}
        <p className="text-xs sm:text-sm text-muted text-center sm:text-left">
          ¿Buscas un perfume específico?{" "}
          <span className="text-text font-medium">
            Consúltanos por disponibilidad
          </span>
        </p>

        {/* BOTONES */}
        <div className="flex items-center gap-2">

          <a
            href="https://www.instagram.com/decantsloncoche/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-[11px] sm:text-xs
              px-3 py-1.5
              rounded-lg
              bg-pink-500/10
              text-pink-400
              hover:bg-pink-500/20
              transition
            "
          >
            <Instagram size={14} />
            Instagram
          </a>

          <a
            href="https://wa.me/56930913587?text=Hola!%20Busco%20un%20perfume"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-[11px] sm:text-xs
              px-3 py-1.5
              rounded-lg
              bg-green-500/10
              text-green-400
              hover:bg-green-500/20
              transition
            "
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>

        </div>

      </div>

    </Container>
  )
}