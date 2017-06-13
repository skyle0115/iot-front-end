const defaultState = {
    summerTarget: 424,
    summerFee: 6,
    notSummerTarget: 303,
    notSummerFee: 3
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case '@TARGET/UPDATE':
            return action.payload;
        default:
            return state;
    }
}
