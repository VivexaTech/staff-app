import { useReducer, createContext, useEffect, useContext } from "react";
import { db } from "./Firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import reducer from "./Reducer";

export const Context = createContext();

const initialStaff = {
    loading: true,
    staff: []
};
const initialNotice = {
    loading: true,
    notice: []
};

const initialTasks = {
    loading: true,
    tasks: []
};

const initialTaskForm = {
    loading: true,
    taskForm: []
};

const initialAttendance = {
    loading: true,
    attendance: []
};

export default function ContextData({ children }) {
    const [staff, dispatch] = useReducer(reducer, initialStaff);
    const [notice, dispatchNotice] = useReducer(reducer, initialNotice);
    const [tasks, dispatchTasks] = useReducer(reducer, initialTasks);
    const [taskForm, dispatchTasksForm] = useReducer(reducer, initialTaskForm);
    const [attendance, dispatchAttendance] = useReducer(reducer, initialAttendance);

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: "LOAD_STAFFID_START" });

            const staffApi = await getDocs(collection(db, "staff"));
            const staffData = staffApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatch({ type: "LOAD_STAFFID_SUCCESS", staffload: staffData });

            // Notice
            dispatchNotice({ type: "LOAD_NOTICE_START" });

            const noticeApi = await getDocs(collection(db, "notice"));
            const noticeData = noticeApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatchNotice({ type: "LOAD_NOTICE_SUCCESS", noticeload: noticeData });

            dispatchTasks({ type: "LOAD_TASK_START" });

            const unsubTasks = onSnapshot(collection(db, "tasks"), (snapshot) => {
                const taskData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                dispatchTasks({
                    type: "LOAD_TASK_SUCCESS",
                    taskload: taskData
                });
                return () => unsubTasks();
            });
            


            // Task Form
            dispatchTasksForm({ type: "LOAD_TASKFORM_START" });
            const taskFormApi = await getDocs(collection(db, "taskSubmit"));
            const taskFormData = taskFormApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatchTasksForm({ type: "LOAD_TASKFORM_SUCCESS", taskformload: taskFormData });

            // Attendance Data
            dispatchAttendance({ type: "LOAD_ATT_START" });

            const attApi = await getDocs(collection(db, "attendance"));
            const attData = attApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatchAttendance({ type: "LOAD_ATT_SUCCESS", attload: attData });
        };

        getData();
        
    }, []);

    return (
        <Context.Provider value={{ ...tasks, ...staff, ...attendance, ...taskForm, ...notice }}>
            {children}
        </Context.Provider>
    );
}

export function useGlobal() {
    return useContext(Context)
}

