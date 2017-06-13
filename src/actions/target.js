export function updateTarget(summerTarget, summerFee, notSummerTarget, notSummerFee) {
    return {
        type: '@TARGET/UPDATE',
        payload: {
            summerTarget,
            summerFee,
            notSummerTarget,
            notSummerFee
        }
    };
}
