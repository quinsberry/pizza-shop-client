import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'

import { Categories, SortPopup } from '../../components/common'
import { PizzaBlock, Error } from '../../components'
import LoadingBlock from '../../components/PizzaBlock/LoadingBlock/LoadingBlock'

import { pizzasSorting, pizzasCategories } from '../../consts/filters'

import { getPizzas } from '../../redux/reducers/pizzas'
import { actions as filterActions } from '../../redux/reducers/filters'
import { actions as cartActions } from '../../redux/reducers/cart'

import { TPizza, TAppState, TCartPizza, TCartItems } from '../../types/types'

type TMapState = {
  pizzas: Array<TPizza> | undefined
  isLoading: boolean
  isInitialized: boolean
  errors: string | null

  sortBy: string
  category: string | null

  cartItems: TCartItems
}

const Home: React.FC = () => {
  const { setSortBy, setCategory } = filterActions
  const { addPizzaToCart } = cartActions

  const dispatch = useDispatch()

  const { pizzas, isLoading, isInitialized, errors, sortBy, category, cartItems } = useSelector<
    TAppState,
    TMapState
  >((state) => ({
    pizzas: state.pizzas.items,
    isLoading: state.pizzas.isLoading,
    isInitialized: state.pizzas.isInitialized,
    errors: state.pizzas.errors,

    sortBy: state.filters.sortBy,
    category: state.filters.category,

    cartItems: state.cart.items,
  }))

  React.useEffect(() => {
    dispatch(getPizzas(category, sortBy))
  }, [category, sortBy])

  const handleAction = {
    setSort: React.useCallback((type: string) => {
      dispatch(setSortBy(type))
    }, []),
    setCategory: React.useCallback((type: string | null) => {
      dispatch(setCategory(type))
    }, []),
    addPizza: React.useCallback((obj: TCartPizza) => {
      dispatch(addPizzaToCart(obj))
    }, []),
  }

  return (
    <div className="container main">
      <Helmet>
        <meta name="description" content="List with pizzas for order" />
      </Helmet>

      <div className="content__top">
        <Categories
          items={pizzasCategories}
          category={category}
          setCategory={handleAction.setCategory}
        />
        <SortPopup items={pizzasSorting} sortBy={sortBy} setSortBy={handleAction.setSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {errors ? (
        <Error text={errors} title={errors} />
      ) : (
        <div className="content__items">
          {!isInitialized && [...Array(10)].map((el, idx) => <LoadingBlock key={idx} />)}
          {pizzas?.map((pizza) => {
            return (
              <PizzaBlock
                key={pizza._id}
                isLoading={isLoading}
                pizza={pizza}
                addPizzaToCart={handleAction.addPizza}
                alreadyAdded={cartItems[pizza._id]?.length}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home
