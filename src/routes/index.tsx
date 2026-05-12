import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-preset-1">Welcome to TanStack Start</h1>
      <p className="text-preset-6-semibold">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}
