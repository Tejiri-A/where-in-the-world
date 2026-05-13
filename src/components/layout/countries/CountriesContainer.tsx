import type { CountryCardType } from '#/api/types'
import { useQuery } from '@tanstack/react-query'
import CountryCard from './CountryCard'
import { countriesQueryOptions } from '#/routes'

type Props = {
  region?: string
  search?: string
}

function CountriesContainer({ region, search }: Props) {
  const { data: countries } = useQuery<CountryCardType[]>(
    countriesQueryOptions(),
  )

  if(!countries) return (
    <main className="mt-8 md:mt-12">
      <h2 className="text-preset-1 text-primary-clr">Something went wrong</h2>
    </main>
  )

  const filteredCountries = countries
    .filter((c) => !region || c.region.toLowerCase() === region)
    .filter(
      (c) =>
        !search || c.name.common.toLowerCase().includes(search.toLowerCase()),
    )

  if (!filteredCountries)
    return (
      <main className="mt-8 md:mt-12">
        <h2 className="text-preset-1 text-primary-clr">No countries found</h2>
      </main>
    )
  return (
    <main className="mt-8 md:mt-12 px-13.75 md:px-21 flex justify-center">
      <div className="min-w-[265px] max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-18">
        {filteredCountries.map((c) => (
          <CountryCard {...c} key={c.cca3} />
        ))}
      </div>
    </main>
  )
}

export default CountriesContainer
