import React, {Component} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    text,
    Brush
} from 'recharts';
import {CardBlock} from 'reactstrap';

export default class ReportItem extends Component {
    renderBar(name) {
        let bars = [];
        for (let dataChnId in name) {
            bars.push(<Bar key={dataChnId} type="monotone" name={name[dataChnId].name} dataKey={dataChnId} fill={name[dataChnId].color} stackId="a"/>);
        }
        return bars;
    }

    render() {
        let {data, name} = this.props.data;
        let {startIndex, endIndex, xunit} = this.props;
        return (
            <CardBlock style={{
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <BarChart width={360} height={230} data={data} margin={{
                    top: 0,
                    right: 40,
                    left: 0,
                    bottom: 0
                }}>
                    <text x={40} y={20}>度</text>
                    <text x={325} y={185}>{xunit}</text>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend width={360} align="center" verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                    <Brush startIndex={startIndex} endIndex={endIndex} dataKey='time' height={30} stroke="#8884d8"/> {this.renderBar(name)}
                </BarChart>
            </CardBlock>
        );
    }
}
