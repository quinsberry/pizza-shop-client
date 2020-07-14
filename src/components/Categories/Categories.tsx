import React from 'react'
import { useDispatch } from 'react-redux'

import './Categories.scss'

type Props = {
  items: Array<string>
  category: string

  setCategory: (payload: string) => void
}

const Categories: React.FC<Props> = ({ items, category, setCategory }) => {
  const dispatch = useDispatch()
  const handleClick = (type: string) => {
    dispatch(setCategory(type))
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => handleClick('All')} className={category === 'All' ? 'active' : ''}>
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

export default Categories
