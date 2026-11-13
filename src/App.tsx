import { FormEvent, ReactNode, useMemo, useState } from "react"

type Page = "home" | "explore" | "create" | "requests" | "profile"
type IconName = "home" | "compass" | "plus" | "users" | "user" | "search" | "bell" | "arrow" | "bookmark" | "heart" | "message" | "clock" | "check" | "x" | "code" | "chevron" | "github" | "external" | "filter" | "spark" | "briefcase" | "edit" | "logout" | "menu"

type Project = {
  id: number
  title: string
  description: string
  category: string
  status: string
  stage: string
  technologies: string[]
  skills: string[]
  spots: number
  members: string[]
  owner: string
  initials: string
  period: string
  accent: string
  likes: number
  comments: number
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "PetCare Hub",
    description:
      "Uma plataforma completa para conectar tutores, clínicas e serviços pet em um só lugar.",
    category: "Web",
    status: "Buscando colaboradores",
    stage: "Em desenvolvimento",
    technologies: ["React", "Node.js", "PostgreSQL"],
    skills: ["UI/UX Design", "Backend", "Testes"],
    spots: 3,
    members: ["LM", "AC", "RS"],
    owner: "Lucas Martins",
    initials: "LM",
    period: "6º período",
    accent: "blue",
    likes: 24,
    comments: 8,
    featured: true,
  },
  {
    id: 2,
    title: "EcoTrack",
    description:
      "Aplicativo para mapear pontos de coleta seletiva e incentivar hábitos sustentáveis na comunidade.",
    category: "Mobile",
    status: "Ideia aberta",
    stage: "Planejamento",
    technologies: ["Flutter", "Firebase", "Maps API"],
    skills: ["Mobile", "Design", "Geolocalização"],
    spots: 2,
    members: ["BI", "JP"],
    owner: "Beatriz Inácio",
    initials: "BI",
    period: "4º período",
    accent: "green",
    likes: 31,
    comments: 12,
  },
  {
    id: 3,
    title: "StudyFlow",
    description:
      "Assistente inteligente que organiza rotinas de estudo e cria trilhas personalizadas para universitários.",
    category: "Inteligência Artificial",
    status: "Buscando colaboradores",
    stage: "MVP",
    technologies: ["Python", "FastAPI", "React"],
    skills: ["Machine Learning", "Frontend"],
    spots: 2,
    members: ["MC", "TS", "AN"],
    owner: "Marina Costa",
    initials: "MC",
    period: "8º período",
    accent: "violet",
    likes: 46,
    comments: 15,
    featured: true,
  },
  {
    id: 4,
    title: "Campus Fácil",
    description:
      "Mapa colaborativo do campus com salas, laboratórios, eventos e rotas acessíveis.",
    category: "Web",
    status: "Equipe quase completa",
    stage: "Prototipação",
    technologies: ["TypeScript", "Next.js", "Figma"],
    skills: ["Frontend", "Acessibilidade"],
    spots: 1,
    members: ["RL", "CS", "GM"],
    owner: "Rafael Lima",
    initials: "RL",
    period: "5º período",
    accent: "orange",
    likes: 18,
    comments: 6,
  },
  {
    id: 5,
    title: "Finanças na Prática",
    description:
      "Dashboard simples para ajudar estudantes a organizar despesas e criar metas financeiras.",
    category: "Fintech",
    status: "Ideia aberta",
    stage: "Descoberta",
    technologies: ["Vue.js", "Supabase"],
    skills: ["Pesquisa", "Frontend", "Dados"],
    spots: 3,
    members: ["GA"],
    owner: "Gabriel Alves",
    initials: "GA",
    period: "3º período",
    accent: "cyan",
    likes: 12,
    comments: 4,
  },
  {
    id: 6,
    title: "SafeRoute",
    description:
      "Rotas urbanas colaborativas com alertas de segurança em tempo real para pedestres.",
    category: "Mobile",
    status: "Buscando colaboradores",
    stage: "MVP",
    technologies: ["React Native", "Node.js", "Socket.io"],
    skills: ["Mobile", "Backend", "Segurança"],
    spots: 2,
    members: ["CL", "DP"],
    owner: "Camila Leite",
    initials: "CL",
    period: "7º período",
    accent: "rose",
    likes: 37,
    comments: 9,
  },
]

const iconPaths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  message: (
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  x: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  code: (
    <>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6 .08-1.5-.47-3-1.5-4 .28-1.2.28-2.5 0-3.5 0 0-1.1-.4-3.5 1.5a12.3 12.3 0 0 0-6 0C6.6.6 5.5 1 5.5 1c-.28 1-.28 2.3 0 3.5a5.7 5.7 0 0 0-1.5 4c0 4.5 3 6 6 6a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </>
  ),
  external: (
    <>
      <path d="M14 3h7v7M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </>
  ),
  filter: <path d="M4 5h16M7 12h10M10 19h4" />,
  spark: (
    <>
      <path d="m12 3-1.4 3.6L7 8l3.6 1.4L12 13l1.4-3.6L17 8l-3.6-1.4L12 3Z" />
      <path d="m19 15-.8 2.2L16 18l2.2.8L19 21l.8-2.2L22 18l-2.2-.8L19 15ZM5 13l-.8 2.2L2 16l2.2.8L5 19l.8-2.2L8 16l-2.2-.8L5 13Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
}

function Icon({
  name,
  size = 20,
  fill = false,
}: {
  name: IconName
  size?: number
  fill?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo" aria-label="FAFIC Connect">
      <span className="logo-mark">
        <span />
        <span />
        <span />
      </span>
      {!compact && (
        <span className="logo-type">
          FAFIC <strong>connect</strong>
        </span>
      )}
    </div>
  )
}

const navItems: { page: Page label: string icon: IconName }[] = [
  { page: "home", label: "Início", icon: "home" },
  { page: "explore", label: "Explorar", icon: "compass" },
  { page: "create", label: "Novo projeto", icon: "plus" },
  { page: "requests", label: "Solicitações", icon: "users" },
  { page: "profile", label: "Meu perfil", icon: "user" },
]

function AppShell({
  page,
  setPage,
  children,
  onLogout,
}: {
  page: Page
  setPage: (page: Page) => void
  children: ReactNode
  onLogout: () => void
}) {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Fechar menu"
          >
            <Icon name="x" />
          </button>
        </div>
        <nav className="main-nav" aria-label="Navegação principal">
          <p className="nav-label">MENU</p>
          {navItems.map((item) => (
            <button
              key={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => {
                setPage(item.page)
                setMobileMenu(false)
              }}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.page === "requests" && <small>3</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <div className="mini-orbit">
            <Icon name="spark" size={19} />
          </div>
          <strong>Transforme ideias em projetos.</strong>
          <p>Publique sua ideia e encontre a equipe ideal.</p>
          <button onClick={() => setPage("create")}>
            Criar projeto <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="sidebar-user">
          <div className="avatar avatar-blue">AM</div>
          <div>
            <strong>André Moreira</strong>
            <span>5º período</span>
          </div>
          <button onClick={onLogout} title="Sair">
            <Icon name="logout" size={18} />
          </button>
        </div>
      </aside>
      {mobileMenu && (
        <button
          className="menu-overlay"
          onClick={() => setMobileMenu(false)}
          aria-label="Fechar menu"
        />
      )}
      <div className="content-shell">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Abrir menu"
          >
            <Icon name="menu" />
          </button>
          <div className="top-search">
            <Icon name="search" size={19} />
            <input placeholder="Buscar projetos, tecnologias ou pessoas..." />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Notificações">
              <Icon name="bell" size={20} />
              <i />
            </button>
            <button className="top-profile" onClick={() => setPage("profile")}>
              <span className="avatar avatar-blue">AM</span>
              <span className="profile-name">André</span>
              <span className="down">⌄</span>
            </button>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <nav className="bottom-nav" aria-label="Navegação móvel">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => setPage(item.page)}
            >
              <Icon name={item.icon} size={20} />
              <span>
                {item.label === "Novo projeto" ? "Criar" : item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function AvatarStack({ members }: { members: string[] }) {
  return (
    <div className="avatar-stack">
      {members.map((member, index) => (
        <span key={member} style={{ zIndex: members.length - index }}>
          {member}
        </span>
      ))}
    </div>
  )
}

function ProjectVisual({
  project,
  large = false,
}: {
  project: Project
  large?: boolean
}) {
  return (
    <div className={`project-visual ${project.accent} ${large ? "large" : ""}`}>
      <div className="visual-grid" />
      <span className="visual-code">&lt;/&gt;</span>
      <span className="visual-orbit orbit-one" />
      <span className="visual-orbit orbit-two" />
      <div className="visual-window">
        <i />
        <i />
        <i />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="project-card">
      <ProjectVisual project={project} />
      <button
        className={`save-button ${saved ? "saved" : ""}`}
        onClick={() => setSaved(!saved)}
        aria-label={saved ? "Remover dos salvos" : "Salvar projeto"}
      >
        <Icon name="bookmark" size={18} fill={saved} />
      </button>
      <div className="project-card-body">
        <div className="project-card-top">
          <span className="category-pill">{project.category}</span>
          <span className="status-dot">
            <i />
            {project.status}
          </span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-row">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-meta">
          <div className="owner">
            <span className={`avatar avatar-${project.accent}`}>
              {project.initials}
            </span>
            <span>
              por <strong>{project.owner}</strong>
            </span>
          </div>
          <span className="spots">
            <Icon name="users" size={16} /> {project.spots} vagas
          </span>
        </div>
        <button className="text-link" onClick={() => onOpen(project)}>
          Ver detalhes <Icon name="arrow" size={16} />
        </button>
      </div>
    </article>
  )
}

function Home({
  setPage,
  openProject,
}: {
  setPage: (page: Page) => void
  openProject: (project: Project) => void
}) {
  return (
    <div className="page">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">QUARTA-FEIRA, 12 DE JUNHO</p>
          <h1>
            Olá, André! <span>Pronto para criar?</span>
          </h1>
          <p>
            Descubra ideias, conecte-se com talentos e construa algo incrível.
          </p>
        </div>
        <button className="primary-button" onClick={() => setPage("create")}>
          <Icon name="plus" size={18} /> Publicar projeto
        </button>
      </section>

      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-tag">
            <Icon name="spark" size={15} /> CONEXÕES QUE TRANSFORMAM
          </span>
          <h2>
            Sua próxima grande ideia começa <em>aqui.</em>
          </h2>
          <p>
            Encontre estudantes com habilidades complementares e tire seu
            projeto do papel.
          </p>
          <button onClick={() => setPage("explore")}>
            Explorar projetos <Icon name="arrow" size={17} />
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-a">
            <span />
          </div>
          <div className="hero-orbit orbit-b">
            <span />
          </div>
          <div className="hero-core">
            <Icon name="code" size={36} />
          </div>
          <div className="floating-card fc-one">
            <Icon name="user" size={16} />
            <span />
          </div>
          <div className="floating-card fc-two">
            <Icon name="check" size={16} />
            <span />
          </div>
          <div className="floating-card fc-three">
            <Icon name="spark" size={16} />
          </div>
        </div>
      </section>

      <section className="stats-row">
        <div>
          <span className="stat-icon violet">
            <Icon name="briefcase" />
          </span>
          <p>
            <strong>48</strong>
            <span>Projetos ativos</span>
          </p>
          <small>+6 esta semana</small>
        </div>
        <div>
          <span className="stat-icon blue">
            <Icon name="users" />
          </span>
          <p>
            <strong>126</strong>
            <span>Estudantes</span>
          </p>
          <small>+12 este mês</small>
        </div>
        <div>
          <span className="stat-icon green">
            <Icon name="check" />
          </span>
          <p>
            <strong>32</strong>
            <span>Equipes formadas</span>
          </p>
          <small>Impacto real</small>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EM DESTAQUE</span>
            <h2>Projetos que estão movimentando o campus</h2>
          </div>
          <button onClick={() => setPage("explore")}>
            Ver todos <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={openProject}
            />
          ))}
        </div>
      </section>

      <section className="opportunities">
        <div className="section-heading">
          <div>
            <span className="eyebrow">COMBINA COM VOCÊ</span>
            <h2>Oportunidades para suas habilidades</h2>
          </div>
        </div>
        <div className="opportunity-list">
          {[
            [
              "Campus Fácil",
              "Frontend • Acessibilidade",
              "TypeScript",
              "RL",
              "orange",
            ],
            ["SafeRoute", "Mobile • Segurança", "React Native", "CL", "rose"],
            ["Finanças na Prática", "Pesquisa • Dados", "Vue.js", "GA", "cyan"],
          ].map(([title, skills, tech, initials, accent], index) => (
            <button
              key={title}
              onClick={() => openProject(projects[index + 3])}
            >
              <span className={`opportunity-icon ${accent}`}>
                <Icon
                  name={
                    index === 1 ? "compass" : index === 2 ? "briefcase" : "code"
                  }
                />
              </span>
              <span className="opportunity-copy">
                <strong>{title}</strong>
                <small>{skills}</small>
              </span>
              <span className="mini-tech">{tech}</span>
              <span className={`avatar avatar-${accent}`}>{initials}</span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function Explore({ openProject }: { openProject: (project: Project) => void }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todos")
  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesQuery =
          `${project.title} ${project.description} ${project.technologies.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase())
        return (
          matchesQuery &&
          (category === "Todos" || project.category === category)
        )
      }),
    [query, category],
  )
  return (
    <div className="page">
      <section className="page-title">
        <div>
          <span className="eyebrow">DESCUBRA E COLABORE</span>
          <h1>Explore projetos</h1>
          <p>Encontre uma ideia que combina com você e faça parte dela.</p>
        </div>
      </section>
      <div className="explore-search">
        <div>
          <Icon name="search" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque por nome, tecnologia ou habilidade..."
          />
        </div>
        <button>
          <Icon name="filter" size={18} /> Mais filtros
        </button>
      </div>
      <div className="filter-tabs">
        {["Todos", "Web", "Mobile", "Inteligência Artificial", "Fintech"].map(
          (item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <div className="results-bar">
        <strong>{filtered.length} projetos encontrados</strong>
        <label>
          Ordenar por:{" "}
          <select>
            <option>Mais recentes</option>
            <option>Mais populares</option>
          </select>
        </label>
      </div>
      {filtered.length > 0 ? (
        <div className="project-grid explore-grid">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={openProject}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={28} />
          <h3>Nenhum projeto encontrado</h3>
          <p>Tente buscar por outro termo ou categoria.</p>
        </div>
      )}
    </div>
  )
}

function CreateProject({ onCreated }: { onCreated: () => void }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (step < 3) setStep(step + 1)
    else setSubmitted(true)
  }
  if (submitted) {
    return (
      <div className="success-state">
        <span>
          <Icon name="check" size={34} />
        </span>
        <p className="eyebrow">PROJETO PUBLICADO</p>
        <h1>Sua ideia já está no ar!</h1>
        <p>
          Agora outros estudantes podem conhecer o projeto e demonstrar
          interesse em colaborar.
        </p>
        <button className="primary-button" onClick={onCreated}>
          Ver meus projetos <Icon name="arrow" size={17} />
        </button>
      </div>
    )
  }
  return (
    <div className="page form-page">
      <section className="page-title">
        <div>
          <span className="eyebrow">COMPARTILHE SUA IDEIA</span>
          <h1>Publique um novo projeto</h1>
          <p>Conte à comunidade o que você quer construir e quem procura.</p>
        </div>
      </section>
      <div className="stepper">
        {["Informações", "Tecnologias", "Equipe"].map((label, index) => (
          <div key={label} className={step >= index + 1 ? "active" : ""}>
            <span>
              {step > index + 1 ? <Icon name="check" size={15} /> : index + 1}
            </span>
            <p>
              <strong>{label}</strong>
              <small>
                {index === 0
                  ? "Sobre sua ideia"
                  : index === 1
                    ? "Stack e estágio"
                    : "Perfis desejados"}
              </small>
            </p>
          </div>
        ))}
      </div>
      <form className="project-form" onSubmit={submit}>
        {step === 1 && (
          <>
            <div className="form-section-heading">
              <span>
                <Icon name="briefcase" />
              </span>
              <div>
                <h2>Vamos começar pelo essencial</h2>
                <p>
                  Essas informações ajudam as pessoas a entenderem sua ideia.
                </p>
              </div>
            </div>
            <label>
              Nome do projeto{" "}
              <input
                required
                placeholder="Ex.: Plataforma de apoio aos estudos"
              />
            </label>
            <div className="two-col">
              <label>
                Categoria{" "}
                <select required defaultValue="">
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  <option>Desenvolvimento Web</option>
                  <option>Aplicativo Mobile</option>
                  <option>Inteligência Artificial</option>
                  <option>Jogos</option>
                </select>
              </label>
              <label>
                Estágio atual{" "}
                <select required defaultValue="">
                  <option value="" disabled>
                    Selecione o estágio
                  </option>
                  <option>Apenas uma ideia</option>
                  <option>Planejamento</option>
                  <option>Prototipação</option>
                  <option>Em desenvolvimento</option>
                </select>
              </label>
            </div>
            <label>
              Descrição do projeto{" "}
              <textarea
                required
                placeholder="Explique o problema, sua proposta de solução e o impacto que espera gerar..."
                maxLength={600}
              />
              <small className="counter">0 / 600</small>
            </label>
            <label>
              Qual é o principal objetivo?{" "}
              <input
                required
                placeholder="Ex.: Facilitar o acesso a materiais de estudo"
              />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <div className="form-section-heading">
              <span>
                <Icon name="code" />
              </span>
              <div>
                <h2>Como o projeto será construído?</h2>
                <p>
                  Não se preocupe se a stack ainda não estiver totalmente
                  definida.
                </p>
              </div>
            </div>
            <label>
              Tecnologias planejadas{" "}
              <input required placeholder="Ex.: React, TypeScript, Node.js" />
              <small>Separe as tecnologias por vírgulas.</small>
            </label>
            <label>
              Link do repositório{" "}
              <div className="input-icon">
                <Icon name="github" size={18} />
                <input placeholder="github.com/usuario/projeto (opcional)" />
              </div>
            </label>
            <div className="choice-grid">
              {["Web", "Mobile", "Desktop", "Multiplataforma"].map(
                (item, index) => (
                  <label className="choice-card" key={item}>
                    <input
                      type="radio"
                      name="platform"
                      defaultChecked={index === 0}
                    />
                    <span>
                      <Icon name={index === 1 ? "compass" : "code"} />
                      <strong>{item}</strong>
                    </span>
                  </label>
                ),
              )}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="form-section-heading">
              <span>
                <Icon name="users" />
              </span>
              <div>
                <h2>Quem você quer na equipe?</h2>
                <p>Defina os perfis que podem ajudar o projeto a avançar.</p>
              </div>
            </div>
            <label>
              Habilidades procuradas{" "}
              <input
                required
                placeholder="Ex.: UI/UX Design, Backend, Testes"
              />
            </label>
            <div className="two-col">
              <label>
                Número de vagas{" "}
                <select defaultValue="2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </label>
              <label>
                Nível de experiência{" "}
                <select>
                  <option>Todos os níveis</option>
                  <option>Iniciante</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </label>
            </div>
            <label>
              Mensagem para futuros colaboradores{" "}
              <textarea placeholder="Conte como será a dinâmica da equipe e o que espera construir em conjunto..." />
            </label>
          </>
        )}
        <div className="form-actions">
          {step > 1 ? (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setStep(step - 1)}
            >
              Voltar
            </button>
          ) : (
            <span />
          )}
          <button className="primary-button" type="submit">
            {step === 3 ? "Publicar projeto" : "Continuar"}{" "}
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </form>
    </div>
  )
}

const initialRequests = [
  {
    id: 1,
    name: "Mariana Souza",
    initials: "MS",
    period: "6º período",
    project: "PetCare Hub",
    skills: ["UI/UX", "Figma", "Design System"],
    message:
      "Adorei a proposta! Tenho experiência criando interfaces acessíveis e gostaria de contribuir com toda a experiência do usuário.",
    time: "Há 2 horas",
    accent: "violet",
    status: "pending",
  },
  {
    id: 2,
    name: "Pedro Henrique",
    initials: "PH",
    period: "4º período",
    project: "PetCare Hub",
    skills: ["Node.js", "PostgreSQL", "APIs"],
    message:
      "Posso ajudar na arquitetura do backend e na modelagem do banco. Já desenvolvi uma API parecida em outro projeto.",
    time: "Ontem",
    accent: "blue",
    status: "pending",
  },
  {
    id: 3,
    name: "Ana Luiza",
    initials: "AL",
    period: "7º período",
    project: "StudyFlow",
    skills: ["Python", "Machine Learning"],
    message:
      "Tenho muito interesse em IA aplicada à educação. Seria ótimo colaborar nos modelos de recomendação.",
    time: "Há 3 dias",
    accent: "green",
    status: "pending",
  },
]

function Requests() {
  const [requests, setRequests] = useState(initialRequests)
  const update = (id: number, status: string) =>
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    )
  return (
    <div className="page">
      <section className="page-title">
        <div>
          <span className="eyebrow">FORME SUA EQUIPE</span>
          <h1>Solicitações recebidas</h1>
          <p>Conheça quem quer colaborar com seus projetos.</p>
        </div>
        <span className="request-count">3 pendentes</span>
      </section>
      <div className="request-tabs">
        <button className="active">
          Pendentes <span>3</span>
        </button>
        <button>Aceitas</button>
        <button>Recusadas</button>
      </div>
      <div className="requests-list">
        {requests.map((request) => (
          <article
            className={`request-card ${
              request.status !== "pending" ? request.status : ""
            }`}
            key={request.id}
          >
            <span className={`avatar avatar-${request.accent}`}>
              {request.initials}
            </span>
            <div className="request-main">
              <div className="request-head">
                <div>
                  <h3>{request.name}</h3>
                  <span>
                    {request.period} • Quer participar de{" "}
                    <strong>{request.project}</strong>
                  </span>
                </div>
                <small>
                  <Icon name="clock" size={14} /> {request.time}
                </small>
              </div>
              <p className="request-message">“{request.message}”</p>
              <div className="skill-row">
                {request.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            {request.status === "pending" ? (
              <div className="request-actions">
                <button onClick={() => update(request.id, "rejected")}>
                  <Icon name="x" size={17} /> Recusar
                </button>
                <button onClick={() => update(request.id, "accepted")}>
                  <Icon name="check" size={17} /> Aceitar
                </button>
              </div>
            ) : (
              <div className={`decision ${request.status}`}>
                <Icon name={request.status === "accepted" ? "check" : "x"} />{" "}
                {request.status === "accepted" ? "Aceita" : "Recusada"}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function Profile({ openProject }: { openProject: (project: Project) => void }) {
  const [editing, setEditing] = useState(false)
  return (
    <div className="page">
      <section className="profile-hero">
        <div className="profile-pattern" />
        <div className="profile-info">
          <span className="profile-avatar">AM</span>
          <div>
            <span className="available">
              <i /> Disponível para colaborar
            </span>
            <h1>André Moreira</h1>
            <p>Estudante de Ciência da Computação • 5º período</p>
            <div className="profile-links">
              <span>
                <Icon name="github" size={16} /> andremoreira
              </span>
              <span>
                <Icon name="external" size={15} /> andre.dev
              </span>
            </div>
          </div>
          <button
            className="secondary-button"
            onClick={() => setEditing(!editing)}
          >
            <Icon name="edit" size={17} />{" "}
            {editing ? "Concluir edição" : "Editar perfil"}
          </button>
        </div>
      </section>
      <div className="profile-layout">
        <div className="profile-main">
          <section className="content-card">
            <div className="card-heading">
              <h2>Sobre mim</h2>
            </div>
            {editing ? (
              <textarea
                className="edit-bio"
                defaultValue="Desenvolvedor front-end apaixonado por criar experiências digitais simples e acessíveis. Gosto de transformar problemas reais em soluções que fazem diferença na vida das pessoas."
              />
            ) : (
              <p>
                Desenvolvedor front-end apaixonado por criar experiências
                digitais simples e acessíveis. Gosto de transformar problemas
                reais em soluções que fazem diferença na vida das pessoas.
              </p>
            )}
          </section>
          <section className="content-card">
            <div className="card-heading">
              <div>
                <span className="eyebrow">PORTFÓLIO ACADÊMICO</span>
                <h2>Meus projetos</h2>
              </div>
              <button>Ver todos</button>
            </div>
            <div className="profile-projects">
              {projects.slice(0, 2).map((project) => (
                <button key={project.id} onClick={() => openProject(project)}>
                  <ProjectVisual project={project} />
                  <span>
                    <strong>{project.title}</strong>
                    <small>
                      {project.stage} • {project.members.length} membros
                    </small>
                  </span>
                  <Icon name="chevron" size={18} />
                </button>
              ))}
            </div>
          </section>
        </div>
        <aside className="profile-side">
          <section className="content-card">
            <div className="card-heading">
              <h2>Habilidades</h2>
            </div>
            <div className="skill-cloud">
              {[
                "React",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Git",
                "Figma",
                "Node.js",
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
          <section className="content-card profile-numbers">
            <div>
              <strong>2</strong>
              <span>Projetos</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Colaborações</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Conexões</span>
            </div>
          </section>
          <section className="content-card interests">
            <div className="card-heading">
              <h2>Interesses</h2>
            </div>
            <p>
              <Icon name="code" size={17} /> Desenvolvimento web
            </p>
            <p>
              <Icon name="spark" size={17} /> Design de produto
            </p>
            <p>
              <Icon name="users" size={17} /> Projetos de impacto social
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [interest, setInterest] = useState(false)
  const [sent, setSent] = useState(false)
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="project-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <Icon name="x" />
        </button>
        <ProjectVisual project={project} large />
        <div className="modal-content">
          <div className="modal-title-row">
            <div>
              <span className="category-pill">{project.category}</span>
              <h1>{project.title}</h1>
              <p className="modal-owner">
                <span className={`avatar avatar-${project.accent}`}>
                  {project.initials}
                </span>{" "}
                Criado por <strong>{project.owner}</strong> • {project.period}
              </p>
            </div>
            <button className="save-outline">
              <Icon name="bookmark" />
            </button>
          </div>
          <div className="modal-layout">
            <div>
              <section>
                <h3>Sobre o projeto</h3>
                <p>
                  {project.description} O objetivo é desenvolver uma solução
                  intuitiva, acessível e construída de forma colaborativa por
                  estudantes com diferentes experiências.
                </p>
              </section>
              <section>
                <h3>Tecnologias</h3>
                <div className="tech-row large">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </section>
              <section>
                <h3>Quem estamos procurando</h3>
                <div className="skill-row">
                  {project.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            </div>
            <aside className="join-card">
              <span className="join-icon">
                <Icon name="users" />
              </span>
              <h3>Faça parte desta ideia</h3>
              <p>
                Este projeto tem <strong>{project.spots} vagas abertas</strong>{" "}
                para novos colaboradores.
              </p>
              <div className="team-preview">
                <AvatarStack members={project.members} />
                <span>{project.members.length} pessoas na equipe</span>
              </div>
              <button
                className="primary-button"
                onClick={() => setInterest(true)}
              >
                Quero participar <Icon name="arrow" size={17} />
              </button>
              <small>
                <Icon name="clock" size={14} /> Resposta média em até 2 dias
              </small>
            </aside>
          </div>
          <div className="modal-social">
            <span>
              <Icon name="heart" size={18} /> {project.likes} curtidas
            </span>
            <span>
              <Icon name="message" size={18} /> {project.comments} comentários
            </span>
          </div>
        </div>
      </div>
      {interest && (
        <div className="interest-dialog">
          <button onClick={() => setInterest(false)}>
            <Icon name="x" />
          </button>
          {!sent ? (
            <>
              <span className="join-icon">
                <Icon name="spark" />
              </span>
              <h2>Que ótimo ter você por aqui!</h2>
              <p>
                Conte para {project.owner.split(" ")[0]} como você gostaria de
                contribuir com <strong>{project.title}</strong>.
              </p>
              <textarea placeholder="Escreva uma breve apresentação e fale sobre suas habilidades..." />
              <button className="primary-button" onClick={() => setSent(true)}>
                Enviar interesse <Icon name="arrow" size={17} />
              </button>
            </>
          ) : (
            <>
              <span className="join-icon success">
                <Icon name="check" />
              </span>
              <h2>Interesse enviado!</h2>
              <p>
                Sua mensagem foi enviada. Você poderá acompanhar a resposta na
                área de solicitações.
              </p>
              <button className="primary-button" onClick={onClose}>
                Concluir
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [signup, setSignup] = useState(false)
  return (
    <div className="login-page">
      <div className="login-brand">
        <Logo />
        <div className="login-message">
          <span className="hero-tag">
            <Icon name="spark" size={15} /> COMUNIDADE ACADÊMICA
          </span>
          <h1>
            Ideias ganham força quando <em>encontram pessoas.</em>
          </h1>
          <p>
            O espaço dos estudantes de Ciência da Computação da FAFIC para
            criar, compartilhar e colaborar.
          </p>
        </div>
        <div className="login-network" aria-hidden="true">
          <span className="network-core">
            <Icon name="code" size={29} />
          </span>
          <i />
          <i />
          <i />
          <b />
          <b />
          <b />
        </div>
        <small>FAFIC Connect • Feito por estudantes, para estudantes.</small>
      </div>
      <div className="login-panel">
        <div className="mobile-logo">
          <Logo />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onLogin()
          }}
        >
          <span className="eyebrow">
            {signup ? "FAÇA PARTE" : "BEM-VINDO DE VOLTA"}
          </span>
          <h2>{signup ? "Crie sua conta" : "Entre na sua conta"}</h2>
          <p>
            {signup
              ? "Comece a transformar ideias em projetos reais."
              : "Continue construindo conexões e projetos incríveis."}
          </p>
          {signup && (
            <label>
              Nome completo
              <input required placeholder="Como podemos chamar você?" />
            </label>
          )}
          <label>
            E-mail acadêmico
            <input
              required
              type="email"
              placeholder="seunome@fafic.edu.br"
              defaultValue={signup ? "" : "andre@fafic.edu.br"}
            />
          </label>
          <label>
            Senha
            <div className="password">
              <input
                required
                type="password"
                placeholder="Sua senha"
                defaultValue={signup ? "" : "12345678"}
              />
              <button type="button">Exibir</button>
            </div>
          </label>
          {signup && (
            <label>
              Período do curso
              <select required defaultValue="">
                <option value="" disabled>
                  Selecione seu período
                </option>
                <option>1º período</option>
                <option>2º período</option>
                <option>3º período</option>
                <option>4º período</option>
                <option>5º período</option>
              </select>
            </label>
          )}
          {!signup && (
            <div className="remember">
              <label>
                <input type="checkbox" defaultChecked /> Lembrar de mim
              </label>
              <button type="button">Esqueci minha senha</button>
            </div>
          )}
          <button className="login-submit" type="submit">
            {signup ? "Criar minha conta" : "Entrar na plataforma"}{" "}
            <Icon name="arrow" size={18} />
          </button>
          <div className="login-switch">
            {signup ? "Já possui uma conta?" : "Ainda não faz parte?"}{" "}
            <button type="button" onClick={() => setSignup(!signup)}>
              {signup ? "Entrar" : "Criar conta"}
            </button>
          </div>
          <small className="demo-hint">
            Protótipo visual: use os dados preenchidos para acessar.
          </small>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loggedIn, setLoggedIn] = useState(true)

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <AppShell page={page} setPage={setPage} onLogout={() => setLoggedIn(false)}>
      {page === "home" && (
        <Home setPage={setPage} openProject={setSelectedProject} />
      )}
      {page === "explore" && <Explore openProject={setSelectedProject} />}
      {page === "create" && (
        <CreateProject onCreated={() => setPage("profile")} />
      )}
      {page === "requests" && <Requests />}
      {page === "profile" && <Profile openProject={setSelectedProject} />}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </AppShell>
  )
}
