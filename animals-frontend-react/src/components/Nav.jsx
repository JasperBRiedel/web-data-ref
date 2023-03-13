import { Link, useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"

export default function Nav() {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    // Define logout procedure
    function onLogoutClick(e) {
        logout()
        navigate("/")
    }

    // Determine the name of the user to display in the nav bar
    const userName = user ? user.firstName + " " + user.lastName : "User"

    return <div className="flex flex-col items-center md:flex-row md:items-baseline">
        <a className="btn btn-ghost normal-case text-xl m-2">Animal Spotting</a>
        <div className="navbar flex md:justify-start">
            <ul className="menu md:menu-horizontal px-1 w-full">
                {
                    user && user.role == "admin"
                        ? <li><Link to="/users">Users</Link></li>
                        : <></>
                }
                {
                    user && (user.role == "admin" || user.role == "moderator")
                        ? <>
                            <li><Link to="/animals">Animals</Link></li>
                            <li><Link to="/tails">Trails</Link></li>
                        </>
                        : <></>
                }
                <li><Link to="/dashboard">{userName}</Link></li>
                <li><a onClick={onLogoutClick}>Logout</a></li>
            </ul>
        </div>
    </div>
}