import { TInferActions, TBaseThunk, TCartPizza, TCartItems } from '../../types/types'

type TInitialState = typeof initialState

const initialState = {
  items: {} as TCartItems,
  totalPrice: 0 as number | string,
  totalItems: 0,
}

export default (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'cart/ADD_PIZZA_TO_CART': {
      const newItems = {
        ...state.items,
        [action.payload._id]: !state.items[action.payload._id]
          ? [action.payload]
          : [...state.items[action.payload._id], action.payload],
      }
      const unitedNewItemsArr = [].concat.apply([], Object.values(newItems)) as Array<TCartPizza>
      const totalPrice = unitedNewItemsArr.reduce((init, obj) => obj.price + init, 0)
      return {
        ...state,
        items: newItems,
        totalItems: unitedNewItemsArr.length,
        totalPrice: totalPrice.toFixed(2),
      }
    }
    case 'cart/SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      }
    case 'cart/SET_PIZZAS_IN_CART_COUNT':
      return {
        ...state,
        totalItems: action.payload,
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  addPizzaToCart: (payload: any) => ({ type: 'cart/ADD_PIZZA_TO_CART', payload } as const),
  setTotalPrice: (payload: number) => ({ type: 'cart/SET_TOTAL_PRICE', payload } as const),
  setPizzasInCartCount: (payload: number) =>
    ({ type: 'cart/SET_PIZZAS_IN_CART_COUNT', payload } as const),
}

type TThunk = TBaseThunk<TActions>
