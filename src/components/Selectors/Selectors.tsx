import React from 'react'
import cn from 'classnames'

import './Selectors.scss'

type Props = {
  types: Array<number>
  sizes: Array<number>
}

const Selectors: React.FC<Props> = ({ types, sizes }) => {
  const [constants] = React.useState({
    thickness: ['thin', 'tradition'],
    diameters: [26, 30, 40],
  })

  const [activeType, setActiveType] = React.useState(types[0])
  const [activeSizes, setActiveSizes] = React.useState(sizes[0])

  const handleSelect = (item: string = 'size', value: number) => {
    if (item === 'type') {
      return setActiveType(value)
    }
    return setActiveSizes(value)
  }

  return (
    <div className="pizza-block__selector">
      <ul>
        {constants.thickness.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={cn({ active: activeType === idx, disabled: !types.includes(idx) })}
            onClick={() => handleSelect('type', idx)}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {constants.diameters.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={cn({ active: activeSizes === item, disabled: !sizes.includes(item) })}
            onClick={() => handleSelect('size', item)}>
            {item} cm.
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Selectors
