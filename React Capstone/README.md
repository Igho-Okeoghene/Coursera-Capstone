# React Capstone — Little Lemon Table Booking

A responsive React reservation application for Little Lemon, a Mediterranean restaurant in Chicago. It was created as the final project for the Meta Front-End Developer Certificate and provides a complete, accessible table-booking flow.

## Features

- Responsive restaurant reservation interface
- Date, time, party size, occasion, contact, and notes fields
- Weekend and weekday seating-time options
- Past-date and required-field validation
- Email and guest-count validation
- Accessible labels, focus states, error summaries, and live confirmation feedback
- Confirmation details with a generated reservation code
- Ability to make another reservation
- Automated component tests

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- Vitest
- React Testing Library
- ESLint

## Project Structure

```text
React Capstone/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BookingSection.jsx
│   │   ├── BookingSection.css
│   │   └── BookingSection.test.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Clone and Install

```bash
git clone https://github.com/YOUR-USERNAME/React-Capstone.git
cd React-Capstone
npm install
```

Replace `YOUR-USERNAME` with your GitHub username if the repository is hosted on GitHub.

### Run the Development Server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Check source files with ESLint |

## Testing

The component tests cover initial form rendering, validation, and a successful booking confirmation.

```bash
npm test
```

## Recommended Future Improvements

- Add a backend API and persistent reservation database
- Prevent double bookings by checking reserved time slots
- Integrate a restaurant API or CMS for availability and menu data
- Add phone-number collection and SMS/email confirmation
- Add cancellation and reservation-management functionality
- Improve date formatting for a more readable confirmation summary
- Add booking analytics and automated end-to-end browser tests
- Replace the generated confirmation code with a server-generated booking reference
- Add stronger date, name, and international email handling
- Deploy the production build to GitHub Pages, Netlify, or Vercel

## Author

Okeoghene Makanjuola

## Course

Meta Front-End Developer Certificate — Capstone Project