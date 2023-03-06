import Nav from "../components/Nav"
import Spinner from "../components/Spinner"
import { useAuthentication } from "../hooks/authentication"

export default function Animals() {
    const [user] = useAuthentication()

    return <>
        <Nav />
        {user ?
            <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded border-2 border-primary md:col-start-1 min-h-16 p-2">
                    <h2 className="text-center">Edit Animal</h2>
                    {/* Add sighting form with create button here */}
                </div>
                <div className="rounded border-2 border-primary md:col-start-2 md:row-start-1 row-end-3 p-2">
                    <h2 className="text-center">All Animals</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead>
                                <th>Name</th>
                                <th>Species</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            :
            <Spinner />
        }
    </>
}
