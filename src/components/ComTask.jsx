export default function ComTask({title,description,status}) {
    return (
        <>
            <div className="container mt-4">
                <h6 className="section-title">Previous Tasks</h6>
                <div className="task-card old-task">
                    <h6>{title}</h6>
                    <p>{description}</p>
                    <span className="completed">{status}</span>
                </div>
            </div>
        </>
    )
}