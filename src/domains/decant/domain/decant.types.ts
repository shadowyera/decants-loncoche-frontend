/* =====================================================
   DECANT
===================================================== */

export interface Decant {

  _id: string

  /* ======================
     RELACIÓN PERFUME
  ====================== */

  perfumeId: string


  /* ======================
     TAMAÑO
  ====================== */

  ml: number


  /* ======================
     PRECIO
  ====================== */

  precio: number


  /* ======================
     STOCK
  ====================== */

  stockDisponible: number

  stockReservado: number


  /* ======================
     IDENTIFICACIÓN
  ====================== */

  sku: string


  /* ======================
     ESTADO
  ====================== */

  activo: boolean


  /* ======================
     FECHAS
  ====================== */

  createdAt: string

  updatedAt: string

}


/* =====================================================
   CREAR DECANT
===================================================== */

export interface CrearDecantInput {

  perfumeId: string

  ml: number

  precio: number

  stockDisponible: number

}


/* =====================================================
   ACTUALIZAR DECANT
===================================================== */

export interface ActualizarDecantInput {

  precio?: number

  activo?: boolean

}


/* =====================================================
   ACTUALIZAR STOCK
===================================================== */

export interface ActualizarStockDecantInput {

  stockDisponible: number

}