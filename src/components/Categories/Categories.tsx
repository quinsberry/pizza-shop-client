import React from 'react'

type Props = {
  items: Array<string>
}

const Categories: React.FC<Props> = ({ items }) => {
  const [active, setActive] = React.useState<null | number>(null)

  const handleClick = (idx: number | null) => {
    setActive(idx)
  }

  return (
    <div className="categories">
      <ul>
        <li onClick={() => handleClick(null)} className={active === null ? 'active' : ''}>
          All
        </li>
        {items &&
          items.map((item, idx) => (
            <li
              key={`${idx}-${item}`}
              className={active === idx ? 'active' : ''}
              onClick={() => handleClick(idx)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Categories
