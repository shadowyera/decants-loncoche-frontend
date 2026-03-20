import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
    cambiarEstadoDecantAdminApi,
    actualizarStockDecantAdminApi,
    crearDecantAdminApi,
    actualizarDecantAdminApi
} from "../api/adminDecant.api"

import { adminPerfumeKeys } from "../../perfume/queries/adminPerfumeKeys"

import type { Decant } from "../domain/decant.types"


export function useAdminDecants() {

    const queryClient = useQueryClient()


    /* ===============================
       CREAR DECANT
    =============================== */

    const crearDecantMutation = useMutation({

        mutationFn: crearDecantAdminApi,

        onSuccess: (newDecant: Decant) => {

            queryClient.invalidateQueries({
                queryKey: adminPerfumeKeys.detail(newDecant.perfumeId)
            })

        }

    })


    /* ===============================
       TOGGLE DECANT
    =============================== */

    const toggleDecantMutation = useMutation({

        mutationFn: cambiarEstadoDecantAdminApi,

        onSuccess: (updatedDecant: Decant) => {

            queryClient.invalidateQueries({
                queryKey: adminPerfumeKeys.detail(updatedDecant.perfumeId)
            })

        }

    })


    /* ===============================
       ACTUALIZAR STOCK
    =============================== */

    const actualizarStockMutation = useMutation({

        mutationFn: ({
            id,
            stockDisponible
        }: {
            id: string
            stockDisponible: number
        }) => actualizarStockDecantAdminApi(id, stockDisponible),

        onMutate: async ({ id, stockDisponible }) => {

            await queryClient.cancelQueries()

            const queries = queryClient.getQueriesData({
                queryKey: adminPerfumeKeys.detail("")
            })

            queries.forEach(([queryKey, data]: any) => {

                if (!data) return

                const newData = {
                    ...data,
                    decants: data.decants.map((d: Decant) =>
                        d._id === id
                            ? { ...d, stockDisponible }
                            : d
                    )
                }

                queryClient.setQueryData(queryKey, newData)

            })

        },

        onSuccess: (updatedDecant: Decant) => {

            queryClient.invalidateQueries({
                queryKey: adminPerfumeKeys.detail(updatedDecant.perfumeId)
            })

        }

    })


    /* ===============================
       ACTUALIZAR PRECIO
    =============================== */

    const actualizarDecantMutation = useMutation({

        mutationFn: ({
            id,
            precio
        }: {
            id: string
            precio: number
        }) => actualizarDecantAdminApi(id, { precio }),

        onSuccess: (updatedDecant: Decant) => {

            queryClient.invalidateQueries({
                queryKey: adminPerfumeKeys.detail(updatedDecant.perfumeId)
            })

        }

    })


    /* ===============================
       RETURN
    =============================== */

    return {

        crearDecant: crearDecantMutation.mutateAsync,

        actualizarDecant: actualizarDecantMutation.mutateAsync,

        toggleDecant: toggleDecantMutation.mutateAsync,

        actualizarStock: actualizarStockMutation.mutateAsync,

        isCreating: crearDecantMutation.isPending,

        isUpdating: actualizarDecantMutation.isPending,

        isUpdatingStock: actualizarStockMutation.isPending,

        isToggling: toggleDecantMutation.isPending
    }

}