import React from 'react'
import { Helmet } from 'react-helmet'

import './Error.scss'

type Props = {
  text: string
  title: string
}

const Error: React.FC<Props> = ({ text, title }) => {
  return (
    <div className="error">
      <Helmet>
        <title>{title ? title : 'Page not found'}</title>
        <meta name="description" content="Cannot find this page" />
      </Helmet>
      <p className="error__text">Oops, we have some troubles</p>
      <p className="error__text">{text ? `(${text})` : '(Page not found)'}</p>
    </div>
  )
}

export default Error
