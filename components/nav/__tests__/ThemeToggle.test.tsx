import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../ThemeToggle";
import ThemeProvider from "@/components/providers/ThemeProvider";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders a button", () => {
    renderToggle();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has aria-label 'Switch to dark mode' in light mode", () => {
    renderToggle();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" })
    ).toBeInTheDocument();
  });

  it("has aria-label 'Switch to light mode' in dark mode", async () => {
    localStorage.setItem("theme", "dark");
    renderToggle();
    await act(async () => {});
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();
  });

  it("clicking toggle writes dark to localStorage when in light mode", async () => {
    renderToggle();
    await userEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("clicking toggle switches aria-label from dark-mode to light-mode", async () => {
    renderToggle();
    await userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();
  });
});
