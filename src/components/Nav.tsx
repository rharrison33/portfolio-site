import { useEffect, useState } from "react";
import { profile } from "../content";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-name">
          {profile.name}
        </a>
        <nav className="nav-links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeId === s.id ? "active" : undefined}
            >
              {s.label}
            </a>
          ))}
          <a href={profile.links.resume} className="nav-resume" target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
