import { createBrowserRouter } from "react-router-dom"
import AnimalCRUD from "./pages/AnimalCRUD"
import Animals from "./pages/Animals"
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
        path: "/animals",
        element: <Animals />
    },
    {
        path: "/animal-crud",
        element: <AnimalCRUD />
    }
])

export default router