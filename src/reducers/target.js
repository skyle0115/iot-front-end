export default function(state = {day_target: 17, month_target: 17 * 31, year_target: 17 * 31 * 12}, action) {
    switch (action.type) {
        case '@TARGET/UPDATE':
            return action.payload;
        default:
            return state;
    }
}
