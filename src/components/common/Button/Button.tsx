import React from 'react'
import cn from 'classnames'

import './Button.scss'

type Props = {
  onClick?: () => void
  className?: string
  outline?: boolean
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ onClick, className, outline, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  )
}

export default Button
