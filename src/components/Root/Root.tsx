import React from "react"
import { Outlet } from "react-router-dom"
import classes from "./Root.module.scss"

export type OpenMenuDrawerHandler = () => void

const Root = () => {

  return <div className={classes.wrapper}>
    <Outlet />
  </div>

}

export default Root
