import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRouter from "./contact.js";

const app = express();
// Trust the first hop's X-Forwarded-For (Render's reverse proxy) so req.ip
// reflects the real client IP instead of the proxy's — otherwise every
// request looks like it comes from the same IP and shares one rate-limit
// bucket.
app.set("trust proxy", 1);

// API_PORT is used for local dev (see server/.env) to avoid colliding with
// whatever PORT the frontend dev server or a deploy host has claimed. Falls
// back to PORT for hosts (Render, Railway, etc.) that only set that.
const PORT = Number(process.env.API_PORT ?? process.env.PORT) || 4001;

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()) ?? []),
];

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
