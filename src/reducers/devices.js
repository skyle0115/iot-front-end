import randomColor from 'randomcolor';

const luminosity = 'dark', hue = 'random';

const defaultState = [
    {
        id: 0,
        name: '冰箱',
        deviceId: 'DabcDE78',
        color: randomColor({luminosity, hue}),
        V: 110
    }, {
        id: 1,
        name: '電視',
        deviceId: 'DbzrXH0P',
        color: randomColor({luminosity, hue}),
        V: 110
    }, {
        id: 2,
        name: '烤箱',
        deviceId: 'DXLQwmnN',
        color: randomColor({luminosity, hue}),
        V: 220
    }
];

export default function(state = defaultState, action) {
    switch (action.type) {
        case '@DEVICES/CREATE':
            return [
                ...state, {
                    id: state.length,
                    color: randomColor({luminosity, hue}),
                    ...action.payload
                }
            ];
        case '@DEVICES/UPDATE':
            let next = [...state];
            const {id, name, deviceId, V} = action.payload;
            for (let d of next) {
                if (d.id === id) {
                    d.name = name;
                    d.deviceId = deviceId;
                    d.V = parseInt(V, 10);
                }
            }
            return next;
        case '@DEVICES/DELETE':
            return [...state].filter(e => e.id !== action.payload.id);
        default:
            return state;
    }
}
