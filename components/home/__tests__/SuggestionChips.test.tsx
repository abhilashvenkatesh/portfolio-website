import { render, screen, fireEvent } from "@testing-library/react";
import { SuggestionChips } from "../SuggestionChips";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const chips = [
  "What are Abhilash's top skills?",
  "Tell me about his role at Rapido",
  "Which projects has he led?",
  "How can I get in touch?",
];

beforeEach(() => {
  mockPush.mockClear();
});

test("renders all four chips with correct text", () => {
  render(<SuggestionChips chips={chips} />);
  chips.forEach((text) => {
    expect(screen.getByRole("button", { name: text })).toBeInTheDocument();
  });
});

test("clicking a chip navigates to /chat with encoded query", () => {
  render(<SuggestionChips chips={chips} />);
  fireEvent.click(screen.getByRole("button", { name: chips[0] }));
  expect(mockPush).toHaveBeenCalledWith(
    "/chat?q=" + encodeURIComponent(chips[0])
  );
});

test("clicking second chip navigates with its own query", () => {
  render(<SuggestionChips chips={chips} />);
  fireEvent.click(screen.getByRole("button", { name: chips[2] }));
  expect(mockPush).toHaveBeenCalledWith(
    "/chat?q=" + encodeURIComponent(chips[2])
  );
});

test("renders nothing when chips array is empty", () => {
  const { container } = render(<SuggestionChips chips={[]} />);
  expect(container.querySelectorAll("button")).toHaveLength(0);
});
