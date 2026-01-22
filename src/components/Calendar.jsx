export default function Calendar({ year, monthName, dates }) {
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

                    {/* Week Days */}
                    <div className="calendar-grid calendar-days">
                        <span>Sun</span>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                    </div>

                    {/* Dates */}
                    <div className="calendar-grid calendar-dates">
                        {dates}
                    </div>

                </div>
            </div>
        </>
    );
}
