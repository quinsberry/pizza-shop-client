import { get } from '../../utils/helpers'
import {
  TInferActions,
  TBaseThunk,
  TCartPizza,
  TCartItems,
  TCartItemValue,
} from '../../types/types'

type TInitialState = typeof initialState

const initialState = {
  items: {} as TCartItems,
  totalPrice: 0 as number | string,
  totalItems: 0,
}

const getItemTotalPrice = (arr: Array<TCartPizza>) =>
  arr.reduce((init, obj) => init + Number(obj.price), 0)

export default (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'cart/ADD_PIZZA_TO_CART': {
      const currentPizzaItems = !state.items[action.payload._id]
        ? [action.payload]
        : [...state.items[action.payload._id].items, action.payload]
      const newItems: TCartItems = {
        ...state.items,
        [action.payload._id]: {
          items: currentPizzaItems,
          itemsTotalPrice: getItemTotalPrice(currentPizzaItems).toFixed(2),
        },
      }

      const totalItems = get(newItems, 'items.length')
      const totalPrice = get(newItems, 'itemsTotalPrice')
      return {
        ...state,
        items: newItems,
        totalItems: totalItems,
        totalPrice: totalPrice.toFixed(2),
      }
    }
    case 'cart/REMOVE_CART_ITEM': {
      const newItems = JSON.parse(JSON.stringify(state.items))
      const newTotalPrice = +state.totalPrice - +newItems[action.payload].itemsTotalPrice
      const newTotalItem = state.totalItems - newItems[action.payload].items.length
      delete newItems[action.payload]
      return {
        ...state,
        items: newItems,
        totalPrice: newTotalPrice ? newTotalPrice.toFixed(2) : 0,
        totalItems: newTotalItem,
      }
    }
    case 'cart/CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalItems: 0,
      }
    case 'cart/INCREASE_ITEM_COUNT': {
      const currentItem = state.items[action.payload]
      const currentItemPrice = currentItem?.items[0].price
      const newItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]

      return {
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            itemsTotalPrice: getItemTotalPrice(newItems).toFixed(2),
          },
        },
        totalPrice: (+state.totalPrice + currentItemPrice).toFixed(2),
        totalItems: state.totalItems + 1,
      }
    }
    case 'cart/DECREASE_ITEM_COUNT': {
      const currentItem = state.items[action.payload]
      const currentItemPrice = currentItem?.items[0].price
      const currentIdItems = state.items[action.payload].items
      if (currentIdItems.length === 1) return state
      const newItems = currentIdItems.filter((item, idx) => idx !== currentIdItems.length - 1)
      return {
        items: {
          ...state.items,
          [action.payload]: {
            items: newItems,
            itemsTotalPrice: getItemTotalPrice(newItems).toFixed(2),
          },
        },
        totalPrice: (+state.totalPrice - currentItemPrice).toFixed(2),
        totalItems: state.totalItems - 1,
      }
    }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  addPizzaToCart: (payload: TCartPizza) => ({ type: 'cart/ADD_PIZZA_TO_CART', payload } as const),
  removeCartItem: (id: string) => ({ type: 'cart/REMOVE_CART_ITEM', payload: id } as const),
  increaseItemCount: (id: string) => ({ type: 'cart/INCREASE_ITEM_COUNT', payload: id } as const),
  decreaseItemCount: (id: string) => ({ type: 'cart/DECREASE_ITEM_COUNT', payload: id } as const),
  cleanCart: () => ({ type: 'cart/CLEAR_CART' } as const),
}

type TThunk = TBaseThunk<TActions>
