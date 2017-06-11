import _ from 'lodash';
import moment from 'moment';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {getCurrent} from '../api/current'

export function getOverview(type, start, end) {
    return ((dispatch, getState) => {
        dispatch(showLoading());
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let {devices} = getState();
        let devices_num = devices.length;
        let fecthed_num = 0;
        let payload = [];

        for (let device of devices) {
            getCurrent(device.dataChnId, start, end).then(res => {
                const {id, name, dataChnId, color} = device;
                const {dataPoints} = res.data.dataChannels[0];
                let p = {
                    id,
                    name,
                    dataChnId,
                    color,
                    kWh: 0,
                    t_a: []
                };
                const DATA_POINTS = 300;
                const len = dataPoints.length;
                const interval = len <= DATA_POINTS
                    ? 1
                    : Math.round(len / DATA_POINTS);
                for (let i = 0; i < len - 1; i += interval) {
                    p.t_a.push({timestamp: dataPoints[i].recordedAt, value: dataPoints[i].values.value});
                }
                for (let i = 0; i < len - 1; i++) {
                    p.kWh += (dataPoints[i + 1].recordedAt - dataPoints[i].recordedAt) * dataPoints[i].values.value;
                }
                p.kWh = Math.round(p.kWh / 1000 * device.V / 3600 / 1000 / 100) / 10;
                payload.push(p);
                fecthed_num++;
                if (fecthed_num === devices_num) {
                    dispatch({
                        type: '@OVERVIEW/GET',
                        payload: _.sortBy(payload, ele => -ele.kWh)
                    });
                    dispatch(hideLoading());
                }
            });
        }
    });
}

export function getReport(type, start, end) {
    return ((dispatch, getState) => {
        dispatch(showLoading());
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
            getCurrent(device.dataChnId, start, end).then(res => {
                const {dataPoints} = res.data.dataChannels[0];
                payload.name[device.dataChnId] = {
                    name: device.name,
                    color: device.color
                };
                let current = null;
                let sum;

                dataPoints.push({recordedAt: null});
                for (let i = 0, len = dataPoints.length; i < len; i++) {
                    const data = dataPoints[i];
                    const timestamp = data.recordedAt;
                    const next = moment(timestamp).format(index_string);
                    if (current !== next) {
                        if (current !== null) {
                            const index = parseInt(current, 10) - index_offset;
                            if (!payload.data[index])
                                payload.data[index] = {};
                            payload.data[index].time = index + index_offset;
                            payload.data[index][device.dataChnId] = Math.round(sum / 1000 * device.V / 3600 / 1000 / 100) / 10;
                        }
                        current = next;
                        sum = 0;
                    } else {
                        const data0 = dataPoints[i - 1];
                        const timestamp0 = data0.recordedAt,
                            value0 = data0.values.value;
                        sum += (timestamp - timestamp0) * value0;
                    }
                }
                fecthed_num++;
                if (fecthed_num === devices_num) {
                    dispatch(hideLoading());
                    dispatch({type: `@REPORT/GET_${type}`, payload});
                }
            });
        }
    });
}
