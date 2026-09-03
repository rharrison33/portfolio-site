import { Router } from "express";
import { saveSubmission } from "./storage.js";
import { rateLimit } from "./rateLimit.js";

const router = Router();

const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

router.post("/", rateLimit(5, 10 * 60 * 1000), async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!isNonEmptyString(name) || name.length > NAME_MAX) {
    return res.status(400).json({ error: "Please provide a valid name." });
  }
  if (
    !isNonEmptyString(email) ||
    email.length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email)
  ) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }
  if (!isNonEmptyString(message) || message.length > MESSAGE_MAX) {
    return res.status(400).json({ error: "Please provide a message." });
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    await saveSubmission(submission);
    console.log(`[contact] New submission from ${submission.email}`);

    // TODO: wire up real email delivery here (e.g. Resend, Nodemailer + SMTP)
    // using CONTACT_TO_EMAIL / RESEND_API_KEY from server/.env — see .env.example.

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to save submission:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

export default router;
