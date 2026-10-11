# Geriatric Care Assessment Form

One-page assessment form for a visiting nurse. Built with React 19, TypeScript, Mantine, and Zod.

- **Live app:** [https://geriatric-care-assessment.vercel.app/](https://geriatric-care-assessment.vercel.app/)
- **Repository:** [https://github.com/krishnamahtocodingworkx/Geriatric-Care-Assessment](https://github.com/krishnamahtocodingworkx/Geriatric-Care-Assessment)

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

[https://geriatric-care-assessment.vercel.app/](https://geriatric-care-assessment.vercel.app/)

## Notes

No backend, authentication, extra routing, or custom styling — those were out of scope for the assignment.

## Time spent

Roughly **2–2.5 hours** on the form, schema wiring, tests, deploy setup, and cleanup against the assignment.

## Stack

- React 19 + TypeScript
- Mantine (`@mantine/core`, `@mantine/form`, `@mantine/dates`)
- Zod 4
- Vite / Vitest (Mantine Vite template)
- Deployed on Vercel
