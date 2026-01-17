import Header from "../components/Header"
export default function Profile(){
    return(
        <>
        <div class="head">
  <h1>Profile</h1>
</div>

{/* <!-- PROFILE CARD --> */}
<div class="container mt-3">
  <div class="profile-card">

    <div class="profile-top">
      <img src="https://i.pravatar.cc/150?img=12" alt="User"/>
      <h4>Vivek Kumar</h4>
      <span>Employee ID: EMP1024</span>
    </div>

    <div class="profile-info">
      <div>
        <i class="bi bi-telephone"></i>
        <span>+91 98765 43210</span>
      </div>
      <div>
        <i class="bi bi-envelope"></i>
        <span>vivek@email.com</span>
      </div>
      <div>
        <i class="bi bi-geo-alt"></i>
        <span>Gurugram, Haryana</span>
      </div>
    </div>

  </div>
</div>

{/* <!-- STATS --> */}
<div class="container mt-4">
  <div class="row g-3">

    <div class="col-4">
      <div class="mini-stat">
        <h4>3</h4>
        <p>Rank</p>
      </div>
    </div>

    <div class="col-4">
      <div class="mini-stat">
        <h4>220</h4>
        <p>Total Tasks</p>
      </div>
    </div>

    <div class="col-4">
      <div class="mini-stat">
        <h4>24</h4>
        <p>Attendance</p>
      </div>
    </div>

  </div>
</div>

<Header/>
        </>
    )
}