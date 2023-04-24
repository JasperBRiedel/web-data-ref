import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import Nav from "./Nav"

export function RestrictedRoute({ allowedRoles = [], children }) {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    const userIsAuthorised = user && allowedRoles.includes(user.role)

    return userIsAuthorised
        ? children
        : <>
            <Nav />
            <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-4xl">Not Authorised</h2>
                <span className="text-xl">Access role is not permitted to view this page.</span>
                <button className="btn btn-lg" onClick={() => navigate(-1)}>Back</button>
            </div>
        </>
}