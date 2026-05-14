import { continents } from '#/lib/constants'
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
} from '@radix-ui/react-select'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

function FilterSelect({region} : {region?:string}) {
  const navigate = useNavigate({ from: '/' })

  const handleRegionChange = (region?: string) => {
    navigate({
      search: (prev) => ({ ...prev, region }),
      replace: true,
    })
  }

  return (
    <Root onValueChange={handleRegionChange} value={region}>
      <Trigger className="flex justify-between items-center px-6 h-14 capitalize rounded-sm drop-shadow cursor-pointer shrink-0 w-50 text-preset-5-regular element-bg-primary-clr text-primary-clr focus-ring">

        <Value placeholder="Filter by Region" />
        <Icon asChild>
          <ChevronDown />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          position="popper"
          align="center"
          className="px-6 mt-2 rounded-sm drop-shadow w-50 h-41 element-bg-primary-clr"
        >
          <Viewport className="flex flex-col gap-y-2 justify-center">
            {continents.map((continent) => (
              <Item
                key={continent}
                value={continent}
                className="capitalize cursor-pointer text-preset-5-regular text-primary-clr"
              >
                <ItemText>{continent}</ItemText>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}

export default FilterSelect
