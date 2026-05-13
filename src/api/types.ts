export interface Country {
  cca3: string
  name: {
    common: string
    official: string
    nativeName?: Record<string, { common: string }>
  }
  flags: { svg: string; png: string; alt?: string }
  population: number
  region: string
  subregion?: string
  capital?: string[]
  tld?: string[]
  currencies?: Record<string, { name: string; symbol: string }>
  languages?: Record<string, string>
  borders?: string[]
}

export type CountryCardType = Pick<
  Country,
  'cca3' | 'name' | 'population' | 'region' | 'capital' | 'flags'
>

export interface BorderCountry {
  cca3: string
  name: { common: string }
}
