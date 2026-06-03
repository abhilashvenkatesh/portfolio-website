import { render, screen } from "@testing-library/react";
import { PageHeader } from "../PageHeader";

test("renders AccentTag with provided label", () => {
  render(<PageHeader label="Get in touch" subtitle="Let's work together" />);
  expect(screen.getByText("Get in touch")).toBeInTheDocument();
});

test("renders h1 with provided subtitle", () => {
  render(<PageHeader label="Get in touch" subtitle="Let's work together" />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Let's work together" })
  ).toBeInTheDocument();
});

test("renders decorative grid background layer", () => {
  const { container } = render(
    <PageHeader label="Get in touch" subtitle="Let's work together" />
  );
  expect(
    container.querySelector('[data-testid="page-header-grid"]')
  ).toBeInTheDocument();
});
