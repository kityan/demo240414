import React from "react"
import { createRoot } from "react-dom/client"
import "./styles/main.scss"
import { RouterProvider } from "react-router-dom"
import router from "./router"

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById("root")!)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

