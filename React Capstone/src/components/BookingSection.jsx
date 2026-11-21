import React, { useMemo, useState } from "react";

const INITIAL_TIMES_BY_DAY = {
  // Default slots; dynamically adjusted by selected date
  weekday: ["17:00", "18:00", "19:00", "20:00", "21:00"],
  weekend: ["16:30", "17:30", "18:30", "19:30", "20:30", "21:30"],
};

function getTodayISO() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().split("T")[0];
}

function getAvailableTimes(dateStr) {
  if (!dateStr) return INITIAL_TIMES_BY_DAY.weekday;
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return INITIAL_TIMES_BY_DAY.weekday;
  const day = parsed.getDay();
  const isWeekend = day === 0 || day === 5 || day === 6;
  return isWeekend ? INITIAL_TIMES_BY_DAY.weekend : INITIAL_TIMES_BY_DAY.weekday;
}

function validateBooking(values, availableTimes, todayStr) {
  const errors = {};

  if (!values.date) {
    errors.date = "Please choose a reservation date.";
  } else if (values.date < todayStr) {
    errors.date = "Reservation date cannot be in the past.";
  }

  if (!values.time) {
    errors.time = "Please select an available time slot.";
  } else if (!availableTimes.includes(values.time)) {
    errors.time = "Selected time is no longer available for this date.";
  }

  const guestsNum = Number(values.guests);
  if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 10) {
    errors.guests = "Guests must be a whole number between 1 and 10.";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = "Please enter an email address for confirmation.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export default function BookingSection() {
  const todayStr = useMemo(() => getTodayISO(), []);

  const [formData, setFormData] = useState({
    date: todayStr,
    time: "18:00",
    guests: 2,
    occasion: "Dinner",
    fullName: "",
    email: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const availableTimes = useMemo(
    () => getAvailableTimes(formData.date),
    [formData.date]
  );

  const activeTime = availableTimes.includes(formData.time)
    ? formData.time
    : availableTimes[0] || "";

  const effectiveValues = { ...formData, time: activeTime };
  const errors = validateBooking(effectiveValues, availableTimes, todayStr);
  const isFormValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextValue = name === "guests" ? Number(value) : value;
      const updated = { ...prev, [name]: nextValue };

      if (name === "date") {
        const nextTimes = getAvailableTimes(value);
        if (!nextTimes.includes(updated.time)) {
          updated.time = nextTimes[0] || "";
        }
      }
      return updated;
    });
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      date: true,
      time: true,
      guests: true,
      fullName: true,
      email: true,
    });

    if (!isFormValid) return;

    setSubmittedBooking({
      ...effectiveValues,
      confirmationCode: `LL-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  function handleResetBooking() {
    setSubmittedBooking(null);
    setTouched({});
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      email: "",
      notes: "",
    }));
  }

  return (
    <section
      aria-labelledby="reserve-table-heading"
      className="booking-wrapper"
    >
      <div className="booking-header">
        <p className="eyebrow">Little Lemon • Chicago</p>
        <h1 id="reserve-table-heading">Reserve a Table</h1>
        <p className="booking-subtitle">
          Select your preferred date, seating time, and party size for a fresh
          Mediterranean dining experience.
        </p>
      </div>

      {submittedBooking ? (
        <div
          className="confirmation-card"
          role="status"
          aria-live="polite"
        >
          <h2>Reservation Confirmed</h2>
          <p>
            Thank you, <strong>{submittedBooking.fullName}</strong>. Your table is
            reserved.
          </p>
          <dl className="confirmation-details">
            <div>
              <dt>Confirmation Code</dt>
              <dd>{submittedBooking.confirmationCode}</dd>
            </div>
            <div>
              <dt>Date &amp; Time</dt>
              <dd>
                {submittedBooking.date} at {submittedBooking.time}
              </dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{submittedBooking.guests}</dd>
            </div>
            <div>
              <dt>Occasion</dt>
              <dd>{submittedBooking.occasion}</dd>
            </div>
            <div>
              <dt>Confirmation Sent To</dt>
              <dd>{submittedBooking.email}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetBooking}
          >
            Make Another Reservation
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="booking-form"
          aria-describedby="form-status-summary"
        >
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="res-date">Choose date</label>
              <input
                id="res-date"
                name="date"
                type="date"
                min={todayStr}
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.date && errors.date)}
                aria-describedby={touched.date && errors.date ? "err-date" : undefined}
                required
              />
              {touched.date && errors.date && (
                <span id="err-date" className="error-text" role="alert">
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="res-time">Choose time</label>
              <select
                id="res-time"
                name="time"
                value={activeTime}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.time && errors.time)}
                aria-describedby={touched.time && errors.time ? "err-time" : undefined}
                required
              >
                {availableTimes.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {touched.time && errors.time && (
                <span id="err-time" className="error-text" role="alert">
                  {errors.time}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="guests">Number of guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.guests && errors.guests)}
                aria-describedby={
                  touched.guests && errors.guests ? "err-guests" : undefined
                }
                required
              />
              {touched.guests && errors.guests && (
                <span id="err-guests" className="error-text" role="alert">
                  {errors.guests}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
              >
                <option value="Dinner">Dinner</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="full-name">Full name</label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.fullName && errors.fullName)}
                aria-describedby={
                  touched.fullName && errors.fullName ? "err-name" : undefined
                }
                required
              />
              {touched.fullName && errors.fullName && (
                <span id="err-name" className="error-text" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={
                  touched.email && errors.email ? "err-email" : undefined
                }
                required
              />
              {touched.email && errors.email && (
                <span id="err-email" className="error-text" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="notes">Seating or dietary notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="High chair needed, nut allergy, patio preferred..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <p id="form-status-summary" className="sr-only" aria-live="polite">
            {isFormValid
              ? "All required reservation fields are valid."
              : "Please complete all required fields with valid values before submitting."}
          </p>

          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid}
            aria-disabled={!isFormValid}
          >
            Confirm Reservation
          </button>
        </form>
      )}
    </section>
  );
}