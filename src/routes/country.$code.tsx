import { getCountryByCode } from '#/api/countries'
import type { Country } from '#/api/types'
import CountryInformation from '#/components/CountryInformation'

import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

import { ArrowLeft } from 'lucide-react'

const singleCountryQuery = (code: string) =>
  queryOptions<Country>({
    queryKey: ['country', code],
    queryFn: () => getCountryByCode(code),
  })

export const Route = createFileRoute('/country/$code')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { code } }) => {
    return queryClient.ensureQueryData(singleCountryQuery(code))
  },
})

function RouteComponent() {
  const { code } = Route.useParams()
  const { data: country } = useSuspenseQuery(singleCountryQuery(code))

  const {
    cca3,
    flags,
    name,
    population,
    region,
    borders,
    capital,
    languages,
    subregion,
    tld,
    currencies,
  } = country

  const nativeName = name.nativeName
    ? Object.values(name.nativeName)[0]?.common
    : name.common

  const currenciesString = currencies
    ? Object.values(currencies)
        .map((c) => c.name)
        .join(', ')
    : 'N/A'

  const languagesString = languages
    ? Object.values(languages).join(', ')
    : 'N/A'

  const capitalString = capital?.join(', ') || 'N/A'
  const tldString = tld?.join(', ') || 'N/A'

  return (
    <main className="px-7 mt-10 min-h-screen lg:mt-20 text-primary-clr md:px-25 lg:px-10">
      <div className="space-y-16 md:space-y-14 lg:space-y-20 max-w-[1280px] mx-auto w-full">
        <Link
          className="flex gap-2 justify-center items-center h-10 drop-shadow w-34 rounded-xs element-bg-primary-clr text-preset-4-light"
          to="/"
        >
          <ArrowLeft />
          Back
        </Link>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <picture className="overflow-hidden flex-1 lg:w-[401px]  md:h-102 lg:h-100 rounded-xl">
            <img
              src={flags.svg}
              alt={flags.alt}
              className="object-cover size-full"
            />
          </picture>
          <div className="flex-1 space-y-4">
            <h2 className="text-preset-2 md:text-preset-1">{name.common}</h2>

            <div className="space-y-8">
              {/* country details */}
              <div className="flex flex-col gap-y-8 md:flex-row md:justify-between">
                <div>
                  <CountryInformation label="Native Name" data={nativeName} />
                  <CountryInformation label="Population" data={population} />
                  <CountryInformation label="Region" data={region} />
                  <CountryInformation label="Sub Region" data={subregion} />
                  <CountryInformation label="Capital" data={capitalString} />
                </div>

                <div>
                  <CountryInformation
                    label="Top Level Domain"
                    data={tldString}
                  />
                  <CountryInformation
                    label="Currencies"
                    data={currenciesString}
                  />
                  <CountryInformation
                    label="Languages"
                    data={languagesString}
                  />
                </div>
              </div>
              {/* border countries */}
              <div className="flex flex-col gap-4 md:flex-row">
                <p className="text-base font-semibold leading-6">
                  Border Countries:
                </p>
                <div className="flex gap-4 items-center">
                  {borders
                    ? borders?.map((b) => (
                        <div
                          key={b}
                          className="flex justify-center items-center w-24 h-7 drop-shadow rounded-xs element-bg-primary-clr text-preset-6-light md:text-preset-5-light"
                        >
                          {b}
                        </div>
                      ))
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
