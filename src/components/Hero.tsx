import { profile } from "../content";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-content">
        <p className="label">{profile.location || "Software Engineering"}</p>
        <h1>{profile.name}</h1>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-links">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.links.email}`}>Email</a>
          <a href={profile.links.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </div>
      </div>
      {profile.photo && (
        <img className="hero-photo" src={profile.photo} alt={profile.name} />
      )}
    </section>
  );
}
