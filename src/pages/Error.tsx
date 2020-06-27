import React from 'react'
import { Helmet } from 'react-helmet'

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Page not found</title>
        <meta name="description" content="Cannot find this page" />
      </Helmet>
      <div>error</div>
    </div>
  )
}

export default Error
