import { SearchIcon } from 'lucide-react'

function SearchInput() {
  return (
    <div className="flex relative justify-start items-center px-8 w-full h-14 rounded-sm drop-shadow element-bg-primary-clr max-w-120">
      <div className="flex gap-6 items-center h-5 text-grey-400 dark:text-white">
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
