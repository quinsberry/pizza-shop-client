import axios from 'axios'

import { domainUrl } from './../consts/config'

import { TPizza } from '../types/types'

type TGetPizzasResp = {
  pizzas: Array<TPizza>
}

export const getPizzas = async () => {
  try {
    const res = await axios.get<TGetPizzasResp>(`${domainUrl}/db.json`)
    if (res.data) {
      return res.data
    }
  } catch (err) {
    console.log(err)
  }
}
