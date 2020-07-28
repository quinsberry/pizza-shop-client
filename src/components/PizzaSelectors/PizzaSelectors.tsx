import React from 'react'
import cn from 'classnames'

import './PizzaSelectors.scss'

type TAvailableSelectorConstants = {
  thickness: Array<string>
  diameters: Array<number>
}

type Props = {
  types: Array<number>
  sizes: Array<number>
  activeType: number
  activeSize: number
  availableSelectorConstants: TAvailableSelectorConstants

  setActiveType: (value: number) => void
  setActiveSize: (value: number) => void
}

const Selectors: React.FC<Props> = ({
  types,
  sizes,
  activeType,
  activeSize,
  setActiveType,
  setActiveSize,
  availableSelectorConstants,
}) => {
  const { thickness, diameters } = availableSelectorConstants

  const handleSelect = (item: string = 'size', value: number) => {
    if (item === 'type') {
      return setActiveType(value)
    }
    return setActiveSize(value)
  }

  return (
    <div className="pizza-block__selector">
      <ul>
        {thickness.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={cn({ active: activeType === idx, disabled: !types.includes(idx) })}
            onClick={() => handleSelect('type', idx)}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {diameters.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={cn({ active: activeSize === item, disabled: !sizes.includes(item) })}
            onClick={() => handleSelect('size', item)}>
            {item} cm.
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Selectors
