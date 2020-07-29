import { fetchingPizzas } from '../../api/api'
import { TInferActions, TBaseThunk, TPizza, TPizzaErrors } from '../../types/types'

type TInitialState = typeof initialState

const initialState = {
  items: [] as Array<TPizza>,
  isLoading: false,
  isInitialized: false,
  errors: null as TPizzaErrors,
}

export default (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'pizzas/SET_PIZZAS':
      return {
        ...state,
        items: action.fetchedPizzas,
      }
    case 'pizzas/SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'pizzas/SET_INITIALIZED_SUCCESS':
      return {
        ...state,
        isInitialized: true,
      }
    case 'pizzas/SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  setPizzas: (fetchedPizzas: Array<TPizza>) =>
    ({ type: 'pizzas/SET_PIZZAS', fetchedPizzas } as const),
  setLoading: (payload: boolean) => ({ type: 'pizzas/SET_LOADING', payload } as const),
  setInitialized: () => ({ type: 'pizzas/SET_INITIALIZED_SUCCESS' } as const),
  setErrors: (payload: TPizzaErrors) => ({ type: 'pizzas/SET_ERRORS', payload } as const),
}

type TThunk = TBaseThunk<TActions>

export const getPizzas = (category: string | null, sortBy: string): TThunk => {
  return async (dispatch, getState) => {
    const { items, errors } = getState().pizzas
    dispatch(actions.setLoading(true))
    const res = await fetchingPizzas(category, sortBy)

    if (!items.length && errors === null) {
      dispatch(actions.setInitialized())
    }

    if (res.success) {
      dispatch(actions.setErrors(null))
      dispatch(actions.setPizzas(res.data))
      dispatch(actions.setLoading(false))
    } else if (!res.success) {
      dispatch(actions.setErrors(res.message))
      dispatch(actions.setLoading(false))
    }
  }
}
