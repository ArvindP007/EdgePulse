# EdgePulse AI Development Rulebook

## 1. Project Summary

EdgePulse is a full-stack application with:

- an ASP.NET Core backend organized in layered projects
- a React + TypeScript + Vite frontend for the setup portal
- customer management, authentication, authorization, and role-based access as the current core domain

The repository already has a clear direction: keep the solution simple, layered, and consistent. AI-generated code should follow the existing architecture instead of introducing new patterns.

## 2. Development Philosophy

- Prefer the architecture that already exists over inventing a new one.
- Follow the current project style first, framework conventions second.
- Keep changes small, focused, and production-ready.
- Reuse existing components, services, DTOs, and patterns before creating anything new.
- Optimize for consistency over creativity.
- Avoid over-engineering unless a requirement clearly demands it.

## 3. Architecture Rules

- Keep the backend layered: API -> Application -> Domain -> Infrastructure -> Persistence.
- Keep the frontend feature-based: page -> feature hooks/services -> shared UI primitives.
- Do not introduce Repository Pattern, Generic Repository, CQRS, MediatR, or similar abstractions unless the project already uses them.
- Do not add new architectural layers for small features.
- Preserve the current separation of concerns.

## 4. Folder Structure Rules

Follow the current folders exactly:

- Backend:
  - API/Controllers
  - Application/DTOs, Interfaces, Common
  - Domain/Entities, Enums, Constants
  - Infrastructure/Authentication, Services, Seed
  - Persistence/Context, Configurations, Migrations

- Frontend:
  - app
  - components/common, components/layout, components/ui
  - features/<feature>/components, hooks, pages, services, types
  - layouts
  - services
  - store
  - types
  - utils

When adding new code, place it in the closest existing folder instead of creating a new top-level structure.

## 5. Backend Rules

- Keep controllers thin and focused on HTTP concerns.
- Put business logic in services implemented in the Infrastructure layer.
- Keep application interfaces in the Application layer and concrete implementations in Infrastructure.
- Use the DbContext from the Persistence layer for database access.
- Return DTOs or simple response objects from services; do not expose domain entities directly to controllers.
- Prefer async/await and simple service methods over large procedural code blocks.
- Keep new backend changes aligned with the existing customer/auth workflow.

## 6. Frontend Rules

- Keep pages focused and delegate data logic to hooks and services.
- Keep UI components small and composable.
- Reuse shared UI primitives before creating new ones.
- Keep feature-specific logic inside the relevant feature folder.
- Avoid placing API calls directly in pages when a service or hook already fits.
- Prefer simple, readable React components over clever abstractions.

## 7. UI Rules

- Follow the current admin-dashboard look and feel.
- Use the existing shadcn/ui-style primitives whenever possible.
- Favor spacing, borders, rounded corners, and muted text consistent with the current UI.
- Keep UI changes consistent with the existing layout and visual language.
- Use Tailwind utility classes directly in components for local styling.

## 8. Naming Rules

- Use PascalCase for classes, components, and pages.
- Use camelCase for variables, functions, and hooks.
- Use interface names prefixed with I for backend contracts.
- Use suffixes such as Page, Dialog, Service, Hook, and DTO where appropriate.
- Use feature-based names such as CustomerPage, CustomerDialog, useCustomers, customerService.
- Keep names descriptive and aligned with the existing project vocabulary.

## 9. Code Generation Rules

- Analyze the existing implementation before generating code.
- Match the local style, indentation, and naming already used in the repository.
- Do not generate code that looks correct but does not fit the current architecture.
- Prefer minimal edits to existing files over broad rewrites.
- Generate production-ready code with proper typing and basic validation.
- Keep files small and focused.
- Keep functions focused on a single responsibility.

## 10. Feature Creation Workflow

When implementing a new feature, follow this sequence:

1. Inspect the existing feature pattern in the same domain.
2. Add or update the domain entity if needed.
3. Add EF Core configuration if persistence changes are required.
4. Add DTOs and service contracts in the Application layer.
5. Implement the service in Infrastructure or the relevant frontend feature service.
6. Register new services in the existing dependency injection setup.
7. Add a controller or page for the feature.
8. Reuse existing shared UI components and common patterns.
9. Add validation and error handling in the existing style.

## 11. Reusable Component Rules

- Reuse shared components from components/common and components/layout.
- Reuse table, toolbar, dialog, button, input, and sidebar primitives from components/ui.
- Do not create duplicate versions of the same UI pattern.
- If a UI pattern is repeated across features, extract it into a shared component.
- Keep reusable components general but still simple.

## 12. Reusable Service Rules

- Reuse the shared API client from services/api.ts for backend communication.
- Keep feature services thin and focused on one domain.
- Reuse existing service patterns before adding new helpers.
- Avoid scattering network logic across components.
- Prefer typed requests and typed responses.

## 13. DataTable Standards

- Use the shared DataTable component for list screens.
- Keep columns defined in a feature-specific columns file when the table is feature-specific.
- Preserve sorting, visibility toggles, and loading states.
- Use the shared toolbar for search and actions where appropriate.
- Keep table behavior consistent with the customer list implementation.

## 14. Dialog Standards

- Use the shared dialog primitives for create, edit, and delete flows.
- Keep dialogs focused on one operation.
- Use local component state for dialog visibility and selected item.
- Reuse the current create/edit/delete pattern used by the customer feature.
- Keep dialog content simple and readable.

## 15. API Standards

- Use RESTful endpoints and conventional HTTP verbs.
- Keep controllers routing under api/[controller].
- Return DTOs and standard IActionResult responses.
- Use the shared frontend API client rather than custom Axios wrappers.
- Keep API changes consistent with the existing customer and auth endpoints.

## 16. React Query Standards

- Use TanStack Query for server state.
- Use useQuery for fetches and useMutation for create/update/delete operations.
- Invalidate relevant queries after mutations.
- Keep query keys simple and feature-based.
- Avoid duplicating query logic in multiple components.

## 17. Zustand Standards

- Use Zustand only for lightweight client-side state.
- Keep the auth store as the primary global state example.
- Do not replace local component state with global state unless the state is genuinely shared.
- Keep stores simple and focused on a narrow concern.

## 18. EF Core Standards

- Use the existing ApplicationDbContext and entity configurations.
- Keep entity configuration in Persistence/Configurations.
- Use the BaseEntity pattern and the soft-delete filter already implemented.
- Add migrations for schema changes rather than editing the database manually.
- Keep audit fields and timestamps centralized in the DbContext.

## 19. Authentication Rules

- Keep authentication based on the current JWT bearer flow.
- Reuse the existing auth service and JWT token handling pattern.
- Preserve the current login flow and token storage approach.
- Do not introduce a new auth mechanism unless the project already requires it.

## 20. Authorization Rules

- Keep authorization role- and permission-based.
- Reuse the existing permission constants and role definitions.
- Apply authorization at the controller or route level in the current style.
- Do not hard-code role or permission names in multiple places.

## 21. Multi-tenant Rules

- The project shows an early multi-tenant direction, but the current runtime implementation is not fully established.
- Do not invent a large tenant framework unless the requirement explicitly calls for it.
- Keep new features aligned with the existing customer-oriented domain boundaries.
- Avoid adding a new abstraction for tenancy until the architecture is clearly defined.

## 22. Error Handling Rules

- Keep exception handling centralized in the API middleware.
- Use clear, simple exceptions such as KeyNotFoundException or UnauthorizedAccessException where appropriate.
- Surface user-facing errors cleanly in the frontend with existing patterns.
- Avoid scattering try/catch blocks across controllers and components.

## 23. Validation Rules

- Use DataAnnotations on backend DTOs for simple input validations.
- Use React Hook Form and Zod on the frontend for form validation where appropriate.
- Keep validation close to the input boundary.
- Avoid introducing FluentValidation or more complex validation abstractions unless the existing solution clearly needs them.

## 24. Performance Guidelines

- Use AsNoTracking for reads when entities are not being modified.
- Use query invalidation and loading states rather than unnecessary re-fetches.
- Keep list and table rendering efficient and avoid redundant state updates.
- Avoid premature optimization and keep the current simple structure intact.

## 25. Standard Practices

- Keep code readable and straightforward.
- Use existing patterns over new ones.
- Keep files small and avoid huge components.
- Keep feature work aligned with the current domain and UI patterns.
- Prefer practical implementation over theoretical design.

## 26. Common Mistakes

- Do not place EF Core logic directly in controllers.
- Do not create repository abstractions for simple CRUD.
- Do not create duplicate UI components for patterns already covered by shared components.
- Do not add Redux or a large state framework where Zustand already fits.
- Do not add unnecessary abstractions such as CQRS, MediatR, or heavy service layers for small features.
- Do not bypass existing API, query, and UI conventions.

## 27. AI Checklist before writing any code

Before generating code, verify all of the following:

- Analyze the existing code before generating anything.
- Reuse existing components.
- Reuse existing services.
- Follow the existing folder structure.
- Follow naming conventions.
- Keep the architecture simple.
- Keep files small.
- Keep functions focused.
- Never duplicate code.
- Never introduce new architecture unless required.
- Prefer consistency over creativity.
- Generate production-ready code.
- Minimize changes to existing files.
- Use existing UI patterns.
- Follow project conventions first, framework conventions second.

## Final Rule

When in doubt, copy the pattern already used by the project: thin controller or page, focused service or hook, shared UI primitive, and simple data flow. That is the safest and most consistent approach for EdgePulse.