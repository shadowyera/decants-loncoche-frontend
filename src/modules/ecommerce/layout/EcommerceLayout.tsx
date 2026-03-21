import { Outlet } from "react-router-dom"

import { Header } from "./Header"
import { Footer } from "./Footer"
import { ScrollToTop } from "../../../app/router/ScrollToTop"

export function EcommerceLayout() {

  return (

    <div className="min-h-screen flex flex-col bg-background">

      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>

  )

}