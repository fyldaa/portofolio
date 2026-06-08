import './ExperienceForm.css'

function ExperienceForm({
  formData,
  editId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="exp-form-panel">
      <div className="exp-form-panel__header">
        <h3 className="exp-form-panel__title font-display">
          {editId !== null ? 'Edit Pengalaman' : 'Tambah Baru'}
        </h3>
        <p className="exp-form-panel__sub">
          {editId !== null
            ? 'Ubah data lalu klik Update'
            : 'Isi data pengalamanmu di sini'}
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="exp-form-panel__group">
          <label>Judul / Nama Kegiatan</label>
          <input
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="cth. PKL di PT. Maju Jaya"
          />
        </div>

        <div className="exp-form-panel__group">
          <label>Kategori</label>
          <select name="category" value={formData.category} onChange={onChange}>
            <option>PKL</option>
            <option>Freelance</option>
            <option>Lomba</option>
            <option>Ekstrakurikuler</option>
          </select>
        </div>

        <div className="exp-form-panel__group">
          <label>Organisasi / Instansi</label>
          <input
            name="organization"
            value={formData.organization}
            onChange={onChange}
            placeholder="cth. PT. Maju Jaya"
          />
        </div>

        <div className="exp-form-panel__group">
          <label>Tahun</label>
          <input
            name="year"
            value={formData.year}
            onChange={onChange}
            placeholder="cth. 2024"
          />
        </div>

        <div className="exp-form-panel__group">
          <label>Deskripsi (opsional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Ceritakan pengalamanmu..."
            rows={3}
          />
        </div>

        <button type="submit" className="exp-form-panel__btn-submit">
          {editId !== null ? '✓ Update Pengalaman' : '+ Tambah Pengalaman'}
        </button>

        {editId !== null && (
          <button
            type="button"
            className="exp-form-panel__btn-cancel"
            onClick={onCancel}
          >
            ✕ Batalkan Edit
          </button>
        )}
      </form>
    </div>
  )
}

export default ExperienceForm