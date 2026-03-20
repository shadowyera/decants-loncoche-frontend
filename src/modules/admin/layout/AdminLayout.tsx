import { NavLink, Outlet } from "react-router-dom"

import { Container } from "../../../shared/components/ui/Container"

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-text">

      <div className="flex">

        {/* ==============================
            SIDEBAR
        ============================== */}

        <aside
          className="
          w-64
          min-h-screen
          border-r border-border
          bg-surface
        "
        >

          <div className="p-6">

            <h1
              className="
              text-lg
              font-semibold
              tracking-wide
              text-accent
            "
            >
              Decants Loncoche
            </h1>

            <p className="text-xs text-muted mt-1">
              Panel administrador
            </p>

          </div>

          <nav className="flex flex-col gap-1 px-3">

            <AdminLink
              to="/admin"
              label="Dashboard"
            />

            <AdminLink
              to="/admin/perfumes"
              label="Perfumes"
            />

            <AdminLink
              to="/admin/pedidos"
              label="Pedidos"
            />

          </nav>

        </aside>


        {/* ==============================
            CONTENT
        ============================== */}

        <main className="flex-1">

          <Container className="py-10">

            <Outlet />

          </Container>

        </main>

      </div>

    </div>
  )
}

interface AdminLinkProps {
  to: string
  label: string
}

function AdminLink({
  to,
  label
}: AdminLinkProps) {

  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-md text-sm font-medium transition",

          isActive
            ? "bg-accent/10 text-accent"
            : "text-muted hover:text-text hover:bg-surfaceSoft"
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  )
}