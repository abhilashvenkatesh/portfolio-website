import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeProvider from "../ThemeProvider";
import { useTheme } from "../useTheme";

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to light when no localStorage value", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("reads stored dark theme from localStorage on mount", async () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("toggleTheme switches light→dark and writes to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggleTheme switches dark→light and writes to localStorage", async () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await act(async () => {});
    await userEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggleTheme sets data-theme on document.documentElement", async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByText("toggle"));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});

describe("useTheme outside provider", () => {
  it("throws when used outside ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeDisplay />)).toThrow(
      "useTheme must be used within ThemeProvider"
    );
    spy.mockRestore();
  });
});
