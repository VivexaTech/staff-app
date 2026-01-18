export default function TaskCard({title,status,description,progress,dueDate}) {

    return (
        <>
            <div className="container mt-3">
                <div className="task-card active-task">

                    <h5>{title}</h5>

                    {/* STATUS DROPDOWN */}
                    <div className="task-status">
                        <select
                            // value={status}
                            // onChange={(e) => setStatus(e.target.value)}
                            className="status-select"
                        >
                            {/* <option>{status}</option> */}

                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        <i className="bi bi-chevron-down"></i>
                    </div>

                    <p className="task-desc">{description}</p>

                    {/* PROGRESS SLIDER */}
                    <div className="task-progress">
                        <small>Progress: {progress}%</small>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            // onChange={(e) => setProgress(e.target.value)}
                            className="progress-slider"
                        />
                    </div>

                    <div className="task-footer">
                        {/* <span>{date}</span> */}
                    </div>

                </div>
            </div>

        </>
    )
}