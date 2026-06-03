import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatLauncher } from "../ChatLauncher";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

test("renders input with correct placeholder", () => {
  render(<ChatLauncher />);
  expect(
    screen.getByPlaceholderText("Ask me anything about Abhilash…")
  ).toBeInTheDocument();
});

test("pressing Enter with text navigates to /chat with encoded query", async () => {
  render(<ChatLauncher />);
  const input = screen.getByPlaceholderText("Ask me anything about Abhilash…");
  await userEvent.type(input, "What are his top skills?");
  fireEvent.submit(input.closest("form")!);
  expect(mockPush).toHaveBeenCalledWith(
    "/chat?q=" + encodeURIComponent("What are his top skills?")
  );
});

test("clicking send button with text navigates to /chat", async () => {
  render(<ChatLauncher />);
  const input = screen.getByPlaceholderText("Ask me anything about Abhilash…");
  await userEvent.type(input, "Tell me about Abhilash");
  fireEvent.click(screen.getByRole("button", { name: /send question/i }));
  expect(mockPush).toHaveBeenCalledWith(
    "/chat?q=" + encodeURIComponent("Tell me about Abhilash")
  );
});

test("submitting empty input does not navigate", () => {
  render(<ChatLauncher />);
  fireEvent.submit(
    screen.getByPlaceholderText("Ask me anything about Abhilash…").closest("form")!
  );
  expect(mockPush).not.toHaveBeenCalled();
});

test("submitting whitespace-only input does not navigate", async () => {
  render(<ChatLauncher />);
  const input = screen.getByPlaceholderText("Ask me anything about Abhilash…");
  await userEvent.type(input, "   ");
  fireEvent.submit(input.closest("form")!);
  expect(mockPush).not.toHaveBeenCalled();
});
