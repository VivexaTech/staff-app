/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CalendarProps from "../components/CalendarProps";
import Header from "../components/Header";
import {
    addDoc,
    collection,
    updateDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    Timestamp,
    doc
} from "firebase/firestore";
import { db } from "../Firebase";

export default function Attendance() { 
    const staffId = "9sVjI5RuQj5QblexVRs0";
    const WORK_HOURS = 3 * 60 * 60 * 1000; // 3 hours

    const [attendanceDoc, setAttendanceDoc] = useState(null);
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [onLeave, setOnLeave] = useState(false);
    const [leaveReason, setLeaveReason] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const [checkInTime, setCheckInTime] = useState(null);

    /* ---------------- FETCH TODAY ATTENDANCE ---------------- */
    useEffect(() => {
        const fetchAttendance = async () => {
            const start = new Date();
            start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setHours(23, 59, 59, 999);

            const q = query(
                collection(db, "attendance"),
                where("staffId", "==", staffId),
                where("date", ">=", Timestamp.fromDate(start)),
                where("date", "<=", Timestamp.fromDate(end))
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const snap = snapshot.docs[0];
                const data = snap.data();

                setAttendanceDoc({ id: snap.id, ...data });

                if (data.status === "Leave") {
                    setOnLeave(true);
                    return;
                }

                if (data.checkIn) {
                    const ci = data.checkIn.toDate().getTime();
                    setHasCheckedIn(true);
                    setCheckInTime(ci);

                    const diff = WORK_HOURS - (Date.now() - ci);
                    setRemainingTime(diff > 0 ? diff : 0);
                    setShowCheckOut(!data.checkOut && diff <= 0);
                }
            }
        };

        fetchAttendance();
    }, []);

    /* ---------------- CHECK IN ---------------- */
    const handleCheckIn = async () => {
        if (attendanceDoc) return;

        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const docRef = await addDoc(collection(db, "attendance"), {
            staffId,
            date: Timestamp.fromDate(midnight),
            checkIn: serverTimestamp(),
            checkOut: null,
            status: "Pending",
            leaveReason: "",
            createdAt: serverTimestamp(),
        });

        setAttendanceDoc({ id: docRef.id });
        setHasCheckedIn(true);
        setCheckInTime(Date.now());
    };

    /* ---------------- TIMER ---------------- */
    useEffect(() => {
        if (!checkInTime) return;

        const interval = setInterval(() => {
            const diff = WORK_HOURS - (Date.now() - checkInTime);

            if (diff <= 0) {
                setRemainingTime(0);
                setShowCheckOut(true);
                clearInterval(interval);
            } else {
                setRemainingTime(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [checkInTime]);

    /* ---------------- CHECK OUT ---------------- */
    const handleCheckOut = async () => {
        if (!attendanceDoc || attendanceDoc.checkOut) return;

        await updateDoc(doc(db, "attendance", attendanceDoc.id), {
            checkOut: serverTimestamp(),
            status: "Present",
        });

        setShowCheckOut(false);
    };

    /* ---------------- LEAVE ---------------- */
    const handleLeave = async () => {
        if (!leaveReason.trim()) {
            alert("Please enter leave reason");
            return;
        }

        if (attendanceDoc) return;

        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        await addDoc(collection(db, "attendance"), {
            staffId,
            date: Timestamp.fromDate(midnight),
            checkIn: null,
            checkOut: null,
            status: "Leave",
            leaveReason,
            createdAt: serverTimestamp(),
        });

        setOnLeave(true);
    };

    /* ---------------- FORMAT TIME ---------------- */
    const formatTime = (ms) => {
        const t = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = t % 60;

        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <Header />
            <CalendarProps />

            <div className="attendance-card">
                <h2>Mark Your Attendance</h2>

                {!attendanceDoc && !onLeave && (
                    <button
                        className="attendance-btn btn-checkin"
                        onClick={handleCheckIn}
                    >
                        Check In
                    </button>
                )}

                {hasCheckedIn && !showCheckOut && (
                    <p className="info-text">
                        Check out available in:
                        <b> {formatTime(remainingTime)}</b>
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

                {!attendanceDoc && !hasCheckedIn && !onLeave && (
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
