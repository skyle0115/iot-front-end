import React, {Component} from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts';

import {CardBlock} from 'reactstrap';

export default class ReportItem extends Component {
    renderLine(name) {
        let lines = [];
        for (let deviceId in name) {
            lines.push(<Line type="monotone" name={name[deviceId]} dataKey={deviceId} stroke="#8884d8"/>);
        }
        return lines;
    }

    render() {
        let {data, name} = this.props.data;
        return (
            <CardBlock style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>

                <LineChart width={360} height={180} data={data} margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/> {this.renderLine(name)}
                </LineChart>

            </CardBlock>
        );
    }
}
