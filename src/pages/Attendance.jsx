/* eslint-disable react-hooks/exhaustive-deps */
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
    const WORK_HOURS = 3 * 60 * 60 * 1000; // 3 hours

    const [attendanceDoc, setAttendanceDoc] = useState(null);
    const [showCheckIn, setShowCheckIn] = useState(true);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [onLeave, setOnLeave] = useState(false);
    const [leaveReason, setLeaveReason] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);

    /* ---------------- FETCH TODAY ATTENDANCE ---------------- */
    useEffect(() => {
        const fetchAttendance = async () => {
            const today = new Date().toISOString().split("T")[0];

            const q = query(
                collection(db, "attendance"),
                where("staffId", "==", staffId),
                where("date", "==", today)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const data = doc.data();

                setAttendanceDoc(doc);

                if (data.status === "Leave") {
                    setOnLeave(true);
                    setShowCheckIn(false);
                    return;
                }

                if (data.checkIn && !data.checkOut) {
                    setHasCheckedIn(true);
                    setShowCheckIn(true);
                }

                if (data.checkOut) {
                    setShowCheckIn(false);
                    setShowCheckOut(false);
                }
            }
        };

        fetchAttendance();
    }, []);

    /* ---------------- CHECK IN ---------------- */
    const handleCheckIn = async () => {
        const now = new Date();

        const docRef = await addDoc(collection(db, "attendance"), {
            staffId,
            date: now.toISOString().split("T")[0],
            checkIn: now.toLocaleTimeString(),
            checkOut: null,
            status: "Pending",
            leaveReason: "",
            createdAt: serverTimestamp(),
        });

        setAttendanceDoc({ id: docRef.id });
        setHasCheckedIn(true);
        setShowCheckIn(true);
    };

    /* ---------------- TIMER (FIREBASE BASED) ---------------- */
    useEffect(() => {
        let interval;

        if (hasCheckedIn && attendanceDoc) {
            interval = setInterval(async () => {
                const snapshot = await getDocs(
                    query(
                        collection(db, "attendance"),
                        where("staffId", "==", staffId),
                        where("date", "==", new Date().toISOString().split("T")[0])
                    )
                );

                if (snapshot.empty) return;

                const data = snapshot.docs[0].data();
                if (!data.createdAt) return;

                const checkInTime = data.createdAt.toDate().getTime();
                const now = Date.now();

                const diff = WORK_HOURS - (now - checkInTime);

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
    }, [hasCheckedIn, attendanceDoc]);

    /* ---------------- CHECK OUT ---------------- */
    const handleCheckOut = async () => {
        if (!attendanceDoc) return;

        const now = new Date();

        await updateDoc(
            collection(db, "attendance").doc(attendanceDoc.id),
            {
                checkOut: now.toLocaleTimeString(),
                status: "Present",
            }
        );

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
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <Header />
            <CalendarProps />

            <div className="attendance-card">
                <h2>Staff Attendance</h2>

                {showCheckIn && !onLeave && (
                    <button
                        className="attendance-btn btn-checkin"
                        onClick={handleCheckIn}
                        disabled={hasCheckedIn}
                    >
                        Check In
                    </button>
                )}

                {hasCheckedIn && !showCheckOut && (
                    <p className="info-text">
                        Check out available in:{" "}
                        <b>{formatTime(remainingTime)}</b>
                    </p>
                )}

                {showCheckOut && (
                    <button
                        className="attendance-btn btn-checkout"
                        onClick={handleCheckOut}
                    >
                        Check Out
                    </button>
                )}

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

                {onLeave && (
                    <p className="approved-text">
                        Your leave is approved ✅
                    </p>
                )}
            </div>
        </>
    );
}
