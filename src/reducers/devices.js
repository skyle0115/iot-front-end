import randomColor from '../common/randomColor';

const defaultState = [
    {
        id: 0,
        name: '冰箱',
        dataChnId: 'line0_GIoT',
        color: randomColor(),
        V: 110
    },
    {
        id: 1,
        name: '烤箱',
        dataChnId: 'line1_GIoT',
        color: randomColor(),
        V: 110
    },
    {
        id: 2,
        name: '洗衣機',
        dataChnId: 'line2_GIoT',
        color: randomColor(),
        V: 110
    }
];

export default function(state = defaultState, action) {
    switch (action.type) {
        case '@DEVICES/CREATE':
            return [
                ...state, {
                    id: state[state.length - 1].id + 1,
                    color: randomColor(),
                    ...action.payload
                }
            ];
        case '@DEVICES/UPDATE':
            let next = [...state];
            const {id, name, dataChnId, V} = action.payload;
            for (let d of next) {
                if (d.id === id) {
                    d.name = name;
                    d.dataChnId = dataChnId;
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
