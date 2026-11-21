export default function BookingConfirmation({ booking, onReset }) {
  return (
    <div className="confirmation-card" role="status" aria-live="polite">
      <h2>Reservation Confirmed</h2>
      <p>
        Thank you, <strong>{booking.fullName}</strong>. Your table is reserved.
      </p>

      <dl className="confirmation-details">
        <div>
          <dt>Confirmation Code</dt>
          <dd>{booking.confirmationCode}</dd>
        </div>
        <div>
          <dt>Date &amp; Time</dt>
          <dd>{booking.date} at {booking.time}</dd>
        </div>
        <div>
          <dt>Guests</dt>
          <dd>{booking.guests}</dd>
        </div>
        <div>
          <dt>Occasion</dt>
          <dd>{booking.occasion}</dd>
        </div>
        <div>
          <dt>Confirmation Sent To</dt>
          <dd>{booking.email}</dd>
        </div>
      </dl>

      <button type="button" className="btn-secondary" onClick={onReset}>
        Make Another Reservation
      </button>
    </div>
  )
}
