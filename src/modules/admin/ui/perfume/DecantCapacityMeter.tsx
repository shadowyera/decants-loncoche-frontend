import type { Decant } from "../../../../domains/decant/domain/decant.types"

interface Props {
  mlBotella: number
  decants: Decant[]
}

export default function DecantCapacityMeter({
  mlBotella,
  decants
}: Props) {

  if (!mlBotella) return null

  const activos = decants.filter(d => d.activo)

  return (

    <div className="space-y-2">

      <p className="text-xs text-muted">
        Capacidad máxima de decants por botella
      </p>

      {activos.map((d) => {

        const max = Math.floor(mlBotella / d.ml)

        return (

          <div
            key={d._id}
            className="flex items-center justify-between text-sm"
          >

            <span className="text-text">
              {d.ml} ml
            </span>

            <div className="flex-1 mx-3 h-2 bg-border rounded-full overflow-hidden">

              <div
                className="h-full bg-accent"
                style={{
                  width: `${Math.min(max * 6, 100)}%`
                }}
              />

            </div>

            <span className="text-muted">
              {max} posibles
            </span>

          </div>

        )

      })}

    </div>

  )

}