import { useGlobal } from "../ContextData";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";

export default function CalendarProps() {

    const { attendance } = useGlobal();
    const userid = "9sVjI5RuQj5QblexVRs0";

    const userAttendance = attendance.filter(
        att => att.staffId === userid
    );

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();

    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 🔥 map: { 7: "present", 10: "absent" }
    const attendanceMap = {};
    
    userAttendance.forEach(att => {
        if (!att.date?.seconds) return;

        const attDate = new Date(att.date.seconds * 1000);

        if (
            attDate.getFullYear() === year &&
            attDate.getMonth() === month
        ) {
            attendanceMap[attDate.getDate()] = att.status;
        }
    });

    const dates = [];

    for (let i = 0; i < firstDay; i++) {
        dates.push(<div key={"e" + i}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {

        let statusClass = attendanceMap[d] || "";

        if (d === today) {
            statusClass += " today";
        }

        dates.push(
            <div
                key={d}
                className={`date ${statusClass}`}
            >
                {d}
            </div>
        );
    }

    return (
        <Calendar
            year={year}
            monthName={monthName}
            dates={dates}
        />
    );
}
