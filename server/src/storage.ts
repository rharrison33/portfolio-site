import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const SUBMISSIONS_FILE = join(DATA_DIR, "submissions.json");

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

async function readSubmissions(): Promise<ContactSubmission[]> {
  try {
    const raw = await readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(raw) as ContactSubmission[];
  } catch {
    return [];
  }
}

export async function saveSubmission(
  submission: ContactSubmission
): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const existing = await readSubmissions();
  existing.push(submission);
  await writeFile(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), "utf-8");
}
