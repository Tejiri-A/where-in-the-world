import type { CountryCardType } from '#/api/types'
import { Link } from '@tanstack/react-router'

function CountryCard(Country: CountryCardType) {
  const { cca3, flags, name, population, region, capital } = Country
  return (
    <Link to="/country/$code" params={{ code: cca3 }}>
      <div className="grid overflow-hidden grid-rows-2 rounded-sm drop-shadow w-66 h-84 element-bg-primary-clr">
        <picture>
          <img
            src={flags.png}
            alt={flags.alt}
            className="object-contain size-full"
            loading="lazy"
          />
        </picture>
        <div className="flex items-center px-6 pt-5.5 pb-12 text-primary-clr">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-preset-3">{name.common}</h2>
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold leading-4">
                Population: <span className="font-light">{population}</span>
              </p>
              <p className="text-sm font-semibold leading-4">
                Region: <span className="font-light">{region}</span>
              </p>
              <p className="text-sm font-semibold leading-4">
                Capital: <span className="font-light">{capital}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
