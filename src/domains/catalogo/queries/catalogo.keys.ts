export const catalogoKeys = {
  all: ["catalogo"] as const,

  list: () => [...catalogoKeys.all, "list"] as const,

  detail: (slug: string) =>
    [...catalogoKeys.all, "detail", slug] as const,
}