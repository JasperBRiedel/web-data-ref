import { createBrowserRouter } from "react-router-dom"
import AnimalCRUD from "./pages/AnimalCRUD"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/animal-crud",
        element: <AnimalCRUD />
    }
])

export default router