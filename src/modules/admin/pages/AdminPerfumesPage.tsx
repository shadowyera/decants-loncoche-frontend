import { useState, useEffect } from "react"

import { Container } from "../../../shared/components/ui/Container"

import { useAdminPerfumes } from "../../../domains/perfume/hooks/useAdminPerfumes"
import { useAdminPerfume } from "../../../domains/perfume/hooks/useAdminPerfume"
import { useAdminDecants } from "../../../domains/decant/hooks/useAdminDecants"

import type { Perfume } from "../../../domains/perfume/domain/perfume.types"

import AdminPerfumeList from "../ui/perfume/AdminPerfumeList"
import AdminPerfumeDetail from "../ui/perfume/AdminPerfumeDetail"
import AdminPerfumeFormModal from "../ui/perfume/AdminPerfumeFormModal"
import { AdminCreateDecantModal } from "../ui/perfume/AdminCreateDecantModal"

export default function AdminPerfumesPage() {

  const {
    perfumes,
    isLoading,
    crearPerfume,
    actualizarPerfume,
    togglePerfume,
    isSaving
  } = useAdminPerfumes()

  const {
    toggleDecant,
    actualizarStock,
    actualizarDecant,
    crearDecant
  } = useAdminDecants()

  const [selectedPerfumeId, setSelectedPerfumeId] =
    useState<string | null>(null)

  const { detalle } = useAdminPerfume(
    selectedPerfumeId ?? undefined
  )

  useEffect(() => {
    if (!selectedPerfumeId && perfumes.length > 0) {
      setSelectedPerfumeId(perfumes[0]._id)
    }
  }, [perfumes, selectedPerfumeId])

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Perfume | null>(null)

  const [showCreateDecant, setShowCreateDecant] =
    useState(false)

  const [form, setForm] = useState({
    marca: "",
    nombre: "",
    slug: "",
    descripcion: "",
    baseSku: "",
    imagen: "",
    notas: "",
    familiasOlfativas: "",
    precioBotella: 0,
    mlBotella: 100,
    multiplicadorDecant: 1.8
  })

  function openCreate() {
    setEditing(null)
    setForm({
      marca: "",
      nombre: "",
      slug: "",
      descripcion: "",
      baseSku: "",
      imagen: "",
      notas: "",
      familiasOlfativas: "",
      precioBotella: 0,
      mlBotella: 100,
      multiplicadorDecant: 1.8
    })
    setShowForm(true)
  }

  function openEdit(p: Perfume) {
    setEditing(p)
    setForm({
      marca: p.marca,
      nombre: p.nombre,
      slug: p.slug,
      descripcion: p.descripcion ?? "",
      baseSku: p.baseSku,
      imagen: p.imagen ?? "",
      notas: (p.notas ?? []).join(", "),
      familiasOlfativas: (p.familiasOlfativas ?? []).join(", "),
      precioBotella: p.precioBotella ?? 0,
      mlBotella: p.mlBotella ?? 100,
      multiplicadorDecant: p.multiplicadorDecant ?? 1.8
    })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditing(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      marca: form.marca,
      nombre: form.nombre,
      slug: form.slug,
      descripcion: form.descripcion || undefined,
      baseSku: form.baseSku,
      imagen: form.imagen || undefined,
      notas: form.notas.split(",").map(s => s.trim()).filter(Boolean),
      familiasOlfativas: form.familiasOlfativas.split(",").map(s => s.trim()).filter(Boolean),
      precioBotella: form.precioBotella,
      mlBotella: form.mlBotella,
      multiplicadorDecant: form.multiplicadorDecant
    }

    try {
      if (editing) {
        await actualizarPerfume({
          id: editing._id,
          input: payload
        })
      } else {
        await crearPerfume(payload)
      }

      closeForm()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleTogglePerfume(id: string) {
    try {
      await togglePerfume(id)
    } catch (err) {
      console.error(err)
    }
  }

  function openCreateDecant() {
    setShowCreateDecant(true)
  }

  function closeCreateDecant() {
    setShowCreateDecant(false)
  }

  async function handleCreateDecant(data: {
    perfumeId: string
    ml: number
    precio: number
    stockDisponible: number
  }) {
    try {
      await crearDecant(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleToggleDecant(id: string) {
    try {
      await toggleDecant(id)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleStockUpdate(id: string, stock: number) {
    try {
      await actualizarStock({
        id,
        stockDisponible: stock
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function handlePrecioUpdate(id: string, precio: number) {
    try {
      await actualizarDecant({
        id,
        precio
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (

    <div className="py-6 sm:py-10">

      <Container>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">

          {/* LIST */}
          <div className="min-w-0">
            <AdminPerfumeList
              perfumes={perfumes}
              selectedPerfumeId={selectedPerfumeId}
              onSelect={setSelectedPerfumeId}
              onCreate={openCreate}
              isLoading={isLoading}
            />
          </div>

          {/* DETAIL */}
          <div className="min-w-0">
            <AdminPerfumeDetail
              detalle={detalle ?? null}
              onEdit={openEdit}
              onToggle={handleTogglePerfume}
              onStockUpdate={handleStockUpdate}
              onPrecioUpdate={handlePrecioUpdate}
              onToggleDecant={handleToggleDecant}
              onCreateDecant={openCreateDecant}
            />
          </div>

        </div>

      </Container>

      {showForm && (
        <AdminPerfumeFormModal
          editing={editing}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeForm}
          loading={isSaving}
        />
      )}

      {showCreateDecant && detalle && (
        <AdminCreateDecantModal
          perfumeId={detalle.perfume._id}
          precioBotella={detalle.perfume.precioBotella ?? 0}
          mlBotella={detalle.perfume.mlBotella ?? 100}
          mlDisponibles={detalle.mlDisponibles ?? 0}
          existingMl={detalle.decants.map(d => d.ml)}
          onCreate={handleCreateDecant}
          onClose={closeCreateDecant}
        />
      )}

    </div>

  )
}