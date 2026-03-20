export function calcularPrecioMl(
    precioBotella: number,
    mlBotella: number,
    multiplicador: number
) {

    if (!precioBotella || !mlBotella) {
        return 0
    }

    const costoMl = precioBotella / mlBotella

    return Math.round(costoMl * multiplicador)

}

export function calcularPrecioSugerido(
    mlDecant: number,
    precioMl: number
) {
    return Math.round(mlDecant * precioMl)
}