import { getCountries } from '#/api/countries'
import type { CountryCardType } from '#/api/types'
import CountriesContainer from '#/components/layout/countries/CountriesContainer'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import z from 'zod'

const searchSchema = z.object({
  search: z.string().optional(),
  region: z.string().optional(),
})

export const countriesQueryOptions = () =>
  queryOptions<CountryCardType[]>({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
    staleTime: Infinity,
  })

export const Route = createFileRoute('/')({
  validateSearch: (search) => searchSchema.parse(search),
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(countriesQueryOptions())
  },
  component: Home,
})

function Home() {
  const { region, search } = Route.useSearch()

  return <CountriesContainer region={region} search={search} />
}
