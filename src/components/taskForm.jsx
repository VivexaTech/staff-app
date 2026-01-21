import { useRef } from "react"
import { useGlobal } from "../ContextData"
export default function TaskForm() {
    const { staff, taskForm } = useGlobal()
    const userId = staff[0]?.employeeId
    const formData = taskForm.filter(form => form.employeeId === userId);
    const submitted = useRef(false)
    console.log(formData)
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
                        action={`${formData[0]?.formLink}formResponse`}
                        method="POST"
                        target="hidden_iframe"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label>{formData[0]?.h1}</label>
                            <input
                                type="text"
                                name={`entry.${formData[0]?.in1}`}
                                placeholder="example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>{formData[0]?.h2}</label>
                            <input
                                type="url"
                                name={`entry.${formData[0]?.in2}`}
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
                        title="Task related document preview"
                        name="hidden_iframe"
                        style={{ display: "none" }}
                        onLoad={handleLoad}
                    />
                </div>
            </div>

        </>
    )
}