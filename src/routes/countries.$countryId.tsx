import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/countries/$countryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {countryId} = Route.useParams()
  return <div>Hello {countryId}!</div>
}
