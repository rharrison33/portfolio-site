import { useState, type FormEvent } from "react";
import { profile } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4001";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="section contact">
      <p className="label">Contact</p>
      <p className="contact-lead">
        I'm open to senior backend and full-stack roles involving distributed
        systems, workflow automation, and AI-enabled products. Feel free to
        reach out.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "sending"}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
          />
        </div>
        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "sending"}
          />
        </div>

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className="form-status form-status-success">
            Thanks — your message was sent. I'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="form-status form-status-error">{errorMessage}</p>
        )}
      </form>

      <div className="hero-links contact-alt">
        <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
        <a href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
