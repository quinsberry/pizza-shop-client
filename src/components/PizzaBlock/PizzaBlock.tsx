import React from 'react'

import { PizzaSelectors } from '../'
import { Button } from '../common'
import LoadingBlock from './LoadingBlock/LoadingBlock'
import { pizzasSelectors } from '../../consts/filters'

import './PizzaBlock.scss'

import { TPizza, TCartPizza } from '../../types/types'

type Props = {
  pizza: TPizza
  isLoading: boolean
  alreadyAdded: number | undefined

  addPizzaToCart: (obj: TCartPizza) => void
}

const PizzaBlock: React.FC<Props> = ({ pizza, isLoading, addPizzaToCart, alreadyAdded }) => {
  const { _id, imageUrl, name, types, sizes, price, category, rating } = pizza

  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  React.useEffect(() => {
    setActiveSize(sizes[0])
    setActiveType(types[0])
  }, [])

  if (isLoading) {
    return <LoadingBlock />
  }

  const handleAddPizza = () => {
    const obj = {
      _id,
      imageUrl,
      name,
      price,
      type: pizzasSelectors.thickness[activeType],
      size: activeSize,
    }
    addPizzaToCart(obj)
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={`${name} pizza`} />
      <h4 className="pizza-block__title">{name}</h4>
      <PizzaSelectors
        types={types}
        sizes={sizes}
        activeType={activeType}
        activeSize={activeSize}
        setActiveType={setActiveType}
        setActiveSize={setActiveSize}
        availableSelectorConstants={pizzasSelectors}
      />
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price}$</div>
        <Button add outline onClick={handleAddPizza}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {alreadyAdded && <i>{alreadyAdded}</i>}
        </Button>
      </div>
    </div>
  )
}

export default PizzaBlock
