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
        bg-background/70
        border-b
        border-border/30
      "
    >

      <Container className="flex items-center justify-between h-16">

        {/* LOGO */}

        <Link
          to="/"
          className="
            font-serif
            text-xl
            tracking-wide
            flex
            items-center
            gap-1
            hover:opacity-90
            transition
          "
        >

          <span className="text-text">
            Decants
          </span>

          <span
            className="
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

        <nav className="flex items-center gap-8 text-sm">

          <Link
            to="/catalogo"
            className="
              relative
              text-muted
              transition-colors
              hover:text-text
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-accent
              after:transition-all
              hover:after:w-full
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
              gap-2
              text-muted
              transition-colors
              hover:text-text
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-accent
              after:transition-all
              hover:after:w-full
            "
          >

            <ShoppingBag size={17} />

            Carrito


            {/* CART COUNT */}

            {cartCount > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-3
                  text-[10px]
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