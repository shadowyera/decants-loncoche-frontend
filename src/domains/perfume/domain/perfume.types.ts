import type { Decant } from "../../decant/domain/decant.types"


/* =====================================================
   PERFUME
===================================================== */

export interface Perfume {

  _id: string

  marca: string

  nombre: string

  slug: string

  descripcion?: string | null

  notas: string[]

  familiasOlfativas: string[]

  imagen?: string | null


  /* ======================
     BOTELLA
  ====================== */

  precioBotella?: number | null

  mlBotella?: number

  multiplicadorDecant?: number


  /* ======================
     NEGOCIO
  ====================== */

  activo: boolean

  baseSku: string

  createdAt: string

  updatedAt: string

}


/* =====================================================
   CREAR PERFUME
===================================================== */

export interface CrearPerfumeInput {

  marca: string

  nombre: string

  slug: string

  descripcion?: string

  imagen?: string

  baseSku: string

  notas?: string[]

  familiasOlfativas?: string[]

  precioBotella?: number

  mlBotella?: number

  multiplicadorDecant?: number

}


/* =====================================================
   ACTUALIZAR PERFUME
===================================================== */

export interface ActualizarPerfumeInput {

  marca?: string

  nombre?: string

  slug?: string

  descripcion?: string

  imagen?: string

  baseSku?: string

  notas?: string[]

  familiasOlfativas?: string[]

  precioBotella?: number

  mlBotella?: number

  multiplicadorDecant?: number

  activo?: boolean

}


/* =====================================================
   SUGERENCIA DECANT
===================================================== */

export interface SugerenciaDecant {

  ml: number

  precioSugerido: number

}


/* =====================================================
   PERFUME DETALLE ADMIN
===================================================== */

export interface PerfumeDetalleAdmin {

  perfume: Perfume

  decants: Decant[]

  sugerenciasDecants: SugerenciaDecant[]

  mlDisponibles: number

}