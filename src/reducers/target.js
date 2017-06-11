const defaultState = {
    day_target: 17,
    month_target: 17 * 31,
    year_target: 17 * 31 * 12,
    summerTarget: 424,
    notSummerTarget: 303,
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case '@TARGET/UPDATE':
            return action.payload;
        default:
            return state;
    }
}
