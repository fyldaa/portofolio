import { useState, useEffect } from 'react'
import ExperienceForm from '../components/ExperienceForm'
import ExperienceCard from '../components/ExperienceCard'
import './ExperiencePage.css'

const STORAGE_KEY = 'pf_experiences'

const EMPTY_FORM = {
  title: '',
  category: 'PKL',
  organization: '',
  year: '',
  description: '',
}

function Experience() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [activeFilter, setActiveFilter] = useState('Semua')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setData(JSON.parse(saved))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { title, organization, year } = formData
    if (!title.trim() || !organization.trim() || !year.trim()) {
      alert('Judul, Instansi, dan Tahun wajib diisi!')
      return
    }
    if (editId !== null) {
      setData(data.map(item =>
        item.id === editId ? { ...item, ...formData } : item
      ))
      setEditId(null)
    } else {
      setData([...data, { id: Date.now(), ...formData }])
    }
    setFormData(EMPTY_FORM)
  }

  function handleEdit(id) {
    const item = data.find(i => i.id === id)
    if (!item) return
    setFormData({
      title:        item.title,
      category:     item.category,
      organization: item.organization,
      year:         item.year,
      description:  item.description || '',
    })
    setEditId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if (window.confirm('Yakin hapus pengalaman ini?'))
      setData(data.filter(i => i.id !== id))
  }

  function handleCancelEdit() {
    setEditId(null)
    setFormData(EMPTY_FORM)
  }

  function hapusSemua() {
    if (window.confirm('Hapus semua pengalaman?')) setData([])
  }

  const FILTERS = ['Semua', 'PKL', 'Freelance', 'Lomba', 'Ekstrakurikuler']
  const filtered = activeFilter === 'Semua'
    ? data
    : data.filter(i => i.category === activeFilter)

  return (
    <main className="experience page-enter">
      <div className="experience__inner">

        {/* ── HEADER ── */}
        <div className="experience__header">
          <span className="section-eyebrow">CRUD · Experience</span>
          <h2 className="section-title-display">
            Riwayat<br /><em>Pengalaman</em>
          </h2>
        </div>

        <div className="experience__layout">

          {/* ── FORM PANEL (sticky) ── */}
          <div className="experience__form-col">
            <ExperienceForm
              formData={formData}
              editId={editId}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
            />
          </div>

          {/* ── LIST PANEL ── */}
          <div className="experience__list-col">
            {/* meta row */}
            <div className="experience__meta">
              <span className="experience__count">
                Total:{' '}
                <strong className="font-display experience__count-num">
                  {data.length}
                </strong>{' '}
                pengalaman
              </span>
              <button
                className="experience__btn-clear"
                onClick={hapusSemua}
              >
                Hapus Semua
              </button>
            </div>

            {/* warning */}
            {data.length > 5 && (
              <div className="experience__full-alert">
                ⚠ Kamu sudah memiliki lebih dari 5 pengalaman — kelas sudah penuh!
              </div>
            )}

            {/* filters */}
            <div className="experience__filters">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`experience__filter-btn ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* list */}
            {filtered.length === 0 ? (
              <div className="experience__empty">
                <span className="experience__empty-big font-display">
                  {activeFilter === 'Semua' ? 'Kosong' : 'Tidak ada'}
                </span>
                <p>
                  {activeFilter === 'Semua'
                    ? 'Tambahkan pengalaman pertamamu melalui form di sebelah kiri'
                    : `Belum ada pengalaman kategori "${activeFilter}"`}
                </p>
              </div>
            ) : (
              <div className="experience__list">
                {filtered.map(item => (
                  <ExperienceCard
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}

export default Experience