import { render, screen } from "@testing-library/react";
import type { Contact } from "@/lib/types";

jest.mock("@/lib/content", () => ({
  getContact: (): Contact => ({
    email: "test@example.com",
    linkedin: "https://linkedin.com/in/test",
    github: "https://github.com/test",
    phone: "+1-000-000-0000",
    availability: { show: true, message: "Open to new opportunities" },
    header: { label: "Get in touch", subtitle: "Let's work together" },
  }),
}));

import ContactPage from "../page";

test("renders contact page header label", async () => {
  render(await ContactPage());
  expect(screen.getByText("Get in touch")).toBeInTheDocument();
});

test("renders contact page header subtitle as h1", async () => {
  render(await ContactPage());
  expect(
    screen.getByRole("heading", { level: 1, name: "Let's work together" })
  ).toBeInTheDocument();
});
