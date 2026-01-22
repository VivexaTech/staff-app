import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function TaskCard({
  id,
  title,
  status,
  description,
  prog,
  dueDate
}) {
  const [progress, setProgress] = useState(prog);
  const [taskStatus, setTaskStatus] = useState(status);
  

  const handleProgressChange = async (e) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);

    try {
      await updateDoc(doc(db, "tasks", id), {
        progress: newProgress,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // 🔹 Update status in Firestore
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setTaskStatus(newStatus);

    try {
      await updateDoc(doc(db, "tasks", id), {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="task-card active-task">

        <h5>{title}</h5>

        {/* STATUS DROPDOWN */}
        <div className="task-status">
          <select
            value={taskStatus}
            onChange={handleStatusChange}
            className="status-select"
          >
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
            onChange={handleProgressChange}
            className="progress-slider"
          />
        </div>

        <div className="task-footer">
          <span>{dueDate.toDate().toLocaleDateString()}</span>
        </div>

      </div>
    </div>
  );
}
