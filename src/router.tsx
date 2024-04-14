import React from "react"
import { ErrorPage, HomePage } from "./components/pages"
import Root from "./components/Root/Root"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        // gh-pages
        path: "/demo240414",
        element: <HomePage />,
      }
    ],
  },
])

export default router
