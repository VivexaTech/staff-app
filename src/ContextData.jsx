import { useReducer, createContext, useEffect, useContext } from "react";
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";
import reducer from "./Reducer";

export const Context = createContext();

const initialStaff = {
    loading: true,
    staff: []
};

const initialTasks = {
    loading: true,
    tasks: []
};

const initialAttendance = {
    loading: true,
    attendance: []
};

export default function ContextData({ children }) {
    const [staff, dispatch] = useReducer(reducer, initialStaff);
    const [tasks, dispatchTasks] = useReducer(reducer, initialTasks);
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

            // Tasks Data
            dispatchTasks({ type: "LOAD_TASK_START" });
            const taskApi = await getDocs(collection(db, "tasks"));
            const taskData = taskApi.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatchTasks({ type: "LOAD_TASK_SUCCESS", taskload: taskData });

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
        <Context.Provider value={{ ...tasks, ...staff, ...attendance}}>
            {children}
        </Context.Provider>
    );
}

export function useGlobal() {
    return useContext(Context)
}

