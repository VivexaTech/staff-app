export default function Reducer(state, action) {
    switch (action.type) {
        case "LOAD_STAFFID_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_STAFFID_SUCCESS":
            return {
                loading: false,
                staff: action.staffload,
            };

        case "LOAD_TASK_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_TASK_SUCCESS":
            return {
                loading: false,
                tasks: action.taskload,
            };
        case "LOAD_ATT_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_ATT_SUCCESS":
            return {
                loading: false,
                attendance: action.attload,
            };
        
        default: return state;    
    }
}