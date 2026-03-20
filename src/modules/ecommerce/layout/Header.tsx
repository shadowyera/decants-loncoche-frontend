import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"

import { Container } from "../../../shared/components/ui/Container"

import { CartDrawer } from "../../../domains/carrito/ui/CartDrawer"
import { useCart } from "../../../domains/carrito/hooks/useCart"

export function Header() {

  const { items, openCart } = useCart()

  const cartCount = items.reduce(
    (acc, item) => acc + item.cantidad,
    0
  )

  return (

    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-background/80
        border-b
        border-border/30
      "
    >

      <Container className="flex items-center justify-between h-14 sm:h-16">

        {/* LOGO */}

        <Link
          to="/"
          className="
            font-serif
            text-base
            sm:text-xl
            tracking-wide
            flex
            items-center
            gap-1
          "
        >

          <span className="text-text">
            Decants
          </span>

          {/* 👇 ocultamos en mobile para que no rompa */}
          <span
            className="
              hidden sm:inline
              relative
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-[#c6a44b]
              via-[#f5e6a8]
              to-[#c6a44b]
              bg-[length:200%_100%]
              animate-[shine_6s_linear_infinite]
            "
          >
            Loncoche
          </span>

        </Link>


        {/* NAV */}

        <nav className="flex items-center gap-4 sm:gap-8 text-sm">

          {/* CATÁLOGO (más simple en mobile) */}

          <Link
            to="/catalogo"
            className="
              text-muted
              hover:text-text
              transition-colors
              text-xs
              sm:text-sm
            "
          >
            Catálogo
          </Link>


          {/* CART */}

          <button
            onClick={openCart}
            className="
              relative
              flex
              items-center
              justify-center
              w-9 h-9
              sm:w-auto sm:h-auto
              sm:gap-2
              text-muted
              hover:text-text
              transition-colors
            "
          >

            <ShoppingBag size={18} />

            {/* 👇 ocultamos texto en mobile */}
            <span className="hidden sm:inline">
              Carrito
            </span>


            {/* CART COUNT */}

            {cartCount > 0 && (

              <span
                className="
                  absolute
                  -top-1.5
                  -right-1.5
                  text-[9px]
                  px-1.5
                  py-[1px]
                  rounded-full
                  bg-accent
                  text-black
                  font-medium
                "
              >
                {cartCount}
              </span>

            )}

          </button>

        </nav>

      </Container>


      {/* GOLD DIVIDER */}

      <div className="gold-divider" />


      {/* CART DRAWER */}

      <CartDrawer />

    </header>

  )

}