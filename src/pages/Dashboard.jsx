import { db } from "../Firebase"
import Header from "../components/Header"
export default function Dashboard() {
  console.log(db)
  return (
    <>
      <Header />
      <div class="head">
        <h1>Dashboard</h1>
      </div>

      <div class="username">
        <h1>Welcome, Vivek 👋</h1>
      </div>
      <div class="container mt-4">

        <h6 class="text-light mb-2">Latest Updates</h6>

        <div id="postSlider" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">

            {/* <!-- Slide 1 --> */}
            <div class="carousel-item active">
              <div class="post-card">
                <i class="bi bi-megaphone"></i>
                <h6>Holiday Notice</h6>
                <p>Tomorrow school will remain closed.</p>
              </div>
            </div>

            {/* <!-- Slide 2 --> */}
            <div class="carousel-item">
              <div class="post-card">
                <i class="bi bi-clock"></i>
                <h6>Attendance Update</h6>
                <p>Mark attendance before 10 AM.</p>
              </div>
            </div>

            {/* <!-- Slide 3 --> */}
            <div class="carousel-item">
              <div class="post-card">
                <i class="bi bi-list-check"></i>
                <h6>Task Reminder</h6>
                <p>Submit today's task by evening.</p>
              </div>
            </div>

          </div>
        </div>

      </div>


      <div class="container mt-4">
        <div class="row g-3">

          {/* <!-- Task Card --> */}
          <div class="col-6">
            <div class="dash-card bg-task">
              <div class="icon-box">
                <i class="bi bi-list-check"></i>
              </div>
              <h4>220</h4>
              <p>Total Tasks</p>
            </div>
          </div>

          {/* <!-- Attendance Card --> */}
          <div class="col-6">
            <div class="dash-card bg-attendance">
              <div class="icon-box">
                <i class="bi bi-person-check"></i>
              </div>
              <h4>24</h4>
              <p>Attendance</p>
            </div>
          </div>

          {/* <!-- Pending Card --> */}
          <div class="col-6">
            <div class="dash-card bg-pending">
              <div class="icon-box">
                <i class="bi bi-clock-history"></i>
              </div>
              <h4>190</h4>
              <p>Pending</p>
            </div>
          </div>

          {/* <!-- Payment Card --> */}
          <div class="col-6">
            <div class="dash-card bg-payment">
              <div class="icon-box">
                <i class="bi bi-trophy"></i>
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