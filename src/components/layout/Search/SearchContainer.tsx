import FilterSelect from './FilterSelect'
import SearchInput from './SearchInput'

function SearchContainer() {
  return (
    <div className="mt-6 md:mt-12 flex flex-col md:flex-row justify-between gap-10 px-4 md:px-10 lg:px-20">
      <SearchInput />
      <FilterSelect/>
    </div>
  )
}

export default SearchContainer
