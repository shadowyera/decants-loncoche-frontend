import { createBrowserRouter } from "react-router-dom"

/* ==============================
   ECOMMERCE
============================== */

import { EcommerceLayout } from "../modules/ecommerce/layout/EcommerceLayout"

import { HomePage } from "../modules/ecommerce/pages/HomePage"
import { CatalogoPage } from "../modules/ecommerce/pages/CatalogoPage"
import { PerfumePage } from "../modules/ecommerce/pages/PerfumePage"
import { CheckoutPage } from "../modules/ecommerce/pages/CheckoutPage"
import { PedidoConfirmadoPage } from "../modules/ecommerce/pages/PedidoConfirmadoPage"


/* ==============================
   ADMIN
============================== */

import AdminLayout from "../modules/admin/layout/AdminLayout"
import { AdminLoginPage } from "../modules/admin/pages/AdminLoginPage"
import AdminPerfumesPage from "../modules/admin/pages/AdminPerfumesPage"
import { AdminGuard } from "../modules/admin/guards/AdminGuard"
import AdminPedidosPage from "../modules/admin/pages/AdminPedidosPage"

export const router = createBrowserRouter([

  /* =================================
     TIENDA PUBLICA
  ================================= */

  {
    element: <EcommerceLayout />,

    children: [

      {
        path: "/",
        element: <HomePage />
      },

      {
        path: "/catalogo",
        element: <CatalogoPage />
      },

      {
        path: "/perfume/:slug",
        element: <PerfumePage />
      },

      {
        path: "/checkout",
        element: <CheckoutPage />
      },

      {
        path: "/pedido/:id",
        element: <PedidoConfirmadoPage />
      },

    ]
  },

  /* =================================
     LOGIN ADMIN
  ================================= */

  {
    path: "/admin/login",
    element: <AdminLoginPage />
  },

  /* =================================
     PANEL ADMIN (PROTEGIDO)
  ================================= */

  {
    element: <AdminGuard />,

    children: [

      {
        path: "/admin",
        element: <AdminLayout />,

        children: [

          {
            path: "perfumes",
            element: <AdminPerfumesPage />
          },
          {
            path: "pedidos",
            element: <AdminPedidosPage />
          }

        ]

      }

    ]

  }

])