import { Loader2, Plus } from "lucide-react"

import { Card } from "../../../../shared/components/ui/Card"
import { Button } from "../../../../shared/components/ui/Button"

import type { Perfume } from "../../../../domains/perfume/domain/perfume.types"

interface Props {
  perfumes: Perfume[]
  selectedPerfumeId: string | null
  onSelect: (id: string) => void
  onCreate: () => void
  isLoading: boolean
  error?: unknown
}

export default function AdminPerfumeList({
  perfumes,
  selectedPerfumeId,
  onSelect,
  onCreate,
  isLoading,
  error
}: Props) {

  if (isLoading) {
    return (
      <div className="text-center py-10 text-muted">
        <Loader2 className="animate-spin mx-auto mb-3" />
        Cargando perfumes...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm py-6">
        Error cargando perfumes
      </div>
    )
  }

  return (

    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">

        <h2 className="font-serif text-xl sm:text-2xl text-text">
          Perfumes
        </h2>

        <Button
          onClick={onCreate}
          className="flex items-center gap-2 px-3 py-2"
        >
          <Plus size={16} />
        </Button>

      </div>

      {/* EMPTY */}
      {perfumes.length === 0 && (
        <div className="text-sm text-muted py-6 text-center">
          No hay perfumes aún
        </div>
      )}

      {/* LIST */}
      <div className="space-y-2 sm:space-y-3">

        {perfumes.map((p) => {

          const selected = selectedPerfumeId === p._id

          return (

            <Card
              key={p._id}
              onClick={() => onSelect(p._id)}
              className={`
                flex items-center gap-3 sm:gap-4
                p-2.5 sm:p-3
                cursor-pointer
                transition-all duration-150

                ${selected
                  ? "border-accent bg-accent/10 ring-1 ring-accent/30"
                  : "hover:bg-surfaceSoft"}
              `}
            >

              {/* IMAGE */}
              <div className="
                w-12 h-12 sm:w-14 sm:h-14
                flex items-center justify-center
                bg-surface border border-border
                rounded-lg overflow-hidden shrink-0
              ">

                {p.imagen ? (
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    loading="lazy"
                    className="object-contain max-h-full"
                  />
                ) : (
                  <span className="text-[10px] sm:text-xs text-muted">
                    Sin imagen
                  </span>
                )}

              </div>

              {/* INFO */}
              <div className="min-w-0">

                <h3 className="
                  text-text text-sm font-medium
                  truncate
                ">
                  {p.nombre}
                </h3>

                <p className="
                  text-xs text-muted
                  truncate
                ">
                  {p.marca}
                </p>

              </div>

            </Card>

          )

        })}

      </div>

    </div>

  )

}