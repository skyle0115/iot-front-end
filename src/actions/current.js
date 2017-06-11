import {getCurrent} from '../api/current'
import _ from 'lodash';
import moment from 'moment';

export function getOverview(start, end) {
    return ((dispatch, getState) => {
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let {devices} = getState();
        let devices_num = devices.length;
        let fecthed_num = 0;
        let payload = [];

        for (let device of devices) {
            getCurrent(device.deviceId, start, end).then(res => {
                let p = {
                    deviceId: device.deviceId,
                    name: device.name,
                    color: device.color,
                    t_a: [],
                    kWh: 0
                }
                p.t_a = res.data.dataChannels.map(data => {
                    return {timestamp: data.timestamp, value: data.values.value};
                });
                for (let i = 0, len = p.t_a.length; i < len - 1; i++) {
                    p.kWh += (p.t_a[i + 1].timestamp - p.t_a[i].timestamp) * p.t_a[i].value;
                }
                p.kWh = Math.round(p.kWh / 1000 * device.V / 3600 / 1000 / 100) / 10;
                payload.push(p);

                fecthed_num++;
                if (fecthed_num === devices_num) {
                    dispatch({
                        type: '@OVERVIEW/GET',
                        payload: _.sortBy(payload, ele => -ele.kWh)
                    });
                }
            });
        }
    });
}

export function getReport(type, start, end) {
    return ((dispatch, getState) => {
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let {devices} = getState();
        let devices_num = devices.length;
        let fecthed_num = 0;
        const index_string = type,
            index_offset = parseInt(moment(start).format(index_string), 10);
        let payload = {
            name: {},
            data: []
        };

        for (let device of devices) {
            getCurrent(device.deviceId, start, end).then(res => {
                payload.name[device.deviceId] = {name: device.name, color: device.color};
                let current = null;
                let sum;

                res.data.dataChannels.push({timestamp: null});
                for (let i = 0, len = res.data.dataChannels.length; i < len; i++) {
                    const data = res.data.dataChannels[i];
                    const timestamp = data.timestamp;
                    const next = moment(timestamp).format(index_string);
                    if (current !== next) {
                        if (current !== null) {
                            const index = parseInt(current, 10) - index_offset;
                            if (!payload.data[index])
                                payload.data[index] = {};
                            payload.data[index].time = index + index_offset;
                            payload.data[index][device.deviceId] = Math.round(sum / 1000 * device.V / 3600 / 1000 / 100) / 10;
                        }
                        current = next;
                        sum = 0;
                    } else {
                        const data0 = res.data.dataChannels[i - 1];
                        const timestamp0 = data0.timestamp,
                            value0 = data0.values.value;
                        sum += (timestamp - timestamp0) * value0;
                    }
                }

                fecthed_num++;
                if (fecthed_num === devices_num) {
                    dispatch({type: `@REPORT/GET_${type}`, payload});
                }
            });
        }
    });
}
