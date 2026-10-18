# Frontend Run Guide - Movie Booking Web (React + Vite)

## 1. Project Overview
The frontend is a single-page application (SPA) built using **React 19**, **React Router v7**, and bundled with **Vite 8**. It provides a responsive interface for users to browse movies, inspect show timings, select seats, book tickets, and manage their reservations. It also contains an Admin Portal for managing movies, theaters, screens, shows, seats, users, and transactions.

- **Project Root Directory**: `d:\movieweb\MovieBookingWeb`
- **Frontend Port**: `5173` (Default Vite development port)
- **Local URL**: `http://localhost:5173`
- **Backend API Target**: `http://localhost:8081`

---

## 2. Prerequisites & Environment Verification
Ensure **Node.js** and **npm** are installed and available in your PATH on Windows:

| Dependency | Minimum Version | Verified on System | Verification Command |
|---|---|---|---|
| **Node.js** | 18+ (20+ or 22+ recommended) | v22.23.2 | `node -v` |
| **npm** | 9+ (10+ recommended) | 10.9.8 | `npm -v` |

To verify in PowerShell:
```powershell
node -v
npm -v
```

---

## 3. Dependency Management & Scripts

The project uses `npm` as the package manager with the following key scripts from `package.json`:

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Starts Vite development server with HMR |
| `build` | `npm run build` | Compiles and bundles production assets to `/dist` |
| `preview` | `npm run preview` | Serves the production build locally |
| `lint` | `npm run lint` | Runs ESLint over project files |

### Installing Dependencies
Dependencies are already installed in `node_modules`. If you ever need a clean reinstall:
```powershell
cd d:\movieweb\MovieBookingWeb
npm install
```

---

## 4. Run Instructions

### Step 1: Ensure Backend is Running First
The frontend communicates directly with `http://localhost:8081`. Make sure the Spring Boot backend is running before testing authentication or data fetching.

### Step 2: Open the Frontend Directory
```powershell
cd d:\movieweb\MovieBookingWeb
```

### Step 3: Start the Vite Development Server
```powershell
npm run dev
```

Look for the console output indicating the local server is ready:
```text
  VITE v8.2.0  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open in Your Browser
Navigate to:
```text
http://localhost:5173
```

### Step 5: Stopping the Server
- Press `Ctrl + C` in the PowerShell terminal where `npm run dev` is running, then press `Y` and Enter.

---

## 5. User Roles and Navigating the Application

### 1. Customer User Flow
- **Registration**: Visit `http://localhost:5173/register` to create an account.
- **Login**: Visit `http://localhost:5173/login` to sign in. The JWT token, username, and role are saved into `localStorage`.
- **Browse Movies**: Navigate to `http://localhost:5173/movies`.
- **View Movie Details**: Click on any movie card or go to `http://localhost:5173/movie/:id`.
- **Select Show**: Choose showtimes at `http://localhost:5173/shows/:movieId`.
- **Select Seats & Book**: Pick available seats and complete booking at `http://localhost:5173/seats/:showId/:screenId`.
- **My Bookings**: Check your reservations at `http://localhost:5173/my-bookings`.

### 2. Administrator Flow
- Log in with the pre-seeded admin credentials:
  - **Email**: `admin@gmail.com`
  - **Password**: `admin123`
- Access the Admin Dashboard at `http://localhost:5173/admin`.
- Manage resources:
  - Movies: `http://localhost:5173/admin/movies`
  - Theaters: `http://localhost:5173/admin/theaters`
  - Screens: `http://localhost:5173/admin/screens`
  - Shows: `http://localhost:5173/admin/shows`
  - Seats: `http://localhost:5173/admin/seats`
  - Users: `http://localhost:5173/admin/users`
  - Bookings: `http://localhost:5173/admin/bookings`
  - Transactions: `http://localhost:5173/admin/transactions`

---

## 6. Common Issues & Solutions

1. **`Network Error` or `AxiosError: ERR_CONNECTION_REFUSED`**
   - **Cause**: The Spring Boot backend is not running on `http://localhost:8081`.
   - **Fix**: Open another terminal and start the backend using `mvn spring-boot:run` in `d:\movieweb\backend\thirdyearex1`.

2. **CORS Error in Browser Developer Tools**
   - **Cause**: Backend CORS policy only permits `http://localhost:5173`. If Vite binds to another port (e.g. `5174`), requests will be blocked.
   - **Fix**: Ensure port 5173 is free before launching Vite. If another process is using it, kill it:
     ```powershell
     Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
     ```

3. **`hero.jpg` Missing Image Warning**
   - **Cause**: `App.css` references `/hero.jpg`, which is not present in the `public/` directory.
   - **Fix**: Place an image named `hero.jpg` in `d:\movieweb\MovieBookingWeb\public\hero.jpg` to display the banner graphic.
