import {deviceKey} from '../config';
import axios from 'axios';

// const baseUrl = 'https://api.mediatek.com/mcs/v2/devices';
const baseUrl = 'http://localhost:3210/api/datapoints';

export function getCurrent(deviceId, start = '', end = '', limit = '', offset = '') {
    // let url = `${baseUrl}/${deviceId}/datachannels/line0_GIoT/datapoints?start=${start}&end=${end}&limit=${limit}&offset=${offset}`
    let url = `${baseUrl}?deviceId=${deviceId}&start=${start}&end=${end}&limit=${limit}&offset=${offset}`;
    return axios.get(url, {headers: {
            deviceKey
        }}).then(res => {
        if (res.data.dataChannels.length < 1000) 
            return res;
        limit = limit !== ''
            ? limit - 1000
            : limit;
        offset = offset === ''
            ? 1000
            : offset + 1000;
        return getCurrent(deviceId, start, end, limit, offset).then(res2 => {
            res2.data.dataChannels = [
                ...res.data.dataChannels,
                ...res2.data.dataChannels
            ];
            return res2;
        });

    });
}
