import FilterSelect from './FilterSelect'
import SearchInput from './SearchInput'

type Props = {
  region?: string
  search?: string
}

function SearchContainer({region,search}:Props) {
  return (
    <div className="px-4 mt-6 md:px-10 lg:px-20">
      <div className="flex flex-col gap-10 justify-between  w-full max-w-[1280px] mx-auto md:mt-12 md:flex-row ">
        <SearchInput search={search} />
        <FilterSelect region={region} />
      </div>
    </div>
  )
}

export default SearchContainer
