import React from 'react'

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

  const MinActiveType = (arr: Array<number>) => {
    let i = 0
    while (!arr.includes(i)) {
      i++
    }
    return i
  }

  const handleSelect = (item: string = 'size', value: number) => {
    if (item === 'type') {
      return setActiveType(value)
    }

    return setActiveSizes(value)
  }

  const [activeType, setActiveType] = React.useState(MinActiveType(types))
  const [activeSizes, setActiveSizes] = React.useState(sizes[0])

  return (
    <div className="pizza-block__selector">
      <ul>
        {constants.thickness.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={activeType === idx ? 'active' : types.includes(idx) ? '' : 'disabled'}
            onClick={() => handleSelect('type', idx)}>
            {item}
          </li>
        ))}
      </ul>
      <ul>
        {constants.diameters.map((item, idx) => (
          <li
            key={`${idx}-${item}`}
            className={activeSizes === item ? 'active' : sizes.includes(item) ? '' : 'disabled'}
            onClick={() => handleSelect('size', item)}>
            {item} cm.
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Selectors
