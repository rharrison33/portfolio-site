import { experience } from "../content";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <p className="label">Experience</p>
      <div className="experience-list">
        {experience.map((item) => (
          <div key={item.id} className="experience-item">
            <div className="experience-heading">
              <h3>
                {item.role} <span className="experience-org">— {item.org}</span>
              </h3>
              {item.dates && (
                <span className="experience-dates">{item.dates}</span>
              )}
            </div>
            {item.bullets.length > 0 && (
              <ul>
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
