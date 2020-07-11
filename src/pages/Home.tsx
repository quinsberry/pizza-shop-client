import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { Categories, SortPopup, PizzaBlock } from '../components'
import { pizzasSorting, pizzasCategories } from '../consts/filters'

import { actions } from '../redux/reducers/filters'

import { TPizza, TAppState } from '../types/types'

type TMapState = {
  pizzas: Array<TPizza> | undefined
  sortBy: string
  category: string
}

type TMapDispatch = {
  setSortBy: (payload: string) => void
  setCategory: (payload: string) => void
}

type Props = TMapState & TMapDispatch

const Home: React.FC<Props> = ({ pizzas, sortBy, setSortBy, category, setCategory }) => {
  const filterCategory = () => {}
  return (
    <div className="container">
      <Helmet>
        <meta name="description" content="List with pizzas for order" />
      </Helmet>

      <div className="content__top">
        <Categories items={pizzasCategories} category={category} setCategory={setCategory} />
        <SortPopup items={pizzasSorting} sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {pizzas &&
          pizzas.map((pizza) => {
            if (category !== 'All') {
              return category === pizza.category && <PizzaBlock key={pizza._id} pizza={pizza} />
            }
            return <PizzaBlock key={pizza._id} pizza={pizza} />
          })}
      </div>
    </div>
  )
}

const mapStateToProps = (state: TAppState): TMapState => ({
  pizzas: state.pizzas.items,
  sortBy: state.filters.sortBy,
  category: state.filters.category,
})

export default connect<TMapState, TMapDispatch, {}, TAppState>(mapStateToProps, {
  setSortBy: actions.setSortBy,
  setCategory: actions.setCategory,
})(Home)
