import { useReducer, createContext, useEffect, useContext } from "react";
import { db } from "./Firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import reducer from "./Reducer";

export const Context = createContext();

const initialStaff = { loading: true, staff: [] };
const initialNotice = { loading: true, notice: [] };
const initialTasks = { loading: true, tasks: [] };
const initialTaskForm = { loading: true, taskForm: [] };
const initialAttendance = { loading: true, attendance: [] };

export default function ContextData({ children }) {
    const [staff, dispatch] = useReducer(reducer, initialStaff);
    const [notice, dispatchNotice] = useReducer(reducer, initialNotice);
    const [tasks, dispatchTasks] = useReducer(reducer, initialTasks);
    const [taskForm, dispatchTasksForm] = useReducer(reducer, initialTaskForm);
    const [attendance, dispatchAttendance] = useReducer(reducer, initialAttendance);

    useEffect(() => {
        // ---------- STAFF ----------
        const loadStaff = async () => {
            dispatch({ type: "LOAD_STAFFID_START" });

            const staffApi = await getDocs(collection(db, "staff"));
            const staffData = staffApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatch({ type: "LOAD_STAFFID_SUCCESS", staffload: staffData });
        };

        // ---------- NOTICE ----------
        const loadNotice = async () => {
            dispatchNotice({ type: "LOAD_NOTICE_START" });

            const noticeApi = await getDocs(collection(db, "notice"));
            const noticeData = noticeApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatchNotice({ type: "LOAD_NOTICE_SUCCESS", noticeload: noticeData });
        };

        // ---------- TASK FORM ----------
        const loadTaskForm = async () => {
            dispatchTasksForm({ type: "LOAD_TASKFORM_START" });

            const taskFormApi = await getDocs(collection(db, "taskSubmit"));
            const taskFormData = taskFormApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatchTasksForm({
                type: "LOAD_TASKFORM_SUCCESS",
                taskformload: taskFormData
            });
        };

        loadStaff();
        loadNotice();
        loadTaskForm();

        // ---------- REALTIME TASKS ----------
        dispatchTasks({ type: "LOAD_TASK_START" });
        const unsubTasks = onSnapshot(collection(db, "tasks"), snapshot => {
            const taskData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatchTasks({ type: "LOAD_TASK_SUCCESS", taskload: taskData });
        });

        // ---------- REALTIME ATTENDANCE ----------
        dispatchAttendance({ type: "LOAD_ATT_START" });
        const unsubAttendance = onSnapshot(collection(db, "attendance"), snapshot => {
            const attData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatchAttendance({ type: "LOAD_ATT_SUCCESS", attload: attData });
        });


        return () => {
            unsubTasks();
            unsubAttendance();
        };
    }, []);

    return (
        <Context.Provider value={{ ...staff, ...notice, ...tasks, ...taskForm, ...attendance }}>
            {children}
        </Context.Provider>
    );
}

export function useGlobal() {
    return useContext(Context);
}
