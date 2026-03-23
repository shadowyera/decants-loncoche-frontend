"use client"

import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Container } from "../../../shared/components/ui/Container"

export default function AdminLayout() {

  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-text">

      {/* ==============================
          MOBILE HEADER
      ============================== */}
      <div className="lg:hidden h-14 border-b border-border flex items-center justify-between px-4">

        <button
          onClick={() => setOpen(true)}
          className="text-sm px-3 py-1 rounded-md bg-surface"
        >
          ☰
        </button>

        <p className="text-sm text-muted">
          Admin
        </p>

      </div>

      <div className="flex">

        {/* ==============================
            SIDEBAR
        ============================== */}

        {/* OVERLAY MOBILE */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={`
            fixed z-50 top-0 left-0 h-full w-64
            bg-surface border-r border-border
            transform transition-transform duration-300

            ${open ? "translate-x-0" : "-translate-x-full"}

            lg:translate-x-0 lg:static lg:h-auto
            flex flex-col
          `}
        >

          {/* HEADER */}
          <div className="p-6 border-b border-border flex justify-between items-center">

            <div>
              <h1 className="text-lg font-semibold tracking-wide text-accent">
                Decants Loncoche
              </h1>

              <p className="text-xs text-muted mt-1">
                Panel administrador
              </p>
            </div>

            {/* CLOSE MOBILE */}
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-sm"
            >
              ✕
            </button>

          </div>

          {/* NAV */}
          <nav className="flex flex-col gap-1 px-3 py-4">

            <AdminLink to="/admin" label="Dashboard" onClick={() => setOpen(false)} />
            <AdminLink to="/admin/perfumes" label="Perfumes" onClick={() => setOpen(false)} />
            <AdminLink to="/admin/pedidos" label="Pedidos" onClick={() => setOpen(false)} />

          </nav>

          {/* FOOTER */}
          <div className="mt-auto p-4 text-xs text-muted">
            v1.0 Admin
          </div>

        </aside>

        {/* ==============================
            CONTENT
        ============================== */}

        <main className="flex-1 min-h-screen flex flex-col">

          {/* DESKTOP HEADER */}
          <div className="hidden lg:flex h-16 border-b border-border items-center px-6">
            <p className="text-sm text-muted">
              Panel de administración
            </p>
          </div>

          {/* CONTENT */}
          <div className="flex-1">
            <Container className="py-6 sm:py-8 h-full">
              <Outlet />
            </Container>
          </div>

        </main>

      </div>

    </div>
  )
}

/* ==============================
   LINK COMPONENT
============================== */

interface AdminLinkProps {
  to: string
  label: string
  onClick?: () => void
}

function AdminLink({ to, label, onClick }: AdminLinkProps) {

  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center",

          isActive
            ? "bg-accent/10 text-accent shadow-sm"
            : "text-muted hover:text-text hover:bg-surfaceSoft"
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  )
}