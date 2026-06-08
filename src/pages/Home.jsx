import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const expCount = JSON.parse(localStorage.getItem('pf_experiences') || '[]').length

  return (
    <main className="home page-enter">
      {/* ── HERO ── */}
      <section className="home__hero">
        <div className="home__hero-left">
          <span className="section-eyebrow">Software Engineering</span>
          <h1 className="home__hero-name font-display">
            Nurroja Izza<br />
            <em>Harfylda</em>
          </h1>
          <div className="home__hero-ctas">
            <Link to="/experience" className="home__btn-primary">
              Lihat Pengalaman ↗
            </Link>
            <Link to="/about" className="home__btn-outline">
              Tentang Saya
            </Link>
          </div>
        </div>

        <div className="home__hero-right">
          <div className="home__hero-right-top">
            <p className="home__intro-label section-eyebrow">
              Selamat datang di portfolio
            </p>
            <blockquote className="home__intro-quote font-display">
              Dari sebuah{' '}
              <em>ide sederhana</em>, lahirlah karya yang menjadi bagian dari perjalanan dan perkembangan diri.
            </blockquote>
          </div>

          <div className="home__stats-row">
            <div className="home__stat">
              <span className="home__stat-num font-display">{expCount}</span>
              <span className="home__stat-label">Pengalaman</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-num font-display">6</span>
              <span className="home__stat-label">Praktikum</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-num font-display">1</span>
              <span className="home__stat-label">Deploy Live</span>
            </div>
          </div>

          <div className="home__scroll-hint">
            <span className="home__scroll-dot" />
            <span>Scroll untuk eksplorasi</span>
          </div>
        </div>
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="home__cards">
        <div className="home__cards-grid">
          {[
            {
              to: '/experience',
              label: 'Experience',
              desc: 'CRUD riwayat PKL, Freelance, Lomba, & Ekstra',
              icon: '✦',
              accent: 'var(--blush)',
            },
            {
              to: '/project',
              label: 'Project',
              desc: 'Hasil project yang pernah saya buat',
              icon: '◈',
              accent: 'var(--brown)',
            },
            {
              to: '/about',
              label: 'About',
              desc: 'Profil, skill stack, dan kontak saya',
              icon: '◇',
              accent: 'var(--blush-dark)',
            },
          ].map(card => (
            <Link to={card.to} className="home__nav-card" key={card.to}>
              <span
                className="home__nav-card-icon font-display"
                style={{ color: card.accent }}
              >
                {card.icon}
              </span>
              <h3 className="home__nav-card-title font-display">{card.label}</h3>
              <p className="home__nav-card-desc">{card.desc}</p>
              <span className="home__nav-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home