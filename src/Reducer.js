export default function Reducer(state, action) {
    switch (action.type) {

        case "LOAD_STAFFID_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_STAFFID_SUCCESS":
            return {
                ...state,
                loading: false,
                staff: action.staffload,
            };
        case "LOAD_NOTICE_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_NOTICE_SUCCESS":
            return {
                ...state,
                loading: false,
                notice: action.noticeload,
            };

        case "LOAD_TASK_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_TASK_SUCCESS":
            return {
                ...state,
                loading: false,
                tasks: action.taskload,
            };

        case "LOAD_TASKFORM_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_TASKFORM_SUCCESS":
            return {
                ...state,
                loading: false,
                taskForm: action.taskformload,
            };

        case "LOAD_ATT_START":
            return {
                ...state,
                loading: true,
            };

        case "LOAD_ATT_SUCCESS":
            return {
                ...state,
                loading: false,
                attendance: action.attload,
            };

        default:
            return state;
    }
}
