import axios from 'axios'

import { domainUrl } from './../consts/config'

import { TPizza } from '../types/types'

type TServerResp<T = []> = {
  success: boolean
  data: T | []
  errors: []
}

export const fetchingPizzas = async () => {
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
