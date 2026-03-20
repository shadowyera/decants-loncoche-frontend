import type { Decant } from "../../domains/decant/domain/decant.types"

export function calcularMlReservados(
  decants: Decant[],
  stockEdit: Record<string, number>
) {

  return decants.reduce((total, d) => {

    if (!d.activo) return total

    const stock =
      stockEdit[d._id] !== undefined
        ? stockEdit[d._id]
        : d.stockDisponible

    return total + d.ml * stock

  }, 0)

}

export function calcularMlDisponibles(
  mlBotella: number,
  decants: Decant[],
  stockEdit: Record<string, number>
) {

  const reservados =
    calcularMlReservados(decants, stockEdit)

  return Math.max(mlBotella - reservados, 0)

}