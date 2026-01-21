import { useGlobal } from "../ContextData.jsx"
import Header from "../components/Header"
import Notice from "../components/Notice.jsx"

export default function Dashboard() {
  const { staff = [], tasks = [], attendance, notice } = useGlobal()
  const userId = staff[0]?.employeeId
  const userTasks = tasks.filter(task => task.assigneeId === userId);
  const taskStatusVa = "Pending"
  const taskStatus = userTasks.filter(taskStat => taskStat.status === taskStatusVa);
  const userData = staff.filter(staf => staf.employeeId === userId);
  const userAttendance = attendance.filter(att => att.staffId === userId);
  const userPre = "present"
  const PresUser = userAttendance.filter(attPre => attPre.status === userPre);

  return (
    <>
      <Header />
      <div className="head">
        <h1>Dashboard</h1>

        <div className="profile">
          <img
            src={userData[0]?.profile || "/default-avatar.png"}
            alt="Profile"
          />
        </div>
      </div>

      <div className="username">
        <h1>Welcome, {userData[0]?.name} 👋</h1>
      </div>

      <div className="container mt-4">

        <h6 className="text-light mb-2">Latest Updates</h6>

        <div id="postSlider" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            
            {
              notice.map((item) => {
                return( <Notice key={item.id} title={item.title} des={item.des} /> )
              })
            }
          </div>
        </div>

      </div>


      <div className="container mt-4">
        <div className="row g-3">

          {/* <!-- Task Card --> */}
          <div className="col-6">
            <div className="dash-card bg-task">
              <div className="icon-box">
                <i className="bi bi-list-check"></i>
              </div>
              <h4>{userTasks.length}</h4>
              <p>Total Tasks</p>
            </div>
          </div>

          {/* <!-- Attendance Card --> */}
          <div className="col-6">
            <div className="dash-card bg-attendance">
              <div className="icon-box">
                <i className="bi bi-person-check"></i>
              </div>
              <h4>{PresUser.length}</h4>
              <p>Attendance</p>

            </div>
          </div>

          {/* <!-- Pending Card --> */}
          <div className="col-6">
            <div className="dash-card bg-pending">
              <div className="icon-box">
                <i className="bi bi-clock-history"></i>
              </div>
              <h4>{taskStatus.length}</h4>
              <p>Pending</p>
            </div>
          </div>

          {/* <!-- Payment Card --> */}
          <div className="col-6">
            <div className="dash-card bg-payment">
              <div className="icon-box">
                <i className="bi bi-trophy"></i>
              </div>
              <h4>Rank</h4>
              <p>3rd</p>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}