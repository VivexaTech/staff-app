export default function Notice({title,des}) {
    return (
        <>
            <div className="carousel-item active">
                <div className="post-card">
                    <i className="bi bi-megaphone"></i>
                    <h6>{title}</h6>
                    <p>{des}</p>
                </div>
            </div>
        </>
    )
}