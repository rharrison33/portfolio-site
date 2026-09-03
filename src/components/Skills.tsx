import { skills } from "../content";

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <p className="label">Technical Skills</p>
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.category} className="skills-group">
            <h4>{group.category}</h4>
            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
