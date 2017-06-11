export function overview(state = [], action) {
    switch (action.type) {
        case '@OVERVIEW/GET':
            return action.payload;
        default:
            return state;
    }
}

const defaultState = {
    year: {
        data: [],
        name: []
    },
    month: {
        data: [],
        name: []
    },
    day: {
        data: [],
        name: []
    }
};

export function report(state = defaultState, action) {
    switch (action.type) {
        case '@REPORT/GET_DD':
            return {
                ...state,
                day: action.payload
            };
        case '@REPORT/GET_MM':
            return {
                ...state,
                month: action.payload
            };
        case '@REPORT/GET_YYYY':
            return {
                ...state,
                year: action.payload
            };
        default:
            return state;
    }
}
