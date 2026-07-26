# Frontend Developer Handbook

## Project overview

This frontend is a React + TypeScript + Vite application for the EdgePulse setup portal. The current app is focused on authenticated admin workflows, especially customer management, and uses a feature-oriented structure with shared UI primitives, routing, state management, and data fetching patterns already in place.

The project is already organized around a practical pattern: pages compose feature-level components, feature hooks manage data fetching, and shared UI pieces handle the common look and feel.

## Tech stack

- React 19 with TypeScript
- Vite for development and build tooling
- React Router for routing
- TanStack Query for server-state management
- Zustand for lightweight client-side auth state
- React Hook Form + Zod for forms and validation
- Axios for API calls
- Tailwind CSS with shadcn/ui-style primitives
- Lucide React for icons

## Folder structure

- app: application shell, route setup, and app-level providers
- components: shared UI building blocks and reusable layout components
- features: feature-specific pages, components, hooks, services, and types
- hooks: shared hooks when they are not tied to a single feature
- layouts: layout wrappers such as the authenticated app shell
- lib: small helpers such as class name utilities
- services: shared API clients and storage helpers
- store: client state stores such as auth state
- styles: styling helpers and presets when needed
- types: shared domain and API types
- utils: small utility functions

## Feature-based architecture

The app is organized by feature rather than by technical concern. Each feature folder contains the pieces most closely related to that domain.

Example:

- features/auth
- features/customers
- features/dashboard

This keeps pages, components, hooks, services, and types close together and makes it easier to extend the app without scattering logic across the project.

## Components

Components are split between feature-specific and shared UI components.

- Feature components are local to a feature and handle domain behaviour.
- Shared components live in components/common and components/layout.
- UI primitives such as buttons, dialogs, inputs, tables, and sidebars are built around the shadcn/ui style and live under components/ui.

Use shared components for repeated UI patterns such as tables, toolbars, dialogs, and layout shell pieces.

## Hooks

Hooks are used to keep data fetching and component logic reusable.

- useCustomers encapsulates customer list fetching.
- useCreateCustomer wraps create mutation logic.
- Hooks should stay focused on one concern and keep component code readable.

Prefer hooks for query and mutation setup rather than placing fetch logic directly inside pages.

## Services

Feature services wrap API communication and keep the rest of the app from depending on Axios directly.

- authService handles login requests.
- customerService handles customer CRUD calls.

Keep services thin and return typed data or throw typed errors. Avoid mixing UI state concerns into service layer code.

## API layer

The shared API client is defined in services/api.ts.

It centralizes:

- base URL configuration
- JSON headers
- auth token injection through request interceptors

All feature services should use this shared API layer rather than creating their own Axios instances.

## React Query usage

TanStack Query is used for server state.

Current patterns:

- useQuery for fetching lists and paged data
- useMutation for create/update/delete operations
- query invalidation after mutations to refresh list data

The current convention is to keep query keys simple and feature-based, such as ["customers"].

## Zustand usage

Zustand is used for lightweight client-side state.

The auth store currently manages:

- access token
- user profile information
- login/logout actions

It is a good fit for simple global state and should remain lightweight. Avoid introducing more global stores unless a feature truly needs shared state.

## Dialog conventions

The app uses modal dialogs for create/edit and delete flows.

Current patterns:

- CustomerDialog handles create and edit in one component.
- DeleteCustomerDialog handles destructive actions with a confirmation pattern.
- Dialogs are generally controlled by local component state in the page that opens them.

Keep dialogs focused on one action and use the existing shadcn/ui dialog primitives.

## DataTable conventions

The shared DataTable component is used for list-style pages.

It provides:

- sortable columns
- column visibility controls
- simple row rendering
- loading and empty-state behavior

The table is built with TanStack Table and is already intended to be reused across feature pages.

## Toolbar conventions

The DataToolbar component is the shared header for list pages.

It usually contains:

- search input
- add button
- optional action buttons such as columns and export controls

Keep the toolbar consistent across list pages so the UI remains predictable.

## CRUD implementation pattern

The current customer feature shows the standard CRUD pattern used in the app:

1. Page owns local UI state such as search, dialog open state, and selected record.
2. A feature hook fetches data.
3. Feature services call the API.
4. Mutations invalidate relevant queries.
5. Dialog components manage create/edit/delete forms.

This is the pattern to reuse for new entities.

## Form conventions

Forms use React Hook Form with Zod validation where appropriate.

Current examples:

- LoginPage uses a schema-driven form with resolver-based validation.
- CustomerDialog uses a simple form with register-based inputs.

Prefer:

- schema-based validation for complex input rules
- clear labels and accessible form controls
- small, focused forms rather than overly large composite components

## Routing

Routing is handled by React Router with a simple structure:

- public routes such as /login
- protected routes wrapped by ProtectedRoute
- an AppLayout shell for authenticated pages

The route map is currently defined in app/AppRoutes.tsx. Keep additional routes grouped by feature and nested under the protected layout when they require authentication.

## Naming conventions

- Use PascalCase for components and pages.
- Use camelCase for hooks, variables, and functions.
- Use feature folders named after the domain, such as customers or auth.
- Use suffixes such as Page, Dialog, Service, and Hook when helpful.
- Keep file names aligned with the component or concern they represent.

## UI standards

The UI already follows a consistent, modern admin dashboard style.

Common patterns:

- rounded cards and panels
- clear spacing and section separation
- muted text for secondary information
- concise controls with accessible labels
- borders and subtle shadows for elevated surfaces

Keep visual changes consistent with the current dashboard and table-heavy layout.

## Tailwind conventions

Tailwind is used through utility classes directly in components.

Current style patterns include:

- flex, grid, and spacing utilities for layout
- rounded and border utilities for cards and panels
- text-muted-foreground and bg-background for theme-aware surfaces

Prefer utility classes in components for small UI adjustments. Keep styling local unless a repeated pattern clearly deserves a shared component.

## shadcn/ui usage

The UI is built around shadcn/ui-style primitives, especially:

- Button
- Input
- Dialog
- DropdownMenu
- Table
- Sidebar
- Card

These primitives are already imported from components/ui and are the preferred way to build new UI elements. Reuse them rather than introducing ad-hoc custom components.

## Feature development workflow

When adding a new feature, follow the current flow:

1. Create a feature folder under features.
2. Add the page and feature-specific components.
3. Add a service for API calls.
4. Add hooks for query and mutation logic.
5. Register the route in AppRoutes.
6. Add navigation in the layout/sidebar when needed.
7. Reuse shared primitives and common table/toolbar components.

## Best practices already used

- Keep pages focused and delegate data logic to hooks/services.
- Keep shared UI in reusable components.
- Use React Query for asynchronous server state.
- Use Zustand only for lightweight global state.
- Keep authentication state centralized in the auth store.
- Reuse the shared API client and common UI primitives.

## Minimal improvements

These improvements fit the existing architecture and avoid unnecessary abstraction:

- Add consistent loading and error states to more pages.
- Keep using the shared table and toolbar components for new list screens.
- Add small helper hooks for repeated mutation patterns if they become common.
- Improve form feedback with inline validation messaging and disabled states.
- Continue using feature folders rather than introducing a more complex app-wide structure.

## Common mistakes

- Do not put API requests directly into pages when a service/hook already fits.
- Do not create new global state stores for simple local UI state.
- Do not bypass the shared API client and add ad-hoc Axios usage in feature components.
- Do not build one-off table or dialog implementations when the shared versions already exist.
- Do not over-engineer with Redux, custom state libraries, or heavy abstraction layers unless the app clearly outgrows the current structure.

## Practical rule of thumb

If the change is a small-to-medium feature, keep it in the existing pattern: page -> feature hooks/services -> shared UI primitives -> route. That is the architecture this frontend already uses well.