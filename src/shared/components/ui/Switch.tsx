interface SwitchProps {
  checked: boolean
  onChange: () => void
}

export default function Switch({ checked, onChange }: SwitchProps) {

  return (

    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-border"
      }`}
    >

      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : ""
        }`}
      />

    </button>

  )

}