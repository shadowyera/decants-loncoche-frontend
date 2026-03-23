import { createBrowserRouter, Navigate } from "react-router-dom"

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
import AdminPedidosPage from "../modules/admin/pages/AdminPedidosPage"
import { AdminDashboardPage } from "../modules/admin/pages/AdminDashboardPage"
import { AdminGuard } from "../modules/admin/guards/AdminGuard"

export const router = createBrowserRouter([

  /* =================================
     TIENDA PUBLICA
  ================================= */

  {
    element: <EcommerceLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/catalogo", element: <CatalogoPage /> },
      { path: "/perfume/:slug", element: <PerfumePage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/pedido/:id", element: <PedidoConfirmadoPage /> },
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
    path: "/admin",
    element: <AdminGuard />,

    children: [
      {
        element: <AdminLayout />,

        children: [

          /* 🔥 REDIRECT AUTOMÁTICO */
          {
            index: true,
            element: <Navigate to="dashboard" replace />
          },

          {
            path: "dashboard",
            element: <AdminDashboardPage />
          },

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