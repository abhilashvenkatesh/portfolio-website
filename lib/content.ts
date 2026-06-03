import fs from "fs";
import path from "path";
import type { Contact, HomeContent } from "./types";

export function getHomeContent(): HomeContent {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/home.json"),
    "utf-8"
  );
  return JSON.parse(raw) as HomeContent;
}

export function getContact(): Contact {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/contact.json"),
    "utf-8"
  );
  return JSON.parse(raw) as Contact;
}
