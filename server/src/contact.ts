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

interface Submission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

async function sendNotificationEmail(submission: Submission): Promise<void> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL || "Portfolio Contact Form <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      reply_to: submission.email,
      subject: `New portfolio message from ${submission.name}`,
      text: `From: ${submission.name} <${submission.email}>\n\n${submission.message}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
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

    try {
      await sendNotificationEmail(submission);
    } catch (emailErr) {
      console.error("[contact] Failed to send notification email:", emailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to save submission:", err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});

export default router;
