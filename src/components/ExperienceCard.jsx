import './ExperienceCard.css'

function ExperienceCard({ item, onEdit, onDelete }) {
  return (
    <div className="exp-card slide-up">
      <div className="exp-card__body">
        <div className="exp-card__top">
          <h4 className="exp-card__title font-display">{item.title}</h4>
          <span className={`badge rounded-pill exp-card__badge badge-${item.category}`}>
            {item.category}
          </span>
        </div>
        <p className="exp-card__org">{item.organization}</p>
        <p className="exp-card__year">{item.year}</p>
        {item.description && (
          <p className="exp-card__desc">{item.description}</p>
        )}
      </div>
      <div className="exp-card__actions">
        <button className="exp-card__btn-edit" onClick={() => onEdit(item.id)}>
          Edit
        </button>
        <button className="exp-card__btn-del" onClick={() => onDelete(item.id)}>
          Hapus
        </button>
      </div>
    </div>
  )
}

export default ExperienceCard