# Backend Documentation

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Load Testing](#load-testing)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [API Endpoints Used](#api-endpoints-used)
- [Database Schema](#database-schema)
- [Security](#security)
- [Error Handling](#error-handling)

## Project Overview

This is the backend service for the Document Management System. It is built using FastAPI and interacts with a PostgreSQL database to manage users and documents.

## Technologies Used

- **FastAPI:** High-performance web framework.
- **SQLAlchemy:** SQL toolkit and Object-Relational Mapper (ORM).
- **PostgreSQL:** Relational database.
- **Docker & Docker Compose:** Containerization.
- **Uvicorn:** ASGI server.
- **pytest:** Testing framework.
- **Alembic:** Database migrations.

## Features

- User Authentication (Registration, Login, JWT Based)
- Role-Based Access Control (Admin, Editor, Viewer)
- Document Management (Upload, potentially retrieval/listing based on API structure)
- Document ingestion and logging
- PostgreSQL database integration
- Dockerized for easy deployment
- Automated testing and load testing (Locust)

## Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create a `.env` file:**

    Copy the `.env.example` (if it exists, otherwise create one) and fill in the required environment variables, especially for the database connection.

    ```
    POSTGRES_USER=newuser
    POSTGRES_PASSWORD=StrongPass123
    POSTGRES_DB=newuser
    # Add any other necessary variables like SECRET_KEY, ALGORITHM, etc.
    SECRET_KEY=your_super_secret_key_here
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=10080 # 7 days
    CORS_ALLOWED_ORIGINS=http://localhost:4200,http://127.0.0.1:4200
    ```

3.  **Build and run the Docker containers:**

    ```bash
    docker compose up --build -d
    ```

    This will build the `web` service (your FastAPI app) and start the `db` service (PostgreSQL). The `-d` flag runs the containers in detached mode.

4.  **Apply database migrations (if using Alembic):**

    If you are using Alembic for database migrations, you need to run the migrations inside the web container. Find the container ID or name (e.g., `document-management-backend-web-1`) using `docker compose ps` or `docker ps` and run:

    ```bash
    docker exec <container_id_or_name> alembic upgrade head
    ```

    (Note: You may need to adjust the command based on your Alembic setup within the container).

## Running the Application

Once the containers are up and running (`docker compose up -d`), the backend API will be available at `http://localhost:8000`.

You can access the automatically generated API documentation (Swagger UI) at `http://localhost:8000/docs` and the alternative ReDoc documentation at `http://localhost:8000/redoc`.

## Load Testing

4.  **Start the app:**

```bash
docker-compose up -d
```

2. **Run load tests:**

```bash
./run_load_tests.sh
```

3. **Open Locust UI:**
   [http://localhost:8089](http://localhost:8089)

## Project Structure

```
backend/
├── app/                  # Main application code
│   ├── api/              # API endpoints (routers)
│   ├── core/             # Core configuration and utilities (settings, security)
│   ├── db/               # Database setup (session, base)
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas (data validation/serialization)
│   ├── services/         # Business logic
│   └── main.py           # FastAPI application entry point
├── tests/                # Backend tests
├── .env.example          # Example environment variables file
├── .gitignore            # Git ignore file
├── .dockerignore         # Docker ignore file
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker build instructions
├── requirements.txt      # Python dependencies
├── setup.py              # Project packaging (if used)
├── init.sql              # SQL script (if used)
├── pytest.ini            # Pytest configuration
├── run_load_tests.sh     # Script for running load tests (or all tests)
└── README.md             # This file
```

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

These docs provide detailed information about the available endpoints, request/response models, and allow you to test the API directly from your browser.

## API Endpoints Used

The full list of API endpoints and their details can be found in the automatically generated documentation (Swagger UI/ReDoc) linked above.

Key endpoints implemented:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/token` - Login and get access token (form data)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

### User Management (Admin only for some endpoints)
- `GET /api/users/` - List all users (Admin only)
- `GET /api/users/{user_id}` - Get user by ID (Admin only)
- `PUT /api/users/{user_id}` - Update user info (Admin only)
- `DELETE /api/users/{user_id}` - Delete user (Admin only)


### Document Management
- `POST /api/documents/` - Upload a new document (Admin/Editor only)
- `GET /api/documents/` - List all documents
- `GET /api/documents/{document_id}` - Get a specific document
- `PUT /api/documents/{document_id}` - Update document metadata (Admin/Editor only)
- `DELETE /api/documents/{document_id}` - Delete a document (Admin only)

### Ingestion
- `GET /api/ingestion/` - List all ingestion logs (Admin/Editor only)
- `POST /api/ingestion/trigger` - Trigger document ingestion (Admin/Editor only)
- `GET /api/ingestion/status` - Get ingestion status (Admin/Editor only)



## Database Schema

- `users` - User accounts
- `documents` - Document metadata and file info
- `ingestion_logs` - Ingestion process logs

See `init.sql` for full schema.

## Security
- Passwords hashed with bcrypt
- JWT authentication
- Role-based access control
- CORS configuration

## Error Handling
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
