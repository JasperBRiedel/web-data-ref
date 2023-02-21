import Nav from "../components/Nav"

function Dashboard() {
    return <>
        <Nav />
        <div className="container mx-auto grid grid-cols-2 gap-2">
            <div className="shadow-xl col-start-1 min-h-16 p-2">
                <h2 className="text-center">Add Sighting</h2>
                {/* Add sighting form with create button here */}
            </div>
            <div className="shadow-xl col-start-1 min-h-16 p-2">
                <h2 className="text-center">My Account</h2>
                {/* User details form with update button here */}
            </div>
            <div className="shadow-xl col-start-2 row-start-1 row-end-3 p-2">
                <h2 className="text-center">My Sightings</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <th>Trail</th>
                            <th>Animal</th>
                            <th>Time</th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard