import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import BookingSection from "./BookingSection";

describe("BookingSection", () => {
  test("renders reservation form fields and disables submit when required details are missing", () => {
    render(<BookingSection />);

    expect(
      screen.getByRole("heading", { name: /reserve a table/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /confirm reservation/i,
    });
    expect(submitButton).toBeDisabled();
  });

  test("shows validation message when invalid guest count or invalid email is entered", () => {
    render(<BookingSection />);

    const guestsInput = screen.getByLabelText(/number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "0" } });
    fireEvent.blur(guestsInput);
    expect(
      screen.getByText(/guests must be a whole number between 1 and 10/i)
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.blur(emailInput);
    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  test("submits valid booking data and displays confirmation summary", () => {
    render(<BookingSection />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Amara Okafor" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "amara@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "4" },
    });

    const submitButton = screen.getByRole("button", {
      name: /confirm reservation/i,
    });
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    expect(
      screen.getByRole("heading", { name: /reservation confirmed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/amara okafor/i)).toBeInTheDocument();
    expect(screen.getByText(/amara@example.com/i)).toBeInTheDocument();
  });
});