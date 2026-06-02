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

describe("Nav logo", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders abhilash wordmark as a link to /", () => {
    render(<Nav />);
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("logo does not have nav-link-active styling when on home page", () => {
    render(<Nav />);
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).not.toHaveClass("bg-[var(--color-surface-alt)]");
  });

  it("logo is present and links to / when on a non-home page", () => {
    mockUsePathname.mockReturnValue("/projects");
    render(<Nav />);
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});
