import React from 'react'
import cn from 'classnames'

import './Button.scss'

type Props = {
  onClick?: () => void
  className?: string
  outline?: boolean
  circle?: boolean
  add?: boolean
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ onClick, className, outline, circle, add, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn('button', className, {
        'button--outline': outline,
        'button--circle': circle,
        'button--add': add,
      })}>
      {children}
    </button>
  )
}

export default Button
