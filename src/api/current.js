import {deviceKey} from '../config';
import axios from 'axios';

const baseUrl = 'https://api.mediatek.com/mcs/v2/devices';
// const baseUrl = 'http://localhost:3210/api/datapoints';

export function getCurrent(dataChnId, start = '', end = '', offset = '') {
    let url = `${baseUrl}/Dj0UD5P3/datachannels/${dataChnId}/datapoints?start=${start}&end=${end}&limit=1000&offset=${offset}`
    // let url = `${baseUrl}?dataChnId=${dataChnId}&start=${start}&end=${end}&limit=1000&offset=${offset}`;
    return axios.get(url, {headers: {
            deviceKey
        }}).then(res => {
        res.data.dataChannels[0].dataPoints.reverse();
        if (res.data.dataChannels[0].dataPoints.length < 1000) {
            return res;
        }
        offset = offset === ''
            ? 1000
            : offset + 1000;
        return getCurrent(dataChnId, start, end, offset).then(res2 => {
            res2.data.dataChannels[0].dataPoints = [
                ...res2.data.dataChannels[0].dataPoints,
                ...res.data.dataChannels[0].dataPoints
            ];
            return res2;
        });

    });
}
