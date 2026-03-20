export const adminPerfumeKeys = {

  all: ["admin", "perfumes"] as const,

  lists: () =>
    [...adminPerfumeKeys.all, "list"] as const,

  list: () =>
    [...adminPerfumeKeys.lists()] as const,

  details: () =>
    [...adminPerfumeKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...adminPerfumeKeys.details(), id] as const

}