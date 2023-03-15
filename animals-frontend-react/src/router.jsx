import { createBrowserRouter } from "react-router-dom"
import Animals from "./pages/Animals"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SightingInfo from "./pages/SightingInfo"
import Sightings from "./pages/Sightings"
import Trails from "./pages/Trails"
import UserCRUD from "./pages/UserCRUD"

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
        path: "/trails",
        element: <Trails />
    },
    {
        path: "/sightings",
        element: <Sightings />
    },
    {
        path: "/sightings/:sightingID",
        element: <SightingInfo />
    },
    {
        path: "/users",
        element: <UserCRUD />
    },
    {
        path: "/register",
        element: <Register />

    }
])

export default router