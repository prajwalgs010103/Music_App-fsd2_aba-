import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Music App title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Music App/i); // Updated text
  expect(titleElement).toBeInTheDocument();
});
