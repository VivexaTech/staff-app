import { useRef, useState } from "react";
import { useGlobal } from "../ContextData";

export default function TaskForm() {
    const { staff, taskForm } = useGlobal();
    const userId = staff?.[0]?.employeeId;

    const formData = taskForm.filter(form => form.employeeId === userId);

    const submitted = useRef(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        submitted.current = true;
        setSuccess(false);
    };

    const handleLoad = () => {
        if (submitted.current) {
            setSuccess(true);          // ✅ show animation
            submitted.current = false;
        }
    };

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

                    {/* ✅ SUCCESS ANIMATION */}
                    {success && (
                        <div className="success-box">
                            <div className="checkmark">✓</div>
                            <p>Task proof submitted successfully!</p>
                        </div>
                    )}

                    {!success && (
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
                    )}

                    <iframe
                        title="hidden_iframe"
                        name="hidden_iframe"
                        style={{ display: "none" }}
                        onLoad={handleLoad}
                    />
                </div>
            </div>
        </>
    );
}
