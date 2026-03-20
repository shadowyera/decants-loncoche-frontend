import { apiClient } from "../../../shared/api/apiClient"
import type { CatalogoProducto } from "../domain/catalogo.types"

export async function obtenerCatalogoApi() {
  const { data } = await apiClient.get<CatalogoProducto[]>("/catalogo")

  return data
}

export async function obtenerProductoApi(slug: string) {
  const { data } = await apiClient.get<CatalogoProducto>(`/catalogo/${slug}`)

  return data
}

export async function obtenerRecomendacionesApi(slug: string) {

  const { data } = await apiClient.get<CatalogoProducto[]>(
    `/catalogo/${slug}/recomendaciones`
  )

  return data

}