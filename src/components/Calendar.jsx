export default function Calendar({year,monthName,dates}) {
    return (
        <>
            <div className="head">
                <h1>Attendance</h1>
            </div>

            <div className="container mt-3">
                <div className="attendance-calendar">

                    <div className="calendar-header">
                        <h6>{monthName} {year}</h6>
                    </div>

                    <div className="calendar-grid">
                        <span>Sun</span><span>Mon</span><span>Tue</span>
                        <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                        {dates}
                    </div>

                </div>
            </div>
        </>
    )
}