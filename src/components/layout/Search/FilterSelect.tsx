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
import { ChevronDown } from 'lucide-react'

function FilterSelect() {
  return (
    <Root>
      <Trigger className="shrink-0 w-50 h-14 px-6 flex items-center justify-between rounded-sm drop-shadow text-preset-5-regular element-bg-primary-clr text-primary-clr capitalize cursor-pointer">
        <Value placeholder="Filter by Region" />
        <Icon asChild>
          <ChevronDown />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          position="popper"
          align="center"
          className="w-50 h-41 px-6  mt-2 rounded-sm element-bg-primary-clr drop-shadow"
        >
          <Viewport className="  max-h-fit flex flex-col gap-y-2 justify-center">
            {continents.map((continent) => (
              <Item
                key={continent}
                value={continent}
                className="cursor-pointer capitalize text-preset-5-regular text-primary-clr"
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
