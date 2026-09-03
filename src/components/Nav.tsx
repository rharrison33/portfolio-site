import { profile } from "../content";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-name">
          {profile.name}
        </a>
        <nav className="nav-links">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
          <a href={profile.links.resume} className="nav-resume">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
