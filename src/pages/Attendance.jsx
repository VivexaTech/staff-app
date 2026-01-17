import Header from "../components/Header"
export default function Attendance() {
    return (
        <>
            <Header />
            <div class="head">
                <h1>Attendance</h1>
            </div>

            {/* <!-- CALENDAR --> */}
            <div class="container mt-3">
                <div class="attendance-calendar">
                    <div class="calendar-header">
                        <h6>September 2026</h6>
                    </div>

                    <div class="calendar-grid">
                        {/* <!-- Days --> */}
                        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
                        <span>Thu</span><span>Fri</span><span>Sat</span>

                        {/* <!-- Dates --> */}
                        <div class="date absent">1</div>
                        <div class="date present">2</div>
                        <div class="date present">3</div>
                        <div class="date present">4</div>
                        <div class="date present">5</div>
                        <div class="date present">6</div>
                        <div class="date today">7</div>

                        <div class="date present">8</div>
                        <div class="date present">9</div>
                        <div class="date absent">10</div>
                        <div class="date present">11</div>
                        <div class="date present">12</div>
                        <div class="date present">13</div>
                        <div class="date present">14</div>

                        <div class="date present">15</div>
                        <div class="date present">16</div>
                        <div class="date absent">17</div>
                        <div class="date present">18</div>
                        <div class="date present">19</div>
                        <div class="date present">20</div>
                        <div class="date present">21</div>

                        <div class="date present">15</div>
                        <div class="date present">16</div>
                        <div class="date absent">17</div>
                        <div class="date present">18</div>
                        <div class="date present">19</div>
                        <div class="date present">20</div>
                        <div class="date present">21</div>
                    </div>
                </div>
            </div>

            {/* <!-- ACTION BUTTONS --> */}
            <div class="container mt-4">
                <div class="row g-3">

                    <div class="col-6">
                        <button class="action-btn checkin">
                            <i class="bi bi-box-arrow-in-right"></i>
                            Check In
                        </button>
                    </div>

                    <div class="col-6">
                        <button class="action-btn leave">
                            <i class="bi bi-calendar-x"></i>
                            Apply Leave
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}