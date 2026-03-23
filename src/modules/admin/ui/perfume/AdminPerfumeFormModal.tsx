import { Loader2 } from "lucide-react"
import { Button } from "../../../../shared/components/ui/Button"

import type { Perfume } from "../../../../domains/perfume/domain/perfume.types"

interface PerfumeForm {
  marca: string
  nombre: string
  slug: string
  descripcion: string
  baseSku: string
  imagen: string
  notas: string
  familiasOlfativas: string
  precioBotella: number
  mlBotella: number
  multiplicadorDecant: number
}

interface Props {
  editing: Perfume | null
  form: PerfumeForm
  setForm: React.Dispatch<React.SetStateAction<PerfumeForm>>
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  loading: boolean
}

const inputClass = `
w-full
px-4
py-3
rounded-md
bg-background
border
border-border
text-text
placeholder:text-muted
focus:outline-none
focus:border-accent
transition
`

const labelClass = `
text-sm
font-medium
text-text
mb-1
block
`

const hintClass = `
text-xs
text-muted
mt-1
`

export default function AdminPerfumeFormModal({
  editing,
  form,
  setForm,
  onSubmit,
  onClose,
  loading
}: Props) {

  function update<K extends keyof PerfumeForm>(
    key: K,
    value: PerfumeForm[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  return (

    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="
        relative
        w-full
        sm:max-w-5xl

        bg-surface
        border border-border

        rounded-t-2xl sm:rounded-xl

        p-4 sm:p-8

        max-h-[95vh]
        overflow-y-auto

        pb-[env(safe-area-inset-bottom)]
      ">

        {/* HANDLE MOBILE */}
        <div className="w-10 h-1.5 bg-border rounded-full mx-auto mb-4 sm:hidden" />

        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          {editing ? "Editar perfume" : "Crear perfume"}
        </h3>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >

          {/* IZQUIERDA */}
          <div className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>Marca</label>
                <input
                  className={inputClass}
                  value={form.marca}
                  onChange={e => update("marca", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  className={inputClass}
                  value={form.nombre}
                  onChange={e => update("nombre", e.target.value)}
                  required
                />
              </div>

            </div>

            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                className={inputClass}
                value={form.descripcion}
                onChange={e => update("descripcion", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Notas</label>
              <input
                className={inputClass}
                value={form.notas}
                onChange={e => update("notas", e.target.value)}
              />
              <p className={hintClass}>Separar por comas</p>
            </div>

            <div>
              <label className={labelClass}>Familias olfativas</label>
              <input
                className={inputClass}
                value={form.familiasOlfativas}
                onChange={e => update("familiasOlfativas", e.target.value)}
              />
              <p className={hintClass}>Separar por comas</p>
            </div>

          </div>


          {/* DERECHA */}
          <div className="space-y-6">

            <div>
              <label className={labelClass}>Imagen</label>
              <input
                className={inputClass}
                value={form.imagen}
                onChange={e => update("imagen", e.target.value)}
              />
              <p className={hintClass}>Ruta de la imagen</p>
            </div>

            {form.imagen && (
              <div className="flex justify-center">
                <img
                  src={form.imagen}
                  alt="Preview"
                  className="h-28 sm:h-32 object-contain"
                />
              </div>
            )}

            <div className="border border-border rounded-lg p-4 space-y-4">

              <h4 className="text-sm font-semibold text-text">
                Datos botella
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className={labelClass}>Precio botella</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={form.precioBotella}
                    onChange={e =>
                      update("precioBotella", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>ML botella</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={form.mlBotella}
                    onChange={e =>
                      update("mlBotella", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Multiplicador</label>
                  <input
                    className={inputClass}
                    type="number"
                    step="0.1"
                    value={form.multiplicadorDecant}
                    onChange={e =>
                      update("multiplicadorDecant", Number(e.target.value))
                    }
                  />
                </div>

              </div>

            </div>

          </div>


          {/* ACTIONS */}
          <div className="
            col-span-1 sm:col-span-2

            sticky bottom-0
            bg-surface

            pt-4 mt-4

            flex flex-col sm:flex-row
            gap-2 sm:gap-3
          ">

            <Button
              variant="ghost"
              type="button"
              onClick={onClose}
              className="w-full"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : editing ? (
                "Guardar cambios"
              ) : (
                "Crear perfume"
              )}
            </Button>

          </div>

        </form>

      </div>

    </div>

  )

}