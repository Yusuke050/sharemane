# Repository Guidelines

## Project Structure

- `frontend/`: Next.js (React + TypeScript) UI. Main code in `frontend/src/`, static assets in `frontend/public/`. Storybook config in `frontend/.storybook/`. MSW mocks live alongside UI code.
- `backend/`: Go API server. Entrypoints in `backend/cmd/` or top‑level `server.go`, domain/app code in `backend/internal/`, configuration in `backend/config/`, and database/docker assets in `backend/docker/` and `backend/docker-compose.yml`.
- Docs: root `README.md`, API details in `backend/API_SPEC.md`, and UI API needs in `API_REQUIREMENTS.md`.

## Build, Test, and Development Commands

Frontend (use `pnpm`):
- `cd frontend && pnpm install`: install deps.
- `pnpm dev`: run Next.js dev server.
- `pnpm build && pnpm start`: production build and run.
- `pnpm lint`: ESLint checks.
- `pnpm test`: Vitest unit tests.
- `pnpm storybook`: component explorer.

Backend:
- `cd backend && go mod download`: fetch deps.
- `go run server.go`: run API locally.
- `go test ./...`: run Go tests.
- `docker-compose up -d`: start PostgreSQL (see root `README.md` for connect/teardown).

## Coding Style & Naming

- Frontend: TypeScript + React functional components. Prefer 2‑space indentation, `camelCase` for variables/functions, `PascalCase` for components. Follow ESLint/Tailwind conventions.
- Component rule: create a folder per component and place `index.tsx` and `index.css` inside.
- Backend: Go standard formatting (`gofmt`), exported identifiers in `PascalCase`, internal packages in `backend/internal/`.

## Testing Guidelines

- Frontend: Vitest (`*.test.ts`/`*.test.tsx`) colocated near code; MSW for API mocking.
- Backend: standard `testing` package (`*_test.go`) near the package under test.

## Commit & Pull Request Guidelines

- Commits: keep messages short and descriptive; Japanese or English is fine. If helpful, prefix scope like `frontend:` or `backend:`.
- PRs: include a brief summary, linked issue (if any), and UI screenshots/GIFs for frontend changes. Note DB/schema changes explicitly.

## Configuration & Security

- Do not commit secrets in `.env`; use `.env.example` as a template.
- When working with designs, use the Figma MCP tools referenced in `frontend/.cursor/rules/project.mdc`.

