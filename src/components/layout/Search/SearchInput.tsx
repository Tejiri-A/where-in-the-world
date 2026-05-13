import { useNavigate } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'

function SearchInput() {
  const navigate = useNavigate({ from: '/' })
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({ ...prev, search: e.target.value }),
      replace: true,
    })
  }
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
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchInput
