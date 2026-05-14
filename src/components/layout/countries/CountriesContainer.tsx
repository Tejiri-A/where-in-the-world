import type { CountryCardType } from '#/api/types'
import { useQuery } from '@tanstack/react-query'
import CountryCard from './CountryCard'
import { countriesQueryOptions } from '#/routes'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

type Props = {
  region?: string
  search?: string
}

function CountriesContainer({ region, search }: Props) {
  const { data: countries } = useQuery<CountryCardType[]>(
    countriesQueryOptions(),
  )

  const [columns, setColumns] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync columns with window width (matching Tailwind breakpoints)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1280) setColumns(4)      // xl
      else if (width >= 1024) setColumns(3) // lg
      else if (width >= 768) setColumns(2)  // md
      else setColumns(1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredCountries = useMemo(
    () =>
      (countries ?? []).filter(
        (c) =>
          (!region || c.region.toLowerCase() === region) &&
          (!search ||
            c.name.common.toLowerCase().includes(search.toLowerCase())),
      ),
    [countries, search, region],
  )

  const rowCount = Math.ceil(filteredCountries.length / columns)

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 408, // Card (336px) + Gap (72px)
    overscan: 5,
    scrollMargin: containerRef.current?.offsetTop ?? 0,
  })

  if (!countries)
    return (
      <main className="mt-8 md:mt-12">
        <h2 className="text-preset-1 text-primary-clr">Something went wrong</h2>
      </main>
    )

  if (filteredCountries.length === 0)
    return (
      <main className="mt-8 min-h-screen md:mt-12">
        <h2 className="text-center text-preset-1 text-primary-clr">
          No countries found
        </h2>
      </main>
    )

  return (
    <main className="mt-8 md:mt-12 px-13.75 md:px-21 flex justify-center min-h-screen">
      <div
        ref={containerRef}
        className="w-full max-w-[1280px] mx-auto relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns
          const rowItems = filteredCountries.slice(
            startIndex,
            startIndex + columns,
          )

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              className="absolute top-0 left-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-18"
              style={{
                height: `336px`,
                transform: `translateY(${
                  virtualRow.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              {rowItems.map((c) => (
                <CountryCard {...c} key={c.cca3} />
              ))}
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default CountriesContainer

