import type { Decant } from "../domain/decant.types"

export function useDecantInventory(
    decants: Decant[],
    stockEdit: Record<string, number>,
    mlBotella: number
) {

    function getStock(decant: Decant) {

        if (!decant.activo) {
            return 0
        }

        if (stockEdit[decant._id] !== undefined) {
            return stockEdit[decant._id]
        }

        return decant.stockDisponible

    }

    function calcularMaxStock(decant: Decant) {

        const otrosMl = decants.reduce((total, d) => {

            if (d._id === decant._id) return total
            if (!d.activo) return total

            const stock =
                !d.activo
                    ? 0
                    : stockEdit[d._id] !== undefined
                        ? stockEdit[d._id]
                        : d.stockDisponible

            return total + d.ml * stock

        }, 0)

        const mlDisponibles = mlBotella - otrosMl

        return Math.floor(mlDisponibles / decant.ml)

    }

    return {
        getStock,
        calcularMaxStock
    }

}