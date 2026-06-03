import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import NavScrollWrapper from "../NavScrollWrapper";

describe("NavScrollWrapper", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
      writable: true,
    });
  });

  it("renders children inside a header", () => {
    render(<NavScrollWrapper><span>child</span></NavScrollWrapper>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("does not apply blur classes when at top", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("backdrop-blur-md");
  });

  it("applies blur and border classes after scroll", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toContain("backdrop-blur-md");
    expect(header.className).toContain("border-surface-alt");
  });

  it("removes blur classes when scrolled back to top", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).not.toContain("backdrop-blur-md");
  });
});

describe("NavScrollWrapper mobile menu", () => {
  const mobileContent = <a href="/projects">Projects</a>;

  it("renders a hamburger button with block sm:hidden class", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("sm:hidden");
  });

  it("mobile menu panel is hidden by default (max-h-0)", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const panel = document.getElementById("mobile-menu");
    expect(panel).not.toBeNull();
    expect(panel!.className).toContain("max-h-0");
    expect(panel!.className).not.toContain("max-h-screen");
  });

  it("clicking hamburger shows the mobile menu panel (max-h-screen)", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    act(() => { fireEvent.click(btn); });
    const panel = document.getElementById("mobile-menu");
    expect(panel!.className).toContain("max-h-screen");
    expect(panel!.className).not.toContain("max-h-0");
  });

  it("clicking hamburger again hides the panel", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    act(() => { fireEvent.click(btn); });
    act(() => { fireEvent.click(btn); });
    const panel = document.getElementById("mobile-menu");
    expect(panel!.className).toContain("max-h-0");
  });

  it("clicking an anchor inside the panel closes the menu", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    act(() => { fireEvent.click(btn); });
    const link = screen.getByRole("link", { name: "Projects" });
    act(() => { fireEvent.click(link); });
    const panel = document.getElementById("mobile-menu");
    expect(panel!.className).toContain("max-h-0");
  });

  it("clicking the backdrop closes the menu", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    act(() => { fireEvent.click(btn); });
    const backdrop = document.getElementById("mobile-backdrop");
    expect(backdrop).not.toBeNull();
    act(() => { fireEvent.click(backdrop!); });
    const panel = document.getElementById("mobile-menu");
    expect(panel!.className).toContain("max-h-0");
  });

  it("hamburger has aria-expanded=false by default", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("hamburger has aria-expanded=true when menu is open", () => {
    render(<NavScrollWrapper mobileMenuContent={mobileContent}><span>logo</span></NavScrollWrapper>);
    const btn = screen.getByRole("button", { name: /menu/i });
    act(() => { fireEvent.click(btn); });
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});
