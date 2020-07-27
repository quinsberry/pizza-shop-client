import axios from 'axios'

import { domainUrl } from './../consts/config'

import { TPizza } from '../types/types'

type TServerResp<T = []> = {
  success: boolean
  data: T | []
  errors: []
}

// Example request
export const fetchingPizzas = async (category: string | null, sortBy: string) => {
  try {
    const queryCategory = category ? `category=${category}` : ''
    const querySortBy = sortBy && `sortBy=${sortBy}`
    const queries = `${(category || sortBy) && '?'}${queryCategory}${
      category && sortBy ? '&' : ''
    }${querySortBy}`

    const res = await axios.get<TServerResp<Array<TPizza>>>(`${domainUrl}/api/pizzas${queries}`)
    if (res.data) {
      return res.data
    }
  } catch (err) {
    console.log(err)
    return err
  }
}
