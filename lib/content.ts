import fs from "fs";
import path from "path";
import type { Contact } from "./types";

export function getContact(): Contact {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/contact.json"),
    "utf-8"
  );
  return JSON.parse(raw) as Contact;
}
