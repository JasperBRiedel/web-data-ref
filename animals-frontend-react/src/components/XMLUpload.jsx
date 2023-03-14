import { useState } from "react"

export function XMLUpload() {
    const [statusMessage, setStatusMessage] = useState("")

    function uploadFile(e) {
        e.preventDefault()
        setStatusMessage("Not yet implemented")

    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={uploadFile} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">XML File Import</span>
                </label>
                <div className="flex gap-2">
                    <input type="file" className="file-input file-input-bordered file-input-primary" />
                    <button className="btn btn-primary mr-2" >Upload</button>
                </div>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}