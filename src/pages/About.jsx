import './About.css'
import photo from './photo.jpeg'

function About() {
  const contacts = [
    {
      icon: '✉',
      label: 'Email',
      value: 'fyldaa164@email.com',
      href: 'mailto:fyldaa@email.com',
    },
    {
      icon: '◈',
      label: 'GitHub',
      value: 'github.com/fyldaa',
      href: 'https://github.com/fyldaa',
    },
    {
      icon: '⊹',
      label: 'Instagram',
      value: '@nzzfyaa',
      href: 'https://instagram.com/nzzfyaa',
    },
  ]

 const skills = [
  'HTML & CSS',
  'JavaScript',
  'React + Vite',
  'React Router',
  'MySQL',
  'Local Storage',
  'Deployment',
]

  const stack = ['VS Code', 'npm', 'Git', 'Vite', 'Bootstrap']

  return (
    <main className="about page-enter">

      <section className="about__profile">
        <div className="about__profile-inner">

          <div className="about__visual">
            <div className="about__photo-wrap">
              <img
                src={photo}
                alt="Nurroja Izza Harfylda"
                className="about__photo-img"
              />
              <div className="about__photo-caption font-display">
                Nurroja Izza<br />
                <em>Harfylda</em>
              </div>
            </div>
            <div className="about__accent-box" />
          </div>

          <div className="about__text">
            <span className="section-eyebrow">About Me</span>
            <h2 className="section-title-display">
              Halo,<br /><em>Perkenalkan!</em>
            </h2>
            <p className="about__bio">
              Saya adalah siswi SMK jurusan Rekayasa Perangkat Lunak yang 
              memiliki minat dalam pengembangan web. Portofolio ini berisi 
              berbagai proyek dan hasil pembelajaran yang telah saya kerjakan 
              selama mempelajari teknologi web.
            </p>

            <p className="about__skills-label">Kemampuan Utama</p>
            <div className="about__skills-wrap">
              {skills.map(s => (
                <span key={s} className="about__skill-tag">{s}</span>
              ))}
            </div>

            <p className="about__skills-label">Tools &amp; Stack</p>
            <div className="about__stack-row">
              {stack.map(s => (
                <span key={s} className="about__stack-pill">{s}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="about__contact">
        <div className="about__contact-inner">

          <div className="about__contact-header">
            <span className="section-eyebrow" style={{ color: 'rgba(245,203,215,0.5)' }}>
              Get In Touch
            </span>
            <h2 className="section-title-display" style={{ color: 'var(--cream)', marginBottom: '0' }}>
              Mari<br /><em style={{ color: 'var(--blush)' }}>Terhubung</em>
            </h2>
            <p className="about__contact-sub">
              Terbuka untuk kolaborasi, proyek freelance, atau sekadar ngobrol
              seputar teknologi dan desain.
            </p>
          </div>

          <div className="about__contact-grid">
            {contacts.map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="about__contact-card"
              >
                <span className="about__contact-icon">{c.icon}</span>
                <span className="about__contact-label">{c.label}</span>
                <span className="about__contact-value">{c.value}</span>
                <span className="about__contact-arrow">↗</span>
              </a>
            ))}
          </div>

          <div className="about__contact-cta">
            <a href="mailto:fyldaa164@email.com" className="about__contact-btn">
              Kirim Pesan ✉
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}

export default About