export async function getCountries() {
  // Switch endpoints based on whether a region is selected
  const url = `https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,capital,region`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Unable to fetch countries')
  return res.json()
}

export async function getCountryByCode(code: string) {
  const url = `https://restcountries.com/v3.1/alpha/${code}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Unable to fetch country')
  const data = await res.json()
  return data[0]
}

