# Frontend Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [Routing](#routing)

## Project Overview

This is the frontend application for the Document Management System. It provides the user interface for interacting with the backend API to manage users, documents, and ingestion processes.

## Technologies Used

*   **Angular:** Frontend framework.
*   **TypeScript:** Programming language.
*   **Angular Material:** UI component library.
*   **RxJS:** Reactive programming library.
*   **HTML/CSS:** Structure and styling.

## Setup

1.  **Ensure the backend is running:**

    Follow the [Backend README](./backend/README.md) instructions to set up and run the backend service.

2.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application

1.  **Start the development server:**

    ```bash
    npm start
    ```

2.  **Access the application:**

    Open your web browser and go to `http://localhost:4200`.

## Project Structure

```
frontend/
├── src/
│   ├── app/                  # Application code
│   │   ├── core/             # Core services, guards, interceptors
│   │   ├── shared/           # Shared components, modules, utilities
│   │   ├── components/       # Feature-specific components (e.g., auth, documents, users)
│   │   ├── services/         # Application services (e.g., auth.service.ts)
│   │   ├── app-routing.module.ts # Main application routing
│   │   ├── app.component.ts  # Root component
│   │   ├── app.module.ts     # Root module
│   │   └── ...
│   ├── assets/               # Static assets (images, fonts)
│   ├── environments/         # Environment configuration
│   ├── index.html            # Main HTML file
│   ├── main.ts               # Application entry point
│   ├── styles.scss           # Global styles
│   └── ...
├── .gitignore                # Git ignore file
├── angular.json              # Angular CLI configuration
├── package.json              # npm dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Features

- User Authentication (Login, Register, JWT Authentication)
- Navigation (Side navigation, Toolbar)
- Document Listing and Viewing
- Document Upload
- Document Ingestion
- User Management UI (Admin only)

## Dependencies

Key libraries and UI components used:

*   Angular Core, Common, Compiler, Platform-Browser, Router
*   Angular Material components (Toolbar, Sidenav, Buttons, Icons, Lists, Menus, Tables, Select, Form Fields, etc.)
*   HttpClientModule for API communication

## Routing

The application uses the Angular Router (`app-routing.module.ts`) for navigation. Unauthenticated users are directed to the authentication routes, while authenticated users have access to protected routes via the authenticated layout.

## Testing

Test scripts are defined in `package.json`.

1.  **Run unit tests:**

    ```bash
    npm test
    ```

    This command typically runs tests using Karma and Jasmine.

<!-- 2.  **Run end-to-end tests:**

    ```bash
    npm run e2e
    ```

    (Note: The exact command and setup for end-to-end tests may vary based on the chosen framework, e.g., Cypress, Playwright.) -->

2.  **Run coverage tests:**

    ```bash
    ng test --code-coverage
    ```

    The coverage report will be available in the `coverage/` directory.