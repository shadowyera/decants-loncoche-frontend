import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Container } from "../../../shared/components/ui/Container"
import { Button } from "../../../shared/components/ui/Button"

import { apiClient } from "../../../shared/api/apiClient"

export function AdminLoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const { data } = await apiClient.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", data.token)

      navigate("/admin/perfumes")

    } catch {
      setError("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  return (

    <div
      className="
        min-h-screen
        bg-background
        text-text
        flex
        items-center
        justify-center
        px-4 sm:px-6
      "
    >

      <Container className="w-full max-w-sm sm:max-w-md">

        <div
          className="
            border
            border-border
            bg-surface
            rounded-xl
            p-6 sm:p-8 md:p-10
            shadow-sm
          "
        >

          {/* HEADER */}
          <div className="space-y-2 sm:space-y-3 text-center mb-6 sm:mb-8">

            <p
              className="
                text-[10px] sm:text-xs
                tracking-[0.25em]
                uppercase
                text-accent
              "
            >
              Decants Loncoche
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl">
              Panel Admin
            </h1>

            <p className="text-muted text-xs sm:text-sm">
              Acceso restringido
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                px-4
                py-2.5 sm:py-3
                text-sm
                rounded-md
                bg-background
                border
                border-border
                text-text
                placeholder:text-muted
                focus:outline-none
                focus:ring-1
                focus:ring-accent
                focus:border-accent
                transition
              "
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4
                py-2.5 sm:py-3
                text-sm
                rounded-md
                bg-background
                border
                border-border
                text-text
                placeholder:text-muted
                focus:outline-none
                focus:ring-1
                focus:ring-accent
                focus:border-accent
                transition
              "
              required
            />

            {error && (
              <p className="text-red-400 text-xs sm:text-sm">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

          </form>

        </div>

      </Container>

    </div>

  )
}