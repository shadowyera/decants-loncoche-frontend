import { ShieldCheck, FlaskConical, Truck } from "lucide-react"

export function ProductTrustBadges() {

  const items = [
    {
      icon: ShieldCheck,
      text: "Perfume 100% original"
    },
    {
      icon: FlaskConical,
      text: "Decant preparado al momento"
    },
    {
      icon: Truck,
      text: "Envíos a todo Chile"
    }
  ]

  return (

    <div
      className="
        pt-6
        space-y-3
      "
    >

      {items.map((item, i) => {

        const Icon = item.icon

        return (

          <div
            key={i}
            className="
              flex
              items-center
              gap-3
              text-sm
              text-muted
            "
          >

            <Icon
              size={16}
              className="
                text-accent
                shrink-0
              "
            />

            <span>
              {item.text}
            </span>

          </div>

        )

      })}

    </div>

  )

}