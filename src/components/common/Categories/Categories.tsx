import React from 'react'

import './Categories.scss'

type Props = {
  items: Array<string>
  category: string | null

  setCategory: (payload: string | null) => void
}

const Categories: React.FC<Props> = ({ items, category, setCategory }) => {
  const handleClick = (type: string | null) => {
    setCategory(type)
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => handleClick(null)} className={!category ? 'active' : ''}>
          All
        </li>
        {items &&
          items.map((item, idx) => (
            <li
              key={`${idx}-${item}`}
              className={category === item ? 'active' : ''}
              onClick={() => handleClick(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default React.memo(Categories)
