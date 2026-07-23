# EdgePulse

**Enterprise IoT Device Management Platform built with ASP.NET Core 8, React, TypeScript, PostgreSQL, and Clean Architecture.**

---

## 🚀 Project Banner

EdgePulse — a production-ready, extensible platform for managing and monitoring fleets of IoT devices across enterprises. Designed with Clean Architecture principles to support maintainability, testability, and secure multi-tenant operations.

Short description: EdgePulse helps teams onboard devices, manage gateways, visualize telemetry, and enforce role-based access control at scale.

---

## ✨ Features

- Authentication & Authorization (JWT)
- Role-Based Access Control (RBAC)
- Customer & User Management
- Role & Permission Management
- Gateway & Device Management
- Device Simulator (for testing and QA)
- Monitoring Dashboard with analytics
- Audit Logs & Reporting (planned)
- Background Jobs (planned)
- API Documentation (Swagger)

---

## 🧰 Tech Stack

- Backend: ASP.NET Core 8, C#, Entity Framework Core
- Database: PostgreSQL
- Frontend: React, TypeScript, Vite
- UI: Tailwind CSS, shadcn/ui
- Auth: JWT Authentication
- Architecture: Clean Architecture, RBAC
- Containerization: Docker

---

## 🏛️ Project Architecture

EdgePulse follows Clean Architecture to enforce separation of concerns between layers:

- Presentation: Web API controllers, OpenAPI/Swagger, front-end applications
- Application: Use-cases, commands/queries, DTOs, application services
- Domain: Entities, value objects, domain services, business rules
- Infrastructure: EF Core persistence, external integrations, background workers

This layout enables independent testing, easier reviews, and safer refactors.

---

## 📁 Repository Structure

Top-level folders:

- backend/             - ASP.NET Core 8 Web API (domain, application, infrastructure)
- frontend/
  - setup-app/         - Administration Portal (React + TypeScript)
  - dashboard-app/     - Monitoring Dashboard (React + TypeScript)
- database/            - Migrations, seeds and schema helpers
- docker/              - Docker Compose and container definitions
- docs/                - Design notes, architecture diagrams, operational guides
- scripts/             - Helpful automation scripts (migrations, CI helpers)
- README.md            - This file
- LICENSE              - Project license (add to declare license)

---

## 🗂️ Folder Structure (Detailed)

Example layout inside key folders:

backend/
- src/
  - EdgePulse.Api/           - Web API project (controllers, filters, swagger)
  - EdgePulse.Application/   - Application services, DTOs, commands/queries
  - EdgePulse.Domain/        - Entities, value objects, domain services
  - EdgePulse.Infrastructure/ - EF Core, repositories, external integrations
- tests/                     - Unit and integration tests

frontend/setup-app/
- src/                       - React source for Administration Portal
- public/                    - Static assets

frontend/dashboard-app/
- src/                       - React source for Monitoring Dashboard

database/
- migrations/                - EF or SQL migration files
- seeds/                     - Seed data

docker/
- compose/                   - docker-compose files for local and staging

---

## ✅ Prerequisites

Ensure the following are installed and available on your development machine:

- .NET 8 SDK
- Node.js (LTS) and npm or pnpm
- PostgreSQL (local or remote)
- Docker & Docker Compose (optional but recommended)
- Git

---

## ⚡ Getting Started

1. Clone the repository

   git clone https://github.com/OWNER/REPO.git
   cd REPO

   Replace OWNER/REPO with the repository owner and name.

2. Copy environment configuration templates and update secrets for backend and frontend (check each project for .env.example or appsettings templates).
3. Provision a PostgreSQL database and update the backend connection string.
4. Apply database migrations and seed data (see Database Setup).
5. Start backend and frontend services (see Running Backend / Running Frontend).

---

## 🖥️ Running Backend

From the repository root:

1. Change to the backend folder

   cd backend

2. Restore and build

   dotnet restore
   dotnet build

3. Apply EF Core migrations and run the API

   dotnet ef database update --project src/EdgePulse.Infrastructure --startup-project src/EdgePulse.Api
   dotnet run --project src/EdgePulse.Api

By default the API will listen on the ports configured in appsettings.Development.json or environment variables. Check those files for overrides.

---

## 🌐 Running Frontend

Administration Portal (setup-app)

1. cd frontend/setup-app
2. Install dependencies

   npm install
   # or
   pnpm install

3. Start the dev server

   npm run dev

Monitoring Dashboard (dashboard-app)

1. cd frontend/dashboard-app
2. Install dependencies
3. npm run dev

Each Vite app exposes a dev server (commonly on ports like 3000/5173). Check the app package.json scripts and env files for configured ports.

---

## 🗄️ Database Setup

The project uses PostgreSQL. Typical steps:

1. Create a development database and user in PostgreSQL.
2. Configure the connection string in backend (appsettings.Development.json or environment variables).
3. Run EF Core migrations from the backend folder (see Running Backend) to create schema and seed data.

Example connection string (placeholder):

- Host=localhost;Port=5432;Database=edgepulse_dev;Username=edgepulse_user;Password=your_password

Do not commit secrets to the repository. Use environment variables or secret management.

---

## 🐳 Docker Support

Docker Compose files are provided in docker/ to run a containerized development stack (API, frontends, PostgreSQL, etc.).

Quick start (example):

1. cd docker/compose
2. Copy configuration template: .env.example -> .env and edit values
3. Start services

   docker compose up --build

This will start services according to the compose configuration. Use docker compose logs or docker compose ps to inspect running containers.

---

## 📘 API Documentation

The backend exposes Swagger/OpenAPI documentation. When the API is running locally, navigate to /swagger (or the configured Swagger endpoint) to view and interact with endpoints, models, and request/response examples.

---

## 🔐 Authentication

EdgePulse uses JWT-based authentication with Role-Based Access Control (RBAC). Authentication flows, token issuance, and role/permission enforcement are implemented in the backend. Example roles and default permissions are seeded during initial setup (see database seeds).

For production, ensure secure key management for token signing and configure HTTPS.

---

## 🖼️ Screenshots

Placeholders — replace these with real screenshots as the UI matures.

- Administration Portal: (screenshot placeholder)
- Monitoring Dashboard: (screenshot placeholder)

---

## 🛣️ Roadmap

Planned items and ongoing work:

- Authentication & Authorization (completed)
- Customer Management
- User Management
- Role & Permission Management
- Gateway Management
- Device Management
- Device Simulator
- Dashboard with Analytics
- Email Onboarding
- Audit Logs
- Reports
- Background Jobs
- API Documentation using Swagger (completed)

---

## 🤝 Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository and create a feature branch: feature/your-feature
2. Keep commits focused and atomic; write descriptive commit messages
3. Add tests for new behavior and ensure existing tests pass
4. Open a pull request with a description of changes and relevant context

See CONTRIBUTING.md (if present) for contribution guidelines and the code of conduct.

---

## 📝 License

A LICENSE file is not included in this repository. Add a LICENSE file to clearly state the terms under which the project is distributed.

---

## 👤 Author

EdgePulse — maintained by the project contributors.

Contact: (replace with maintainer or organization contact information)
