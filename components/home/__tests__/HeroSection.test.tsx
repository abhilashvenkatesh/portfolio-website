import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import type { HomeContent } from "@/lib/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/lib/content", () => ({
  getSuggestionChips: () => ({
    home: [
      "What are Abhilash's top skills?",
      "Tell me about his role at Rapido",
      "Which projects has he led?",
      "How can I get in touch?",
    ],
    chat: [],
  }),
}));

const content: HomeContent = {
  roleBadge: "Lead Application Developer · Melbourne",
  headline: "Hi, I'm Abhilash.",
  subheading: { base: "I architect systems that ", accent: "scale to millions." },
  bio: "Lead Application Developer with 11+ years.",
  stats: [
    { value: "11+", label: "years experience" },
    { value: "30+", label: "microservices shipped" },
    { value: "3", label: "countries worked in" },
  ],
};

test("renders stats bar with all three stat values", () => {
  render(<HeroSection content={content} />);
  expect(screen.getByText("11+")).toBeInTheDocument();
  expect(screen.getByText("30+")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("renders stats bar with all three stat labels", () => {
  render(<HeroSection content={content} />);
  expect(screen.getByText("years experience")).toBeInTheDocument();
  expect(screen.getByText("microservices shipped")).toBeInTheDocument();
  expect(screen.getByText("countries worked in")).toBeInTheDocument();
});

test("renders ChatLauncher with placeholder in hero", () => {
  render(<HeroSection content={content} />);
  expect(
    screen.getByPlaceholderText("Ask me anything about Abhilash…")
  ).toBeInTheDocument();
});

test("renders suggestion chips below chat launcher", () => {
  render(<HeroSection content={content} />);
  expect(
    screen.getByRole("button", { name: "What are Abhilash's top skills?" })
  ).toBeInTheDocument();
});
