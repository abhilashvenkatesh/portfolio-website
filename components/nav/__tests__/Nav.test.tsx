import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({ usePathname: () => mockUsePathname() }));

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
    children: import("react").ReactNode;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

jest.mock("@/lib/content", () => ({
  getContact: jest.fn(() => ({
    email: "test@example.com",
    linkedin: "https://linkedin.com/in/test",
    phone: "+1-000-000-0000",
    availability: { show: true, message: "Open" },
  })),
}));

describe("Nav logo", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders abhilash wordmark as a link to /", async () => {
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("logo does not have nav-link-active styling when on home page", async () => {
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).not.toHaveClass("bg-[var(--color-surface-alt)]");
  });

  it("logo is present and links to / when on a non-home page", async () => {
    mockUsePathname.mockReturnValue("/projects");
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Nav hire-me CTA", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders Hire me anchor", async () => {
    render(await Nav());
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toBeInTheDocument();
  });

  it("Hire me anchor has correct mailto href with subject", async () => {
    render(await Nav());
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toHaveAttribute(
      "href",
      "mailto:test@example.com?subject=Hire%20me"
    );
  });

  it("Hire me anchor is not inside the nav element", async () => {
    render(await Nav());
    const nav = screen.getByRole("navigation");
    expect(nav).not.toHaveTextContent("Hire me");
  });
});
