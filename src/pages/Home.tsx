import React from 'react'
import { Helmet } from 'react-helmet'

import { Categories, SortPopup, PizzaBlock } from '../components'

import { TPizza } from '../types/types'

type Props = {
  pizzas: Array<TPizza> | undefined
}

const Home: React.FC<Props> = ({ pizzas }) => {
  return (
    <div className="container">
      <Helmet>
        <meta name="description" content="List with pizzas for order" />
      </Helmet>

      <div className="content__top">
        <Categories items={['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Compact']} />
        <SortPopup items={['popularity', 'price', 'alphabet']} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
      </div>
    </div>
  )
}

export default Home
