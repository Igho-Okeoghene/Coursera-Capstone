export const INITIAL_TIMES_BY_DAY = {
  weekday: ["17:00", "18:00", "19:00", "20:00", "21:00"],
  weekend: ["16:30", "17:30", "18:30", "19:30", "20:30", "21:30"],
}

export function getTodayISO() {
  const now = new Date()
  const offsetMs = now.getTimezoneOffset() * 60 * 1000
  return new Date(now.getTime() - offsetMs).toISOString().split("T")[0]
}

export function getAvailableTimes(dateStr) {
  if (!dateStr) return INITIAL_TIMES_BY_DAY.weekday

  const parsed = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return INITIAL_TIMES_BY_DAY.weekday

  const day = parsed.getDay()
  const isWeekend = day === 0 || day === 5 || day === 6
  return isWeekend ? INITIAL_TIMES_BY_DAY.weekend : INITIAL_TIMES_BY_DAY.weekday
}

export function validateBooking(values, availableTimes, todayStr) {
  const errors = {}

  if (!values.date) {
    errors.date = "Please choose a reservation date."
  } else if (values.date < todayStr) {
    errors.date = "Reservation date cannot be in the past."
  }

  if (!values.time) {
    errors.time = "Please select an available time slot."
  } else if (!availableTimes.includes(values.time)) {
    errors.time = "Selected time is no longer available for this date."
  }

  const guestsNum = Number(values.guests)
  if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 10) {
    errors.guests = "Guests must be a whole number between 1 and 10."
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name."
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters."
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!values.email.trim()) {
    errors.email = "Please enter an email address for confirmation."
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address."
  }

  return errors
}
