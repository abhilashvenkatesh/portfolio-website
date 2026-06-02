import React from "react";
import { render, screen, act } from "@testing-library/react";
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
