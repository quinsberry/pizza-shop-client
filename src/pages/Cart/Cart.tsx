import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { actions as cartActions } from '../../redux/reducers/cart'
import { domainUrl } from '../../consts/config'

import { Button } from '../../components/common'
import { CartItem } from '../../components'

import emptyCartPng from '../../assets/img/empty-cart.png'
import './Cart.scss'

import { TAppState, TCartItems } from '../../types/types'

type TMapState = {
  pizzasList: TCartItems
  totalPrice: number | string
  totalPizzasCount: number
}

const Cart = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { pizzasList, totalPrice, totalPizzasCount } = useSelector<TAppState, TMapState>(
    (state) => ({
      pizzasList: state.cart.items,
      totalPrice: state.cart.totalPrice,
      totalPizzasCount: state.cart.totalItems,
    }),
  )

  const { cleanCart, removeCartItem, increaseItemCount, decreaseItemCount } = cartActions

  const handleMoves = {
    cleanOut: () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'It will delete the order',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(197, 197, 197)',
        cancelButtonColor: '#fe5f1e',
        confirmButtonText: 'Yes, clean out',
      }).then((result) => {
        if (result.value) {
          dispatch(cleanCart())
          history.push('/')
          Swal.fire({
            title: 'Cart was cleaned!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
    },
    deletePizza: (id: string) => {
      dispatch(removeCartItem(id))
    },
    increaseItemCount: (id: string) => {
      dispatch(increaseItemCount(id))
    },
    decreaseItemCount: (id: string) => {
      dispatch(decreaseItemCount(id))
    },
    payNow: () => {
      console.log('Payed')
      // TODO: complete onPay method
      //
      // Swal.fire({
      //   title: 'Submit your Github username',
      //   text: `Total: ${totalPrice}`,
      //   input: 'text',
      //   inputAttributes: {
      //     autocapitalize: 'off',
      //   },
      //   showCancelButton: true,
      //   confirmButtonText: 'Look up',
      //   showLoaderOnConfirm: true,
      //   preConfirm: (login) => {
      //     return fetch(`//api.github.com/users/${login}`)
      //       .then((response) => {
      //         if (!response.ok) {
      //           throw new Error(response.statusText)
      //         }
      //         return response.json()
      //       })
      //       .catch((error) => {
      //         Swal.showValidationMessage(`Request failed: ${error}`)
      //       })
      //   },
      //   allowOutsideClick: () => !Swal.isLoading(),
      // }).then((result) => {
      //   if (result.value) {
      //     Swal.fire({
      //       title: `${result.value.login}'s avatar`,
      //       imageUrl: result.value.avatar_url,
      //     })
      //   }
      // })
    },
  }

  const addedPizzas = Object.keys(pizzasList).map((key) => {
    return pizzasList[key]
  })

  return (
    <>
      <Helmet>
        <title>{totalPizzasCount ? `${totalPizzasCount} pizzas` : 'Empty cart'}</title>
        <meta name="description" content="The cart with pizza's order" />

        <meta property="og:title" content="Pizza's order" />
        <meta property="og:description" content="Check and order the pizza's you chose" />
        <meta property="og:site_name" content="Pizza shop" />
        <meta property="og:url" content={`${domainUrl}`} />
        <meta property="og:type" content={`${domainUrl}:cart`} />

        <meta
          property="og:image"
          content="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"
        />
        <meta property="og:image:width" content="584" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Your Cart" />
        <meta property="twitter:description" content="Check and order the pizza's you chose" />
        <meta
          property="twitter:image"
          content="https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg"
        />
        <meta property="twitter:url" content={`${domainUrl}`} />
      </Helmet>
      <div className="container cart container--cart">
        {totalPizzasCount ? (
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Cart
              </h2>
              <div onClick={handleMoves.cleanOut} className="cart__clear">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 5H4.16667H17.5"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33337 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6666 9.16667V14.1667"
                    stroke="#B6B6B6"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Clean out</span>
              </div>
            </div>
            <div className="content__items">
              {addedPizzas?.map((pizza) => (
                <CartItem
                  key={pizza.items[0]._id}
                  id={pizza.items[0]._id}
                  name={pizza.items[0].name}
                  type={pizza.items[0].type}
                  size={pizza.items[0].size}
                  imageUrl={pizza.items[0].imageUrl}
                  totalPrice={pizza.itemsTotalPrice}
                  totalCount={pizza.items.length}
                  onPlusClick={handleMoves.increaseItemCount}
                  onMinusClick={handleMoves.decreaseItemCount}
                  onDelete={handleMoves.deletePizza}
                />
              ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {' '}
                  Pizzas in order: <b>{totalPizzasCount}</b>{' '}
                </span>
                <span>
                  {' '}
                  Total: <b>{totalPrice} $</b>{' '}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link to="/" className="button button--outline button--add go-back-btn">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 13L1 6.93015L6.86175 1"
                      stroke="#D3D3D3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>Back to choose</span>
                </Link>
                <Button onClick={() => handleMoves.payNow()} className="pay-btn">
                  <span>Pay now</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart cart--empty">
            <h2>
              The cart is empty <i>😕</i>
            </h2>
            <p>
              Most likely, you are not ordered pizzas yet.
              <br />
              If you want to order a pizza, go to the main page.
            </p>
            <img src={emptyCartPng} alt="Empty cart image" />
            <Link to="/" className="button button--black">
              <span>Go to main page</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
