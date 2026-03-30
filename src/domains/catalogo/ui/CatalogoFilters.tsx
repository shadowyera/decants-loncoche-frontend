import { Search, X } from "lucide-react"

interface CatalogoFiltersProps {
  search: string
  onSearchChange: (value: string) => void

  filtro: string
  onFiltroChange: (value: string) => void
}

/* 🔥 ALINEADO CON TU BACKEND */
const filtros = [
  { label: "Todos", value: "todos" },
  { label: "Dulce", value: "dulce" },
  { label: "Fresco", value: "fresco" },
  { label: "Cítrico", value: "citrico" },
  { label: "Frutal", value: "frutal" },
  { label: "Amaderado", value: "amaderado" },
  { label: "Ámbar", value: "ambarado" },
  { label: "Gourmand", value: "gourmand" },
]

export function CatalogoFilters({
  search,
  onSearchChange,
  filtro,
  onFiltroChange
}: CatalogoFiltersProps) {

  return (

    <div className="space-y-6">

      {/* SEARCH */}

      <div className="relative max-w-md">

        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar perfume o marca..."
          className="
            w-full
            pl-9
            pr-9
            py-2.5
            bg-surface
            border
            border-border
            rounded-lg
            text-sm
            text-text
            placeholder:text-subtle
            focus:outline-none
            focus:ring-2
            focus:ring-accent/40
          "
        />

        {search && (

          <button
            onClick={() => onSearchChange("")}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-muted
              hover:text-text
            "
          >
            <X size={16} />
          </button>

        )}

      </div>


      {/* FILTER CHIPS */}

      <div className="flex flex-wrap gap-2">

        {filtros.map((f) => {

          const activo = filtro === f.value

          return (

            <button
              key={f.value}
              onClick={() => onFiltroChange(f.value)}
              className={`
                px-4 py-1.5
                text-sm
                rounded-full
                border
                transition
                ${activo
                  ? "bg-accent text-black border-accent"
                  : "border-border text-muted hover:border-accent hover:text-text"}
              `}
            >
              {f.label}
            </button>

          )

        })}

      </div>

    </div>

  )

}