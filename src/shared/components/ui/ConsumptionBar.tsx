interface Props {
  mlTotales: number
  mlDisponibles: number
}

export default function ConsumptionBar({
  mlTotales,
  mlDisponibles
}: Props) {

  const mlUsados = mlTotales - mlDisponibles

  const porcentaje = Math.min(
    (mlUsados / mlTotales) * 100,
    100
  )

  let color = "bg-green-500"

  if (porcentaje > 50) color = "bg-yellow-500"
  if (porcentaje > 80) color = "bg-red-500"

  return (

    <div className="space-y-2">

      <div className="flex justify-between text-xs text-muted">

        <span>Botella {mlTotales} ml</span>

        <span>
          {mlUsados} / {mlTotales} ml usados
        </span>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${porcentaje}%` }}
        />

      </div>

    </div>

  )
}