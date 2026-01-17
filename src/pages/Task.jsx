import Header from "../components/Header"
export default function Task() {
  return (
    <>
      <Header />
      {/* <!-- HEADER --> */}
      <div class="head">
        <h1>Tasks</h1>
      </div>

      {/* <!-- CURRENT TASK --> */}
      <div className="container mt-3">
        <div className="task-card active-task">

          <h5>Find out 30 Classified Submission Website</h5>

          {/* STATUS DROPDOWN */}
          <div className="task-status">
            <select
              // value={status}
              // onChange={(e) => setStatus(e.target.value)}
              className="status-select"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <i className="bi bi-chevron-down"></i>
          </div>

          <p className="task-desc">
            Find and list 30 Classified submission websites where business-related
            classifieds can be published. Suitable for digital services and small businesses.
          </p>

          {/* PROGRESS SLIDER */}
          <div className="task-progress">
            <small>Progress: {/*progress*/}%</small>

            <input
              type="range"
              min="0"
              max="100"
              // value={progress}
              // onChange={(e) => setProgress(e.target.value)}
              className="progress-slider"
            />
          </div>

          <div className="task-footer">
            <span>Due: 17/01/2026</span>
          </div>

        </div>
      </div>

      {/* <!-- OLD TASKS --> */}
      <div className="container mt-4">
        <h6 className="section-title">Previous Tasks</h6>

        <div className="task-card old-task">
          <h6>Create School Website</h6>
          <p>Completed school website project.</p>
          <span className="completed">Completed</span>
        </div>

        <div className="task-card old-task">
          <h6>SEO Keyword Research</h6>
          <p>Research keywords for local business.</p>
          <span className="completed">Completed</span>
        </div>

        <div className="task-card old-task">
          <h6>Attendance Module UI</h6>
          <p>Design staff attendance UI.</p>
          <span className="completed">Completed</span>
        </div>
      </div>
    </>
  )
}