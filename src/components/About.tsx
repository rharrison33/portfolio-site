import { about } from "../content";

export default function About() {
  return (
    <section id="about" className="section about">
      <p className="label">About</p>
      {about.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </section>
  );
}
