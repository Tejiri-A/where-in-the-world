import { getCountries } from '#/api/countries'
import type { CountryCardType } from '#/api/types'
import CountriesContainer from '#/components/layout/countries/CountriesContainer'
import SearchContainer from '#/components/layout/Search/SearchContainer'
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
  pendingComponent: () => (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin size-20" />
    </div>
  ),
  errorComponent: ({error,reset}) => (
    <div className='min-h-screen'>
      <h2 className='text-preset-1 text-primary-clr'>There was an error: {error.message}</h2>
      <button onClick={() => reset()} className='px-1 py-2 border drop-shadow text-preset-5-regular text-primary-clr'>Try again</button>
    </div>
  ),
  pendingMinMs: 500
})

function Home() {
  const { region, search } = Route.useSearch()

  return <>
  <SearchContainer />
  <CountriesContainer region={region} search={search} />
  </>
  
  
}
