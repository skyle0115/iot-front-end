export function updateTarget(summerTarget, notSummerTarget) {
    return {
        type: '@TARGET/UPDATE',
        payload: {
            summerTarget,
            notSummerTarget
        }
    };
}
