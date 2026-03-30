---
trigger: always_on
description: Global standards for Next.js, TypeScript, feature-first modularity, and state management
---

---
name: Core Architecture & Strategy
description: Global standards for Next.js, TypeScript, folder structure, and state management
---

# Role & Context
You are an expert Senior Frontend Engineer working on **Just Pick Already** — a free, no-login, client-side decision-making tool built with Next.js. The app has no backend, no user accounts, and no server-side data storage. Everything runs in the browser.

---

## Technical Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode, no `any`, explicit return types)
- **Styling:** Tailwind CSS v4
- **Components:** HeroUI — import everything from `@heroui/react`
- **Animations:** Framer Motion
- **State:** Zustand (client-side only)
- **Persistence:** Session Storage via Zustand persist middleware
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **AI:** Groq API via Next.js API routes (server-side only, not yet implemented)

---

## Folder Structure

```
app/
├── api/
│   └── ai/[slug]/route.ts
├── moves/
│   └── [slug]/page.tsx
├── layout.tsx
└── page.tsx

src/
├── components/
│   └── composite/            # Wrappers around HeroUI components
│
├── modules/
│   └── moves/
│       └── decision-matrix/
│           ├── components/
│           ├── store/
│           ├── hooks/
│           ├── types.ts
│           └── index.ts
│
├── store/                    # Global Zustand stores only
├── hooks/                    # Global shared hooks only
├── lib/                      # Shared utilities, constants, animations
└── types/                    # Global shared TypeScript types

public/
└── mascot/
```

---

## File Naming Convention
- **Component files:** `component-name.tsx` (kebab-case always)
- **Store files:** `decision-matrix-store.ts`
- **Hook files:** `use-decision-matrix.ts`
- **Type files:** `types.ts` or `move-name-types.ts`
- **Pages and layouts:** follow Next.js convention (`page.tsx`, `layout.tsx`)

---

## Component Structure (Always Follow This)

Every component must be written exactly like this:

```typescript
'use client'
import React from 'react'

const ComponentName: React.FC = () => {
    return (
        <div>ComponentName</div>
    )
}

export default ComponentName
```

Rules:
- Always `'use client'` at the top unless it is explicitly a server component
- Always `import React from 'react'`
- Always `const Name: React.FC = () => {}` — never function declarations
- Always default export at the bottom
- Define props interface directly above the component if props are needed

```typescript
'use client'
import React from 'react'

interface Props {
    title: string
    onConfirm: () => void
}

const ConfirmCard: React.FC<Props> = ({ title, onConfirm }) => {
    return (
        <div>{title}</div>
    )
}

export default ConfirmCard
```

---

## HeroUI Usage
- Import all HeroUI components from `@heroui/react` — never from sub-packages
- Do not recreate components HeroUI already provides (Button, Input, Modal, Card, Badge, Tabs, Tooltip, etc.)
- There is no `src/components/ui/` folder — HeroUI replaces that entirely
- Colors are configured in `tailwind.config.ts` and used as Tailwind classes (`bg-primary`, `text-primary`, etc.) — never as CSS variables or hardcoded hex values

### Composite Components
When a HeroUI component is repeatedly used with the same wrapper, props, or behavior — extract it into `src/components/composite/`. Pass only the data or function it needs.

```typescript
// src/components/composite/section-card.tsx
'use client'
import React from 'react'
import { Card, CardBody } from '@heroui/react'

interface Props {
    children: React.ReactNode
    className?: string
}

const SectionCard: React.FC<Props> = ({ children, className }) => {
    return (
        <Card className={className}>
            <CardBody>{children}</CardBody>
        </Card>
    )
}

export default SectionCard
```

---

## State Management

### Zustand — Per Move
- Every move has its own store inside `src/modules/moves/<move-name>/store/`
- Store holds raw user input data and actions only — no computed values inside the store
- Computed values (scores, totals, winners) live in a hook inside the move's `hooks/` folder

### Session Storage Persistence
- Use Zustand `persist` middleware with `sessionStorage`
- Key naming: `jpa-<move-name>` (e.g., `jpa-decision-matrix`)

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useDecisionMatrixStore = create(
    persist(
        (set) => ({
            // state and actions here
        }),
        {
            name: 'jpa-decision-matrix',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
```

### Global Store
- `src/store/` is only for truly global state shared across the whole app
- Move-specific data never goes in the global store

---

## TypeScript Rules
- Strict mode on — no `any`, no type casting hacks
- All stores must be fully typed including actions
- Move slugs must use a union type, never raw strings:

```typescript
type MoveSlug =
    | 'decision-matrix'
    | 'eisenhower-matrix'
    | 'pre-mortem'
    | 'second-order-thinking'
    | 'regret-minimization'
    | '10-10-10-rule'
```

---

## Build Order (Always Follow This)
1. `types.ts` first
2. Zustand store second
3. Computed hook third
4. Components last
5. Wire into `app/` page only after all above are done

---

## What This App Is NOT
- No backend, no database, no user accounts
- No TanStack Query, no SWR, no data fetching libraries
- No `src/components/ui/` folder — HeroUI handles all base UI
- Do not add any library outside the tech stack without asking first