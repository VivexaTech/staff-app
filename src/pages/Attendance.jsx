import CalendarProps from "../components/CalendarProps"
import Header from "../components/Header"
import React, { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    updateDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
// export default function Attendance() {
//     return (
//         <>
//             <Header />
//             <div className="head">
//                 <h1>Attendance</h1>
//             </div>

//             {/* <!-- CALENDAR --> */}
//             <div className="container mt-3">
//                 <div className="attendance-calendar">
//                     <div className="calendar-header">
//                         <h6>September 2026</h6>
//                     </div>

//                     <div className="calendar-grid">
//                         {/* <!-- Days --> */}
//                         <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
//                         <span>Thu</span><span>Fri</span><span>Sat</span>

//                         {/* <!-- Dates --> */}
//                         <div className="date absent">1</div>
//                         <div className="date present">2</div>
//                         <div className="date present">3</div>
//                         <div className="date present">4</div>
//                         <div className="date present">5</div>
//                         <div className="date present">6</div>
//                         <div className="date today">7</div>

//                         <div className="date present">8</div>
//                         <div className="date present">9</div>
//                         <div className="date absent">10</div>
//                         <div className="date present">11</div>
//                         <div className="date present">12</div>
//                         <div className="date present">13</div>
//                         <div className="date present">14</div>

//                         <div className="date present">15</div>
//                         <div className="date present">16</div>
//                         <div className="date absent">17</div>
//                         <div className="date present">18</div>
//                         <div className="date present">19</div>
//                         <div className="date present">20</div>
//                         <div className="date present">21</div>

//                         <div className="date present">15</div>
//                         <div className="date present">16</div>
//                         <div className="date absent">17</div>
//                         <div className="date present">18</div>
//                         <div className="date present">19</div>
//                         <div className="date present">20</div>
//                         <div className="date present">21</div>
//                     </div>
//                 </div>
//             </div>

//             {/* <!-- ACTION BUTTONS --> */}
//             <div className="container mt-4">
//                 <div className="row g-3">

//                     <div className="col-6">
//                         <button className="action-btn checkin">
//                             <i className="bi bi-box-arrow-in-right"></i>
//                             Check In
//                         </button>
//                     </div>

//                     <div className="col-6">
//                         <button className="action-btn leave">
//                             <i className="bi bi-calendar-x"></i>
//                             Apply Leave
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }


export default function Attendance() {
    const staffId = "9sVjI5RuQj5QblexVRs0";

    const [showCheckIn, setShowCheckIn] = useState(true);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [checkOutDisabled, setCheckOutDisabled] = useState(false);
    const [leaveReason, setLeaveReason] = useState("");
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [onLeave, setOnLeave] = useState(false);


    /* ---------------- CHECK IN ---------------- */
    const handleCheckIn = async () => {
        const now = new Date();

        await addDoc(collection(db, "attendance"), {
            staffId,
            date: now.toISOString().split("T")[0],
            checkIn: now.toLocaleTimeString(),
            checkOut: null,
            status: "Pending",
            leaveReason: "",
            createdAt: serverTimestamp(),
        });

        localStorage.setItem("checkInTime", now.getTime());

        setHasCheckedIn(true);
        setShowCheckIn(true);   // dikhega
    };


    /* ---------------- CHECK OUT TIMER ---------------- */
    useEffect(() => {
        const fetchTodayAttendance = async () => {
            const today = new Date().toISOString().split("T")[0];

            const q = query(
                collection(db, "attendance"),
                where("staffId", "==", staffId),
                where("date", "==", today)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();

                // LEAVE CASE
                if (data.status === "Leave") {
                    setOnLeave(true);
                    setShowCheckIn(false);
                    return;
                }

                // CHECK-IN DONE, CHECK-OUT PENDING
                if (data.checkIn && !data.checkOut) {
                    setHasCheckedIn(true);
                    setShowCheckIn(true);
                    localStorage.setItem(
                        "checkInTime",
                        new Date(`${today} ${data.checkIn}`).getTime()
                    );
                }

                // CHECK-OUT DONE
                if (data.checkOut) {
                    setShowCheckIn(false);
                    setShowCheckOut(false);
                }
            }
        };

        fetchTodayAttendance();
    }, []);


    /* ---------------- CHECK OUT ---------------- */
    const handleCheckOut = async () => {
        const now = new Date();
        const checkInTime = new Date(
            Number(localStorage.getItem("checkInTime"))
        );

        const diffHours = (now - checkInTime) / (1000 * 60 * 60);
        const status = diffHours <= 4 ? "Present" : "Absent";

        const q = query(
            collection(db, "attendance"),
            where("staffId", "==", staffId),
            where("date", "==", now.toISOString().split("T")[0])
        );

        const snapshot = await getDocs(q);
        snapshot.forEach(async (docSnap) => {
            await updateDoc(docSnap.ref, {
                checkOut: now.toLocaleTimeString(),
                status,
            });
        });

        localStorage.removeItem("checkInTime");
        setShowCheckOut(false);
    };

    /* ---------------- LEAVE ---------------- */
    const handleLeave = async () => {
        if (!leaveReason) {
            alert("Please enter leave reason");
            return;
        }

        const now = new Date();

        await addDoc(collection(db, "attendance"), {
            staffId,
            date: now.toISOString().split("T")[0],
            checkIn: null,
            checkOut: null,
            status: "Leave",
            leaveReason,
            createdAt: serverTimestamp(),
        });

        setOnLeave(true);
        setShowCheckIn(false);
    };
    return (
        <> 
            <Header />
            <CalendarProps />
            <div className="attendance-card">
                <h2>Staff Attendance</h2>

                {/* CHECK IN */}
                {showCheckIn && !onLeave && (
                    <button
                        className={`attendance-btn btn-checkin ${hasCheckedIn ? "btn-disabled" : ""
                            }`}
                        onClick={handleCheckIn}
                        disabled={hasCheckedIn}
                    >
                        Check In
                    </button>
                )}

                {/* MESSAGE AFTER CHECK IN */}
                {hasCheckedIn && !showCheckOut && (
                    <p className="info-text">Come after 3 hours</p>
                )}

                {/* CHECK OUT */}
                {showCheckOut && (
                    <button
                        className={`attendance-btn btn-checkout ${checkOutDisabled ? "btn-disabled" : ""
                            }`}
                        onClick={handleCheckOut}
                        disabled={checkOutDisabled}
                    >
                        Check Out
                    </button>
                )}

                {/* LEAVE SECTION */}
                {!hasCheckedIn && !onLeave && (
                    <div className="leave-box">
                        <textarea
                            placeholder="Leave reason..."
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                        />
                        <button className="attendance-btn btn-leave" onClick={handleLeave}>
                            Apply Leave
                        </button>
                    </div>
                )}

                {/* LEAVE APPROVED MESSAGE */}
                {onLeave && (
                    <p className="approved-text">Your leave is approved ✅</p>
                )}
            </div>

        </>
    )
}