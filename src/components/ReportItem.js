import React, {Component} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    text
} from 'recharts';
import {CardBlock} from 'reactstrap';

export default class ReportItem extends Component {
    renderLine(name) {
        let lines = [];
        for (let deviceId in name) {
            lines.push(<Line key={deviceId} type="monotone" name={name[deviceId].name} dataKey={deviceId} stroke={name[deviceId].color}/>);
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

                <LineChart width={360} height={200} data={data} margin={{
                    top: 40,
                    right: 40,
                    left: 0,
                    bottom: 0
                }}>
                    <text x={40} y={20}>度</text>
                    <text x={330} y={165}>{this.props.xunit}</text>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/> {this.renderLine(name)}
                </LineChart>

            </CardBlock>
        );
    }
}
