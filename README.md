# User REST API Frontend

A modern, responsive React frontend application for managing users via a REST API. This application features a premium "glassmorphism" dark-mode UI and provides seamless interactions for adding, viewing, editing, and deleting users.

## Features

- **Premium Dark Mode UI**: Built with pure CSS, featuring vibrant neon gradients, smooth micro-interactions, and frosted glass components.
- **User Management**: 
  - Add new users with form validation
  - View a list of all existing users
  - View detailed profile pages for individual users
  - Edit and update user details
  - Activate or permanently delete users
- **Real-time Notifications**: Custom sliding toast notifications to elegantly inform users of errors or success states.
- **Client-Side Routing**: Fast and smooth navigation handled by `react-router`.
- **Form Handling**: Efficient and reliable form state management using `react-hook-form`.

## Technology Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Routing**: React Router
- **Forms**: React Hook Form
- **Typography**: Outfit (Google Fonts)

## Project Structure

```text
src/
├── Components/
│   ├── AddUser.jsx      # Form to create new users
│   ├── Footer.jsx       # Global footer
│   ├── Header.jsx       # Global navigation bar
│   ├── Home.jsx         # Landing page dashboard
│   ├── RootLayout.jsx   # Layout wrapper containing Header & Footer
│   ├── User.jsx         # Individual user profile & edit form
│   └── UsersList.jsx    # Display all users in a list
├── App.jsx              # Application router setup
├── main.jsx             # React entry point
└── index.css            # Global premium styling & design system
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd user-rest-api-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the local URL provided in your terminal (usually `http://localhost:5173`).

## Backend API
This frontend connects to a REST API hosted at:
`https://user-rest-api-1.onrender.com/user-api/`

*Note: If the API is hosted on a free tier like Render, initial requests may take a moment as the server spins up from an idle state.*
