import { useMemo, useState } from "react"
import BookingConfirmation from "./BookingConfirmation"
import BookingForm from "./BookingForm"
import {
  getAvailableTimes,
  getTodayISO,
  validateBooking,
} from "./bookingUtils"
import "./BookingSection.css"

export default function BookingSectionContainer() {
  const todayStr = useMemo(() => getTodayISO(), [])

  const [formData, setFormData] = useState({
    date: todayStr,
    time: "18:00",
    guests: 2,
    occasion: "Dinner",
    fullName: "",
    email: "",
    notes: "",
  })
  const [touched, setTouched] = useState({})
  const [submittedBooking, setSubmittedBooking] = useState(null)

  const availableTimes = useMemo(
    () => getAvailableTimes(formData.date),
    [formData.date],
  )
  const activeTime = availableTimes.includes(formData.time)
    ? formData.time
    : availableTimes[0] || ""
  const effectiveValues = { ...formData, time: activeTime }
  const errors = validateBooking(effectiveValues, availableTimes, todayStr)
  const isFormValid = Object.keys(errors).length === 0

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => {
      const nextValue = name === "guests" ? Number(value) : value
      const updated = { ...previous, [name]: nextValue }

      if (name === "date") {
        const nextTimes = getAvailableTimes(value)
        if (!nextTimes.includes(updated.time)) {
          updated.time = nextTimes[0] || ""
        }
      }

      return updated
    })
  }

  function handleBlur(event) {
    setTouched((previous) => ({
      ...previous,
      [event.target.name]: true,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({
      date: true,
      time: true,
      guests: true,
      fullName: true,
      email: true,
    })

    if (!isFormValid) return

    setSubmittedBooking({
      ...effectiveValues,
      confirmationCode: `LL-${Math.floor(100000 + Math.random() * 900000)}`,
    })
  }

  function handleReset() {
    setSubmittedBooking(null)
    setTouched({})
    setFormData((previous) => ({
      ...previous,
      fullName: "",
      email: "",
      notes: "",
    }))
  }

  return (
    <section aria-labelledby="reserve-table-heading" className="booking-wrapper">
      <div className="booking-header">
        <p className="eyebrow">Little Lemon • Chicago</p>
        <h1 id="reserve-table-heading">Reserve a Table</h1>
        <p className="booking-subtitle">
          Select your preferred date, seating time, and party size for a fresh
          Mediterranean dining experience.
        </p>
      </div>

      {submittedBooking ? (
        <BookingConfirmation booking={submittedBooking} onReset={handleReset} />
      ) : (
        <BookingForm
          formData={formData}
          todayStr={todayStr}
          availableTimes={availableTimes}
          activeTime={activeTime}
          touched={touched}
          errors={errors}
          isFormValid={isFormValid}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}
