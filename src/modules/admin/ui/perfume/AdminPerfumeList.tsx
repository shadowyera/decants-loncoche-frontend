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

      <div className="flex items-center justify-between mb-6">

        <h2 className="font-serif text-2xl text-text">
          Perfumes
        </h2>

        <Button
          onClick={onCreate}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
        </Button>

      </div>


      {/* EMPTY STATE */}

      {perfumes.length === 0 && (

        <div className="text-sm text-muted py-6 text-center">
          No hay perfumes aún
        </div>

      )}


      {/* LIST */}

      <div className="space-y-3">

        {perfumes.map((p) => {

          const selected = selectedPerfumeId === p._id

          return (

            <Card
              key={p._id}
              onClick={() => onSelect(p._id)}
              className={`
                flex items-center gap-4 p-3 cursor-pointer
                transition-colors
                ${selected ? "border-accent" : ""}
              `}
            >

              {/* IMAGE */}

              <div className="w-14 h-14 flex items-center justify-center bg-surface border border-border rounded-lg overflow-hidden">

                {p.imagen ? (

                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    loading="lazy"
                    className="object-contain max-h-full"
                  />

                ) : (

                  <span className="text-xs text-muted">
                    Sin imagen
                  </span>

                )}

              </div>


              {/* INFO */}

              <div>

                <h3 className="text-text text-sm font-medium">
                  {p.nombre}
                </h3>

                <p className="text-xs text-muted">
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