import React from 'react'
import { Helmet } from 'react-helmet'

const Cart = () => {
  return (
    <div>
      <Helmet>
        <title>My Cart</title>

        <meta name="description" content="The cart with my order" />
      </Helmet>
      <div>cart</div>
    </div>
  )
}

export default Cart
