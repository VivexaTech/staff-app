export default function ComTask({title,description,status}) {
    return (
        <>

                <div className="task-card old-task">
                    <h6>{title}</h6>
                    <p>{description}</p>
                    <span className="completed">{status}</span>
                </div>

        </>
    )
}