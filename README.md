# Geriatric Care Assessment Form

One-page assessment form for a visiting nurse. Built with React 19, TypeScript, Mantine, and Zod.

## How to run

```bash
yarn install
yarn dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Useful scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Start the local app |
| `yarn test` | Format/lint/typecheck, unit tests, and production build |
| `yarn vitest` | Run Vitest only |
| `yarn build` | Typecheck and build for production |
| `yarn preview` | Preview the production build locally |

## What was built

- 10-field Geriatric Care Assessment form in `src/features/assessment/`
- Zod schema with the assignment rules and messages (`schema.ts`)
- Validation via Mantine `schemaResolver` on blur and submit
- Fake save (~800 ms) with loading state and a success alert showing the parsed payload
- “Load sample patient” fixture with invented data only
- Schema boundary tests (age at 60 vs one day short) and a form submit test

## Deployed URL

_Not deployed yet._ After deploy, put the public URL here, for example:

```text
https://your-app.vercel.app
```

## Unfinished / notes

- **Deployment** — app builds locally (`yarn build` / `yarn preview`) but is not published yet. Next step: deploy to Vercel, Netlify, or similar and add the URL above.
- **README time estimate** — update the time below with your real effort if it differs.
- No backend, auth, routing beyond the template home page, or custom styling by design (out of scope for the assignment).

## Time spent

Roughly **2–2.5 hours** on the form, schema wiring, tests, and cleanup against the assignment.

## Stack

- React 19 + TypeScript
- Mantine (`@mantine/core`, `@mantine/form`, `@mantine/dates`)
- Zod 4
- Vite / Vitest (Mantine Vite template)
