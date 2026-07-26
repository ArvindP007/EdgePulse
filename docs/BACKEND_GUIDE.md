# Backend Developer Handbook

## Project overview

EdgePulse backend is a layered ASP.NET Core API built around customer management, authentication, and role-based access. The current implementation is intentionally simple: controllers expose endpoints, application-layer interfaces define capabilities, infrastructure services contain the concrete implementation, and EF Core persists the domain model.

The project is already following a practical structure for a small-to-medium backend. Keep the same layering when adding features.

## Solution architecture

The solution is split into five main layers:

- API: host layer, controllers, middleware, Swagger, authentication setup, and request pipeline.
- Application: DTOs, interfaces, shared models/results, authorization constants, and service contracts.
- Domain: entities, enums, and core business concepts.
- Infrastructure: concrete services, authentication helpers, password hashing, JWT generation, and seeding.
- Persistence: EF Core context, entity configurations, migrations, and database wiring.

A typical request flows like this:

1. Controller receives an HTTP request.
2. Controller calls an application-facing service interface.
3. Infrastructure service executes the business logic with EF Core.
4. Persistence writes changes through the DbContext.
5. The controller returns a standard HTTP response.

## Project responsibilities

- API project: exposes REST endpoints and configures the ASP.NET Core pipeline.
- Application project: defines what the system can do without tying implementation to a specific framework.
- Domain project: holds the core entities and business vocabulary.
- Infrastructure project: contains the concrete implementations used by the API.
- Persistence project: owns EF Core configuration and database schema evolution.

## Folder structure and conventions

- Controllers: endpoint entry points. Keep them thin and focused on HTTP concerns.
- DTOs: request/response contract objects. Put them near the feature they belong to.
- Common: reusable models, settings, authorization helpers, and result wrappers.
- Services: concrete implementations of application interfaces.
- Authentication: JWT and password hashing implementations.
- Seed: bootstrap data and initial roles/permissions.
- Configurations: EF Core entity configuration classes.
- Context: the single DbContext for the application.
- Migrations: schema changes managed by EF Core.

## Entity conventions

- Domain entities inherit from BaseEntity.
- BaseEntity provides Id, CreatedOnUtc, UpdatedOnUtc, IsDeleted, CreatedBy, and UpdatedBy.
- Soft delete is applied globally through the DbContext query filter.
- Navigation properties are defined as collections and reference properties on the owning side.
- Use simple, descriptive names such as Customer, User, Role, Permission, Device, and Gateway.

## DTO conventions

- DTOs are simple data containers used for input and output contracts.
- Request DTOs are named like CreateCustomerRequest, UpdateCustomerRequest, and LoginRequest.
- Response/output DTOs are named like CustomerDto and LoginResponse.
- Validation attributes are used directly on DTOs for basic rules.
- Keep DTOs lightweight; avoid embedding domain logic in them.

## Service conventions

- Application interfaces define service contracts in the Application layer.
- Concrete implementations live in Infrastructure/Services.
- Services are registered with dependency injection as scoped.
- Services should contain orchestration logic but keep database access through the DbContext.
- Use async/await and return DTOs or simple result objects rather than exposing entities directly to controllers.

## Controller conventions

- Controllers inherit from ControllerBase and are decorated with [ApiController].
- Route templates use the pattern api/[controller].
- Controllers should map HTTP concerns only and delegate work to services.
- Use standard action results: Ok, CreatedAtAction, NoContent, NotFound.
- Keep authorization at the controller or action level rather than inside the service layer.

## Dependency Injection

The application uses the standard ASP.NET Core DI container.

- AddPersistence registers the DbContext and database provider.
- AddInfrastructure registers authentication services, business services, and seeding.
- Services are registered as scoped, which fits the current EF Core usage pattern.
- Keep constructor injection as the default pattern.

## EF Core usage

- The application uses EF Core with PostgreSQL through Npgsql.
- The DbContext is ApplicationDbContext.
- Entity configuration is centralized in the Persistence/Configurations folder.
- The DbContext applies a soft-delete filter automatically to all BaseEntity-derived types.
- Audit timestamps are set automatically in SaveChanges/SaveChangesAsync.
- Reads should use AsNoTracking where the entity is not being modified.

## Database configurations

- The connection string is configured under ConnectionStrings:DefaultConnection.
- The project uses migrations for schema changes, so new tables/columns should be introduced through EF Core migrations.
- Base entity configuration handles common defaults such as primary keys and soft-delete behavior.
- Keep column constraints and indexes close to the entity configuration rather than spreading them across the codebase.

## Authentication

Authentication is implemented with JWT bearer tokens.

- The API configures JWT authentication in Program.cs.
- Login uses a user email and password, then issues a token if the credentials are valid.
- Password hashing is handled with BCrypt.
- JWT claims include the user identifier, email, role, roleId, and permission claims.
- The token is configured with issuer, audience, signing key, and expiration.

## Authorization

Authorization is currently role- and permission-based.

- Roles are defined in the Domain constants.
- Permissions are defined in the Application authorization layer.
- The login flow loads the user role and permission claims for the token.
- Controllers use [Authorize] to protect endpoints.
- For new features, add the required permission constants first and then enforce them through the existing authorization model.

## Multi-tenant implementation

The project shows an early multi-tenant direction, but it is not yet a full runtime tenancy system.

- There is a migration named MultiTenantFoundation, which indicates the project is moving toward a tenant-aware model.
- Customers are already a natural boundary for tenant-like scoping in the domain model.
- The current code does not yet implement a tenant resolver, tenant filter, or tenant-aware service context.

For current work, keep using Customer as the logical boundary for tenant-scoped features and avoid introducing a new abstraction until the project has a clear tenant strategy.

## Validation

Validation is currently lightweight and practical.

- Use DataAnnotations on DTOs for common rules such as Required, MinLength, and EmailAddress.
- Keep validation close to the contract that enters the system.
- Do not introduce FluentValidation unless the validation logic grows significantly.
- Add service-layer checks for business rules that are not purely input validation.

## Exception handling

The API uses a centralized exception middleware.

- Unhandled exceptions are logged and returned as a problem+json response.
- Services can throw KeyNotFoundException or UnauthorizedAccessException for common cases.
- Keep exception handling centralized rather than scattering try/catch blocks across controllers.
- For minimal improvement, map specific exceptions to explicit HTTP responses in the middleware.

## API conventions

- Prefer RESTful resource naming and conventional HTTP verbs.
- Return DTOs or simple payloads rather than exposing entities directly.
- Use IActionResult when a response can vary by outcome such as NotFound or NoContent.
- Follow consistent route names and keep controller actions focused.

## Naming conventions

- Use PascalCase for classes, methods, properties, and namespaces.
- Use camelCase for local variables and private fields.
- Prefix interfaces with I.
- Use Service for implementation classes and Request/Response/Dto for DTOs.
- Keep folder names aligned with responsibility, not implementation detail.

## Feature creation workflow

When adding a new feature, follow the existing flow:

1. Define or update the domain entity if the feature needs new data.
2. Add EF Core configuration for the entity in Persistence/Configurations.
3. Add DTOs under the relevant Application/DTOs or feature folder.
4. Define an application interface for the feature.
5. Implement the service in Infrastructure/Services.
6. Register the service in Infrastructure/DependencyInjection.cs.
7. Add a controller action in API/Controllers.
8. Add authorization and validation rules where needed.

## Best practices already used

- Keep the API layer thin.
- Use dependency injection and constructor injection consistently.
- Keep EF Core access inside the service layer.
- Prefer interfaces in Application and implementations in Infrastructure.
- Use shared authorization constants rather than hard-coded strings.
- Apply soft delete and audit behavior centrally.

## Standard improvements with minimal changes

These changes fit the current architecture and avoid unnecessary abstraction:

- Add explicit handling for KeyNotFoundException and UnauthorizedAccessException in the exception middleware.
- Add optional CancellationToken parameters to service methods and controller actions.
- Keep using DTOs and service interfaces, but add simple service-level validation for business rules.
- Continue using the existing DbContext and service pattern instead of introducing repositories.
- Add more permission checks to new endpoints rather than broadening access.
- Keep new features small and focused on one responsibility.

## Common mistakes to avoid

- Do not put EF Core logic directly inside controllers.
- Do not create repository abstractions for simple CRUD.
- Do not bypass the soft-delete filter by querying entities without the shared context behavior.
- Do not hard-code role and permission names in multiple places.
- Do not add new abstractions such as CQRS, MediatR, or generic repositories unless the project clearly outgrows the current structure.
- Do not expose domain entities directly from controllers or services when DTOs are already in place.

## Practical rule of thumb

If the change is a small business feature, keep it in the existing pattern: controller -> service -> DbContext -> EF Core -> response DTO. That is the architecture this backend already uses well.