import { TRootReducer } from '../redux/store'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

// ------------ GENERAL TYPES ------------

export type TAppState = ReturnType<TRootReducer>

export type TInferActions<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type TBaseThunk<A extends Action = Action, R = Promise<void>> = ThunkAction<
  R,
  TAppState,
  unknown,
  A
>

// -------------------------------

// ----------- FILTERS TYPES -----------

export type TSortPopupItems = {
  items: Array<TSortPopupItem>
}

export type TSortPopupItem = {
  name: string
  type: string
}

// -------------------------------------

export type TPizzaErrors = string | null

export type TPizza = {
  _id: string
  imageUrl: string
  name: string
  types: Array<number>
  sizes: Array<number>
  price: string
  category: string
  rating: string
}
