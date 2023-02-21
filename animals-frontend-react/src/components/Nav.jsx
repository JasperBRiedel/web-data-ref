export default function Nav() {
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
                    <li><a>User</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
}