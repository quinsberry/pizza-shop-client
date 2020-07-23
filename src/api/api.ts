import axios from 'axios'

import { domainUrl } from './../consts/config'

import { TPizza } from '../types/types'

type TServerResp<T = []> = {
  success: boolean
  data: T | []
  errors: []
}
// main req GET 'http://localhost:3000/api/pizzas/:category/:sort
// main req GET 'http://localhost:3000/api/pizzas/all/popularity
export const fetchingPizzas = async (category: string | null, sortBy: string) => {
  try {
    const res = await axios.get<TServerResp<Array<TPizza>>>(`${domainUrl}/api/pizzas`)
    if (res.data) {
      return res.data
    }
  } catch (err) {
    console.log(err)
    return err
  }
}
