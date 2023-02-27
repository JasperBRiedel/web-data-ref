import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"

export default function Nav() {
    const [user, login, logout] = useAuthentication()
    const navigate = useNavigate()

    function onLogoutClick(e) {
        logout()
        navigate("/")
    }

    return <div className="flex flex-row items-baseline">
        <a className="btn btn-ghost normal-case text-xl m-2">Animal Spotting</a>
        <div className="navbar flex md:justify-start">
            <div className="navbar-start">

                <ul className="menu menu-horizontal px-1">
                    <li><a>Sightings</a></li>
                    <li><a>Animals</a></li>
                    <li><a>Users</a></li>
                </ul>
            </div>
            <div className="navbar-end">

                <ul className="menu menu-horizontal px-1">
                    <li><a>{user ? user.firstName : "User"}</a></li>
                    <li><a onClick={onLogoutClick}>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
}