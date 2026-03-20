import type { Decant } from "../../decant/domain/decant.types"

export function calcularMlDisponibles(
  mlBotella: number,
  decants: Decant[]
) {

  const consumido = decants.reduce((total, d) => {

    if (!d.activo) return total

    return total + (d.ml * d.stockDisponible)

  }, 0)

  return mlBotella - consumido
}