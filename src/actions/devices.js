export function createDevice(name, deviceId, V) {
    return {
        type: '@DEVICES/CREATE',
        payload: {
            name,
            deviceId,
            V
        }
    };
}

export function updateDevice(id, name, deviceId, V) {
    return {
        type: '@DEVICES/UPDATE',
        payload: {
            id,
            name,
            deviceId,
            V
        }
    };
}

export function deleteDevice(id) {
    return {
        type: '@DEVICES/DELETE',
        payload: {
            id
        }
    };
}
