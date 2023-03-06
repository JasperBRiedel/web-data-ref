export default function Spinner() {
    return <div className="flex justify-center my-16">
        <div
            className="radial-progress animate-spin"
            style={{ "--value": 45 }}
        ></div>
    </div>
}