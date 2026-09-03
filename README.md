# Portfolio Site

A personal portfolio built with **React + Vite + TypeScript** on the frontend
and a small **Node + Express + TypeScript** API backing the contact form.
Plain CSS in [`src/styles.css`](src/styles.css) for full control over the
design — no UI framework.

## Editing content

Everything you're likely to want to change — name, links, About copy, work
case studies, experience, skills — lives in one file:

**[`src/content.ts`](src/content.ts)**

Edit the text there and the site updates automatically. You generally
shouldn't need to touch the component files (`src/components/*.tsx`) or CSS
unless you want to change layout or styling.

Things flagged with `TODO` in `content.ts` that you should fill in:

- Your actual name (currently a placeholder in `profile.name`)
- `profile.links.github` — your GitHub URL
- `profile.links.linkedin` — your LinkedIn URL
- `profile.links.resume` — see below
- `profile.links.email` was pre-filled with the address associated with this
  session; change it if you'd like a different contact address

### Adding your résumé

Drop your résumé PDF into the `public/` folder as `resume.pdf` (create the
folder if it doesn't exist). Anything in `public/` is served as-is at the
site root, so `public/resume.pdf` becomes `/resume.pdf`, matching the default
value of `profile.links.resume` in `content.ts`. If you name the file
differently or host it elsewhere, update that path.

## Project structure

```
src/                  — React + TypeScript frontend
  content.ts          — all site copy and links (edit this)
  App.tsx             — page composition
  styles.css          — all styling
  components/
    Nav.tsx, Hero.tsx, About.tsx, Work.tsx,
    Experience.tsx, Skills.tsx, Contact.tsx, Footer.tsx
server/               — Node + Express + TypeScript API
  src/
    index.ts          — app setup, CORS, security headers
    contact.ts         — POST /api/contact (validates + stores submissions)
    storage.ts         — writes submissions to server/data/submissions.json
    rateLimit.ts        — simple in-memory rate limiting
  .env.example         — copy to .env to configure PORT / CORS_ORIGIN
public/
  resume.pdf           — add your résumé here (not included)
```

## Running locally

Requires [Node.js](https://nodejs.org/) 18+.

Install both the frontend and backend dependencies:

```bash
npm install
npm run install:server
```

Run everything together (frontend on `:5173`, API on `:4001`):

```bash
npm run dev:all
```

Or run them separately in two terminals:

```bash
npm run dev          # frontend only
npm run dev:server   # backend only
```

Visit http://localhost:5173. The frontend calls the API directly by URL
(`VITE_API_URL`, defaulting to `http://localhost:4001` — see
[`.env.example`](.env.example)) rather than through a Vite dev proxy, since
frontend and backend are typically deployed to two different hosts anyway.
Submitting the contact form calls the Express API, which validates the
input, rate-limits by IP, and saves the message to
`server/data/submissions.json` (git-ignored). It also logs each submission to
the server console. To actually deliver messages to your inbox, wire up an
email provider (e.g. [Resend](https://resend.com) or Nodemailer + SMTP) at
the `TODO` in [`server/src/contact.ts`](server/src/contact.ts) — see
[`server/.env.example`](server/.env.example) for the relevant env vars.

## Building for production

Frontend:

```bash
npm run build      # type-checks and outputs a static site to dist/
npm run preview    # preview the production build locally
```

Backend:

```bash
npm run build --prefix server   # compiles TypeScript to server/dist
npm start --prefix server       # runs the compiled server
```

## Deploying

The frontend (`dist/`) is a static site and can be hosted anywhere that
serves static files. The backend is a long-running Node process, so it needs
a Node-friendly host — it won't run on GitHub Pages.

**Frontend — Vercel or Netlify (recommended):**

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) (or
   [Netlify](https://app.netlify.com/start)) — both auto-detect Vite.
   Build command `npm run build`, output directory `dist`.
3. Set the `VITE_API_URL` environment variable in your host's project
   settings to your deployed API's URL (e.g. `https://api.yourdomain.com`)
   so the frontend's contact form calls the right backend in production.

**Backend — Render or Railway (both have free tiers):**

1. Push this repo to GitHub.
2. Create a new Web Service pointing at the `server/` directory.
3. Build command: `npm install && npm run build`. Start command: `npm start`.
4. Set `CORS_ORIGIN` to your deployed frontend's URL (e.g.
   `https://yourname.com`) and any email-provider env vars from
   `server/.env.example`.

**GitHub Pages** works for the frontend only (see the original static-site
instructions in Vite's docs for the `base` path setting), but you'll still
need one of the hosts above for the API if you want a live contact form.
