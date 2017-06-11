export function createDevice(name, dataChnId, V) {
    return {
        type: '@DEVICES/CREATE',
        payload: {
            name,
            dataChnId,
            V
        }
    };
}

export function updateDevice(id, name, dataChnId, V) {
    return {
        type: '@DEVICES/UPDATE',
        payload: {
            id,
            name,
            dataChnId,
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
