export default function BookingForm({
  formData,
  todayStr,
  availableTimes,
  activeTime,
  touched,
  errors,
  isFormValid,
  onChange,
  onBlur,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
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
            onChange={onChange}
            onBlur={onBlur}
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
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(touched.time && errors.time)}
            aria-describedby={touched.time && errors.time ? "err-time" : undefined}
            required
          >
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
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
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(touched.guests && errors.guests)}
            aria-describedby={touched.guests && errors.guests ? "err-guests" : undefined}
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
            onChange={onChange}
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
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(touched.fullName && errors.fullName)}
            aria-describedby={touched.fullName && errors.fullName ? "err-name" : undefined}
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
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "err-email" : undefined}
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
          onChange={onChange}
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
  )
}
