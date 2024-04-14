import React, { useCallback, useState } from "react"
import User from "../../../types/User"
import Button from "./ui/Button"
import UserInfo from "./ui/UserInfo"
import api from "../../../services/api"
import classes from "./HomePage.module.scss"

type Item = {
  result: User | null
  loading: boolean
  error: unknown
}

const InitialItem = {
  result: null,
  loading: false,
  error: null
}

export function HomePage(): JSX.Element {

  const [item, setItem] = useState<Item>(InitialItem)

  const handleButtonClick = useCallback(async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    try {
      setItem({ ...item, loading: true, error: null })
      const result = await api.fetchRandomUser()
      setItem({ ...item, result, loading: false })
    } catch (error) {
      setItem({ ...item, result: null, error, loading: false })
    }
  }, [])

  return (
    <div className={classes.wrapper}>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick} throttleMs={2000} />
      {item.result && <UserInfo user={item.result!} />}
    </div>
  )

}

export default HomePage
