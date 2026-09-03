import { work } from "../content";

export default function Work() {
  return (
    <section id="work" className="section work">
      <p className="label">Selected Engineering Work</p>
      <div className="work-list">
        {work.map((item) => (
          <article key={item.id} className="work-item">
            <h3>{item.title}</h3>
            <p className="work-summary">{item.summary}</p>

            <div className="work-detail">
              <span className="work-detail-label">Problem</span>
              <p>{item.problem}</p>
            </div>
            <div className="work-detail">
              <span className="work-detail-label">Build</span>
              <p>{item.build}</p>
            </div>
            <div className="work-detail">
              <span className="work-detail-label">Impact</span>
              <p>{item.impact}</p>
            </div>

            <ul className="tag-list">
              {item.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
