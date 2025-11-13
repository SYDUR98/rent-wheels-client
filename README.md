# RentWheels — Car Rental Platform

**Live Site:** [https://your-client-site.netlify.app](https://your-client-site.netlify.app)


## Project Overview

RentWheels is a full‑stack MERN (MongoDB, Express, React, Node) application that connects users with local car owners and rental providers. Users can browse available cars, view detailed information, and book rentals for specific dates. Providers can add and manage vehicle listings and bookings.

## Key Features

* **Browse & Search Cars** — Public listing of cars with search by name and filters (category, location, status).
* **Secure Authentication** — Email/password and Google sign-in using Firebase Auth. Registration collects name and photoURL.
* **Provider Dashboard (My Listings)** — Providers can Add / Update / Delete car listings (private routes protected).
* **Booking System** — Authenticated users can book cars; booking data is saved and car `status` is updated (prevents double booking).
* **My Bookings** — Users can view the cars they booked with booking details.
* **Real-time UI updates** — After booking or CRUD actions the UI updates immediately for better UX.
* **Toasts & Alerts** — All success/error messages use toast (React‑Toastify or SweetAlert) — no browser alerts.
* **Responsive UI** — Mobile-first, responsive grid layout for cards and pages.

## Pages / Routes (Summary)

* `/` — Home (Hero slider, Featured cars, Why Rent With Us, Extra sections)
* `/browse` — Browse Cars (public)
* `/car/:id` — Car Details (private — requires login)
* `/login` — Login page (email/password + Google)
* `/register` — Register page (name, email, photoURL, password)
* `/add-car` — Add Car (private)
* `/my-listings` — My Listings (private)
* `/my-bookings` — My Bookings (private)
* `*` — 404 Page (no navbar/footer)

## Tech Stack

* Frontend: React, React Router, Tailwind CSS / DaisyUI
* Backend: Node.js, Express
* Database: MongoDB (hosted)
* Auth: Firebase Authentication (Email/Password + Google)
* HTTP: Axios / fetch
* Notifications: React‑Toastify or SweetAlert2
* Optional UI extras: Framer Motion, React Simple Typewriter, Lottie React

## API Endpoints (example)

* `GET /browsecar` — list cars (supports `?status=Available` filter)
* `POST /cars` — create car (provider)
* `GET /cars/:id` — get car details
* `PUT /cars/:id` — update car
* `DELETE /cars/:id` — delete car
* `POST /bookings` — create booking (updates car status)
* `GET /bookings?userEmail={email}` — get user bookings



## Installation (Local)

1. Clone client and server repositories.
2. In client folder:

```bash
npm install
npm run dev
# or
npm start
```

3. In server folder:

```bash
npm install
node index.js
# or with nodemon
npx nodemon index.js
```





##  Author

* **[Md Sydur Rahaman]** - ([GitHub Profile]())











