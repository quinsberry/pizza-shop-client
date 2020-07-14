import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'

import { getPizzas } from './redux/reducers/pizzas'

import { Header } from './components'
import { Home, Cart, Error } from './pages'

import { TPizza, TAppState } from './types/types'

type Props = {}

const App: React.FC<Props> = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getPizzas())
  }, [])

  return (
    <div className="wrapper">
      <Helmet defaultTitle="Pizza Shop" titleTemplate="%s | Pizza Shop">
        <meta
          name="description"
          content="The place where you can order the best pizzas in the world"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <div className="content">
        <Switch>
          <Route path="/" render={() => <Home />} exact />
          <Route path="/cart" component={Cart} />
          <Route path="/404" component={Error} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  )
}

export default App
