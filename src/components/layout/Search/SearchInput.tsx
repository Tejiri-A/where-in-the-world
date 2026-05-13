import { SearchIcon } from 'lucide-react'


function SearchInput() {
  return (
    <div className="element-bg-primary-clr px-8 flex items-center justify-start h-14 relative w-full max-w-120 rounded-sm drop-shadow">
      <div className="h-5 flex items-center gap-6 text-grey-400  dark:text-white ">
        <SearchIcon className="size-5" />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for a country..."
          className="text-preset-5-regular placeholder:text-grey-400"
        />
      </div>
    </div>
  )
}

export default SearchInput