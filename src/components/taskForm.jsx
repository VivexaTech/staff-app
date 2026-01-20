import { useRef } from "react"
export default function TaskForm() {
    const submitted = useRef(false)
    const handleSubmit = () => {
        submitted.current = true
    }
    const handleLoad = () => {
        if (submitted.current) {
            alert(submitted)
        }
    }
    return (
        <>
            {/* HEADER */}
            <div className="head d-flex justify-content-between align-items-center">
                <h1>Task</h1>
            </div>

            {/* TASK PROOF FORM */}
            <div className="task-form-wrapper">
                <div className="task-form-card">
                    <h4>Submit Task Proof</h4>
                    <p className="form-subtext">
                        Please submit proof after completing your assigned task.
                    </p>

                    <form
                        action="https://docs.google.com/forms/d/16ELfUzDf0ao6ae0w0u3MmbFnS5x2JVgtyPo5B4BncNI/formResponse"
                        method="POST"
                        target="hidden_iframe"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label>Website Name</label>
                            <input
                                type="text"
                                name="entry.1005022941"
                                placeholder="example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Post Link</label>
                            <input
                                type="url"
                                name="entry.399640403"
                                placeholder="https://classified-site.com/post"
                                required
                            />
                        </div>

                        <button type="submit" className="action-btn btn-submit-proof">
                            <i className="bi bi-check-circle"></i>
                            Submit Proof
                        </button>
                    </form>

                    <iframe
                        name="hidden_iframe"
                        style={{ display: "none" }}
                        onLoad={handleLoad}
                    />
                </div>
            </div>

        </>
    )
}