import Header from "../components/Header";
import { useGlobal } from "../ContextData";

export default function ProfilePage() {
  const { staff = [], tasks = [], attendance } = useGlobal()
  const userId = staff[0]?.employeeId
  const userData = staff.filter(staf => staf.employeeId === userId);
  const userTasks = tasks.filter(task => task.assigneeId === userId);
  const userAttendance = attendance.filter(att => att.staffId === userId);
  const userPre = "present"
  const PresUser = userAttendance.filter(attPre => attPre.status === userPre);
  return (
    <>
      <div className="head d-flex justify-content-between align-items-center">
        <h1>Profile</h1>
        <button
          // onClick={/handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "#dfff6a",
            fontSize: "14px"
          }}
        >
          Logout
        </button>
      </div>
      <div className="container mt-3">
        <div className="profile-card">
          <div className="profile-top">
            <img src={userData[0]?.profile} alt="User" />
            <h4>{userData[0]?.name}</h4>
            <span>Employee ID: {userData[0]?.employeeId}</span>
          </div>

          <div className="profile-info">
            <div>
              <i className="bi bi-telephone"></i>
              <span>+91 {userData[0]?.phone}</span>
            </div>
            <div>
              <i className="bi bi-envelope"></i>
              <span>{userData[0]?.email}</span>
            </div>
            <div>
              <i className="bi bi-geo-alt"></i>
              <span>{userData[0]?.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row g-3">
          <div className="col-4">
            <div className="mini-stat">
              <h4>3</h4>
              <p>Rank</p>
            </div>
          </div>

          <div className="col-4">
            <div className="mini-stat">
              <h4>{userTasks.length}</h4>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className="col-4">
            <div className="mini-stat">
              <h4>{PresUser.length}</h4>
              <p>Attendance</p>
            </div>
          </div>
        </div>
      </div>
      <Header />
    </>
  );
}
