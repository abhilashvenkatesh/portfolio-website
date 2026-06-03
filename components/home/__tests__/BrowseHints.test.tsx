import { render, screen } from "@testing-library/react";
import { BrowseHints } from "../BrowseHints";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

test('renders "or browse" label', () => {
  render(<BrowseHints />);
  expect(screen.getByText("or browse")).toBeInTheDocument();
});

test("renders projects link with correct href", () => {
  render(<BrowseHints />);
  const link = screen.getByRole("link", { name: "projects" });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/projects");
});

test("renders experience link with correct href", () => {
  render(<BrowseHints />);
  const link = screen.getByRole("link", { name: "experience" });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/experience");
});

test("renders contact link with correct href", () => {
  render(<BrowseHints />);
  const link = screen.getByRole("link", { name: "contact" });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/contact");
});

test("renders three navigation links total", () => {
  render(<BrowseHints />);
  expect(screen.getAllByRole("link")).toHaveLength(3);
});
