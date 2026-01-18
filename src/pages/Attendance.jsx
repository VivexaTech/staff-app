import CalendarProps from "../components/CalendarProps";
import Header from "../components/Header";
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

export default function Attendance() {
    const staffId = "9sVjI5RuQj5QblexVRs0";

    const [showCheckIn, setShowCheckIn] = useState(true);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [checkOutDisabled] = useState(false);
    const [leaveReason, setLeaveReason] = useState("");
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [onLeave, setOnLeave] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

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
        setShowCheckIn(true);
        setShowCheckOut(false);
    };

    /* ---------------- FETCH TODAY ATTENDANCE ---------------- */
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

                if (data.status === "Leave") {
                    setOnLeave(true);
                    setShowCheckIn(false);
                    return;
                }

                if (data.checkIn && !data.checkOut) {
                    setHasCheckedIn(true);
                    setShowCheckIn(true);
                    localStorage.setItem(
                        "checkInTime",
                        new Date(`${today} ${data.checkIn}`).getTime()
                    );
                }

                if (data.checkOut) {
                    setShowCheckIn(false);
                    setShowCheckOut(false);
                }
            }
        };

        fetchTodayAttendance();
    }, []);

    /* ---------------- TIMER (3 HOURS) ---------------- */
    useEffect(() => {
        let interval;

        if (hasCheckedIn) {
            interval = setInterval(() => {
                const checkInTime = Number(localStorage.getItem("checkInTime"));
                if (!checkInTime) return;

                const now = new Date().getTime();
                const diff = 3 * 60 * 60 * 1000 - (now - checkInTime);

                if (diff <= 0) {
                    setRemainingTime(0);
                    setShowCheckOut(true);
                    clearInterval(interval);
                } else {
                    setRemainingTime(diff);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [hasCheckedIn]);

    /* ---------------- CHECK OUT ---------------- */
    const handleCheckOut = async () => {
        const now = new Date();
        const checkInTime = new Date(
            Number(localStorage.getItem("checkInTime"))
        );

        const diffHours = (now - checkInTime) / (1000 * 60 * 60);
        const status = diffHours >= 3 ? "Present" : "Absent";

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

    /* ---------------- TIME FORMAT ---------------- */
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
                        className={`attendance-btn btn-checkin ${
                            hasCheckedIn ? "btn-disabled" : ""
                        }`}
                        onClick={handleCheckIn}
                        disabled={hasCheckedIn}
                    >
                        Check In
                    </button>
                )}

                {/* TIMER */}
                {hasCheckedIn && !showCheckOut && (
                    <p className="info-text">
                        Check out available in:{" "}
                        <b>{formatTime(remainingTime)}</b>
                    </p>
                )}

                {/* CHECK OUT */}
                {showCheckOut && (
                    <button
                        className="attendance-btn btn-checkout"
                        onClick={handleCheckOut}
                    >
                        Check Out
                    </button>
                )}

                {/* LEAVE */}
                {!hasCheckedIn && !onLeave && (
                    <div className="leave-box">
                        <textarea
                            placeholder="Leave reason..."
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                        />
                        <button
                            className="attendance-btn btn-leave"
                            onClick={handleLeave}
                        >
                            Apply Leave
                        </button>
                    </div>
                )}

                {/* LEAVE MESSAGE */}
                {onLeave && (
                    <p className="approved-text">
                        Your leave is approved ✅
                    </p>
                )}
            </div>
        </>
    );
}
