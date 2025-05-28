# Document Management System

## Project Overview

This project is a Document Management System with a FastAPI backend and an Angular frontend, orchestrated using Docker Compose.

## Features

*   User Authentication (Registration, Login, JWT Based)
*   Role-Based Access Control (Admin, Editor, Viewer)
*   Document Listing and Viewing
*   Document Upload
*   Document Ingestion and Logging
*   User Management UI (Admin only)
*   PostgreSQL database integration
*   Dockerized for easy deployment
*   Automated testing (Backend)
*   Load testing with Locust (Backend)

## Technologies Used

**Backend:**

*   FastAPI
*   SQLAlchemy (ORM)
*   PostgreSQL (Database)
*   pytest (Testing)
*   Alembic (Database Migrations)
*   Uvicorn (ASGI Server)
*   Locust (Load Testing)

**Frontend:**

*   Angular
*   TypeScript
*   Angular Material (UI Components)
*   RxJS
*   HTML/CSS

**DevOps/Other:**

*   Docker
*   Docker Compose

## Getting Started

1.  **Build and run the application using Docker Compose:**

    Make sure you are in the root directory of the project in your terminal.

    ```bash
    docker compose up --build -d
    ```

    This command will:

    *   Build the Docker images for the backend and frontend (if not already built or if changes are detected).
    *   Start the PostgreSQL database container.
    *   Start the backend (FastAPI) container, waiting for the database.
    *   Start the frontend (Nginx serving Angular) container, waiting for the backend.
    *   Run the containers in detached mode (`-d`).

2.  **Access the application:**

    *   **Frontend:** Open your web browser and go to `http://localhost:4200`.
    *   **Backend API:** The API is available at `http://localhost:8000`.
        *   Swagger UI (API Docs): `http://localhost:8000/docs`
        *   ReDoc (API Docs): `http://localhost:8000/redoc`

3.  **Apply Database Migrations (First time setup or schema changes):**

    If this is the first time running or you have database schema changes, you may need to apply migrations. Find the backend container ID or name using `docker compose ps` and run the Alembic upgrade command:

    ```bash
    docker exec <backend_container_id_or_name> alembic upgrade head
    ```
    (Note: Initial table creation might also be handled by the init.sql script on the very first database volume creation, as configured).

4.  **Stop the application:**

    To stop all running containers defined in the `docker-compose.yml` file, run:

    ```bash
    docker compose down
    ```

## More Information

For more detailed documentation on each part of the project, refer to the specific README files:

*   [Backend README](./backend/README.md)
*   [Frontend README](./frontend/README.md)
