import React, { useEffect, useState } from "react"
import { useThrottle } from "../../../../hooks/useThrottle"

export interface IButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  throttleMs?: number
}

export function Button({ onClick, throttleMs }: IButtonProps): JSX.Element {

  const clickHandler = useThrottle<typeof onClick>(throttleMs, onClick)

  return (
    <button type="button" onClick={clickHandler}>
      get random user
    </button>
  )
}

export default Button
