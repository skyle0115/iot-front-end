export function updateTarget(day_target, month_target, year_target) {
    return {
        type: '@TARGET/UPDATE',
        payload: {
            day_target,
            month_target,
            year_target
        }
    };
}
