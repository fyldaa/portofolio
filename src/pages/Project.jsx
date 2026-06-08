import { useState, useEffect } from 'react'
import './Project.css'

const STORAGE_KEY = 'pf_projects'

const EMPTY_FORM = {
  title: '',
  category: 'Web App',
  tech: '',
  desc: '',
  link: '',
  year: '',
}

const CATEGORIES = ['Web App', 'UI Design', 'Freelance', 'Lomba', 'Lainnya']

// Warna aksen per kategori
const CAT_COLOR = {
  'Web App':   'var(--blush-dark)',
  'UI Design': '#b29dca',
  'Freelance': 'var(--cream-dark)',
  'Lomba':     '#8ecfc4',
  'Lainnya':   'var(--brown-muted)',
}

function Project() {
  const [projects, setProjects]   = useState([])
  const [formData, setFormData]   = useState(EMPTY_FORM)
  const [editId, setEditId]       = useState(null)
  const [showForm, setShowForm]   = useState(false)
  const [activeFilter, setActiveFilter] = useState('Semua')

  // Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setProjects(JSON.parse(saved))
  }, [])

  // Simpan ke localStorage setiap berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!formData.title.trim() || !formData.desc.trim()) {
      alert('Judul dan deskripsi wajib diisi!')
      return
    }
    if (editId !== null) {
      setProjects(projects.map(p => p.id === editId ? { ...p, ...formData } : p))
      setEditId(null)
    } else {
      setProjects([...projects, { id: Date.now(), ...formData }])
    }
    setFormData(EMPTY_FORM)
    setShowForm(false)
  }

  function handleEdit(id) {
    const item = projects.find(p => p.id === id)
    if (!item) return
    setFormData({
      title:    item.title,
      category: item.category,
      tech:     item.tech,
      desc:     item.desc,
      link:     item.link,
      year:     item.year,
    })
    setEditId(id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if (window.confirm('Hapus project ini?'))
      setProjects(projects.filter(p => p.id !== id))
  }

  function handleCancel() {
    setFormData(EMPTY_FORM)
    setEditId(null)
    setShowForm(false)
  }

  const FILTERS = ['Semua', ...CATEGORIES]
  const filtered = activeFilter === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <main className="proj page-enter">
      <div className="proj__inner">

        {/* ── HEADER ── */}
        <div className="proj__header">
          <div className="proj__header-left">
            <span className="section-eyebrow">Portfolio · Projects</span>
            <h2 className="section-title-display">
              Karya<br /><em>Saya</em>
            </h2>
          </div>
          <button
            className="proj__btn-add"
            onClick={() => { setShowForm(!showForm); setEditId(null); setFormData(EMPTY_FORM) }}
          >
            {showForm ? '✕ Tutup' : '+ Tambah Project'}
          </button>
        </div>

        {/* ── FORM (collapsible) ── */}
        {showForm && (
          <div className="proj__form-wrap slide-up">
            <div className="proj__form-panel">
              <h3 className="proj__form-title font-display">
                {editId !== null ? 'Edit Project' : 'Tambah Project Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="proj__form-grid">
                <div className="proj__fg">
                  <label>Nama Project</label>
                  <input name="title" value={formData.title} onChange={handleChange} placeholder="cth. Portfolio Website" />
                </div>
                <div className="proj__fg">
                  <label>Kategori</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="proj__fg">
                  <label>Teknologi yang Digunakan</label>
                  <input name="tech" value={formData.tech} onChange={handleChange} placeholder="cth. React, Vite, Bootstrap" />
                </div>
                <div className="proj__fg">
                  <label>Tahun</label>
                  <input name="year" value={formData.year} onChange={handleChange} placeholder="cth. 2024" />
                </div>
                <div className="proj__fg proj__fg--full">
                  <label>Deskripsi</label>
                  <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Ceritakan projectmu..." rows={3} />
                </div>
                <div className="proj__fg proj__fg--full">
                  <label>Link Project (opsional)</label>
                  <input name="link" value={formData.link} onChange={handleChange} placeholder="cth. https://namaku.netlify.app" />
                </div>
                <div className="proj__form-actions">
                  <button type="submit" className="proj__btn-submit">
                    {editId !== null ? '✓ Update Project' : '+ Simpan Project'}
                  </button>
                  <button type="button" className="proj__btn-cancel" onClick={handleCancel}>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── FILTER ── */}
        <div className="proj__filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`proj__filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
          <span className="proj__filter-count">
            {filtered.length} project
          </span>
        </div>

        {/* ── PROJECT GRID ── */}
        {filtered.length === 0 ? (
          <div className="proj__empty">
            <span className="proj__empty-big font-display">
              {projects.length === 0 ? 'Kosong' : 'Tidak ada'}
            </span>
            <p>
              {projects.length === 0
                ? 'Klik "+ Tambah Project" untuk menambahkan karya pertamamu'
                : `Belum ada project kategori "${activeFilter}"`}
            </p>
          </div>
        ) : (
          <div className="proj__grid">
            {filtered.map((p, i) => (
              <div className="proj__card slide-up" key={p.id} style={{ '--accent': CAT_COLOR[p.category] || 'var(--blush-dark)' }}>
                {/* nomor */}
                <span className="proj__card-num font-display">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* kategori */}
                <span className="proj__card-cat">{p.category}</span>

                {/* judul */}
                <h3 className="proj__card-title font-display">{p.title}</h3>

                {/* deskripsi */}
                <p className="proj__card-desc">{p.desc}</p>

                {/* tech + year */}
                <div className="proj__card-meta">
                  {p.tech && (
                    <div className="proj__card-tech">
                      {p.tech.split(',').map(t => (
                        <span key={t.trim()} className="proj__tech-pill">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  {p.year && <span className="proj__card-year">{p.year}</span>}
                </div>

                {/* actions */}
                <div className="proj__card-footer">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj__card-link">
                      Lihat Project ↗
                    </a>
                  ) : (
                    <span className="proj__card-no-link">Tidak ada link</span>
                  )}
                  <div className="proj__card-btns">
                    <button onClick={() => handleEdit(p.id)} className="proj__btn-edit">✏</button>
                    <button onClick={() => handleDelete(p.id)} className="proj__btn-del">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default Project