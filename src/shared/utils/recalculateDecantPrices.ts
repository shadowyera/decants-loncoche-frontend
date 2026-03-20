import { calcularPrecioMl, calcularPrecioSugerido }
from "./calculateDecantPrice"

import type { Perfume } from "../../domains/perfume/domain/perfume.types"
import type { Decant } from "../../domains/decant/domain/decant.types"

export function recalcularPreciosDecants(
  perfume: Perfume,
  decants: Decant[]
) {

  const precioBotella =
    perfume.precioBotella ?? 0

  const mlBotella =
    perfume.mlBotella ?? 0

  const multiplicador =
    perfume.multiplicadorDecant ?? 1

  const precioMl =
    calcularPrecioMl(
      precioBotella,
      mlBotella,
      multiplicador
    )

  const nuevosPrecios: Record<string, number> = {}

  decants.forEach((d) => {

    nuevosPrecios[d._id] =
      calcularPrecioSugerido(d.ml, precioMl)

  })

  return nuevosPrecios
}