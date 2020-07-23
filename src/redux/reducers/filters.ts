import { TInferActions, TBaseThunk } from '../../types/types'

type TInitialState = typeof initialState

const initialState = {
  category: null as null | string,
  sortBy: 'Popularity',
}

export default (state = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case 'filters/SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      }
    case 'filters/SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      }
    default:
      return state
  }
}

type TActions = TInferActions<typeof actions>

export const actions = {
  setSortBy: (payload: string) => ({ type: 'filters/SET_SORT_BY', payload } as const),
  setCategory: (payload: string | null) => ({ type: 'filters/SET_CATEGORY', payload } as const),
}

type TThunk = TBaseThunk<TActions>
