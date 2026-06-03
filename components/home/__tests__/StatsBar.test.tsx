import { render, screen } from "@testing-library/react";
import { StatsBar } from "../StatsBar";

const stats = [
  { value: "11+", label: "years experience" },
  { value: "30+", label: "microservices shipped" },
  { value: "3", label: "countries worked in" },
];

test("renders all stat values", () => {
  render(<StatsBar stats={stats} />);
  expect(screen.getByText("11+")).toBeInTheDocument();
  expect(screen.getByText("30+")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("renders all stat labels", () => {
  render(<StatsBar stats={stats} />);
  expect(screen.getByText("years experience")).toBeInTheDocument();
  expect(screen.getByText("microservices shipped")).toBeInTheDocument();
  expect(screen.getByText("countries worked in")).toBeInTheDocument();
});
