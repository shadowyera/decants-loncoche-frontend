import { calcularPrecioMl, calcularPrecioSugerido } 
from "../../../shared/utils/calculateDecantPrice"

import type { Perfume } from "../../perfume/domain/perfume.types"
import type { Decant } from "../domain/decant.types"

export function useSuggestedPrices(
  perfume: Perfume,
  decants: Decant[]
) {

  const precioBotella =
    perfume.precioBotella ?? 0

  const mlBotella =
    perfume.mlBotella ?? 0

  const multiplicador =
    perfume.multiplicadorDecant ?? 1

  const precioMl = calcularPrecioMl(
    precioBotella,
    mlBotella,
    multiplicador
  )

  const suggestedPrices: Record<string, number> = {}

  decants.forEach((d) => {

    suggestedPrices[d._id] =
      calcularPrecioSugerido(d.ml, precioMl)

  })

  return {
    precioMl,
    suggestedPrices
  }

}