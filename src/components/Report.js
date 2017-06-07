import React, {Component} from 'react';
import {
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    Col,
    Row,
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button,
    CardImgOverlay,
    CardHeader,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import ComboBox from './ComboBox';

const data = [
    {
        name: '11:00',
        value: 1,
        value2: 0.8
    }, {
        name: '11:15',
        value: 0.8,
        value2: 1.2
    }, {
        name: '11:30',
        value: 1.2,
        value2: 1.0
    }, {
        name: '11:45',
        value: 1.2,
        value2: 1.2
    }, {
        name: '12:00',
        value: 0.8,
        value2: 0.9
    }
];

export default class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startYear: 2016
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Row className="my-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Card>
                            <CardHeader tag="h3">年</CardHeader>
                            <CardHeader>
                                <ComboBox items={[2017, 2016, 2015]} onChange={value => this.setState({startYear: value})}/> {' 年 ~ '}<ComboBox items={[2017, 2016, 2015]} onChange={value => this.setState({endYear: value})}/> {' 年 '}
                            </CardHeader>
                            <div style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <LineChart width={320} height={160} data={data} margin={{
                                    top: 30,
                                    right: 30,
                                    left: -20,
                                    bottom: 15
                                }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                                    <Line type="monotone" dataKey="value2" stroke="#82ca9d"/>
                                </LineChart>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Card>
                            <CardHeader tag="h3">月</CardHeader>
                            <CardHeader>
                                <ComboBox items={[2017, 2016, 2015]} onChange={value => this.setState({startYear: value})}/> {' 年 '}<ComboBox items={[1, 2, 3]} onChange={value => this.setState({endYear: value})}/> {' 月 ~ '}<ComboBox items={[1, 2, 3]} onChange={value => this.setState({endYear: value})}/> {' 月 '}
                            </CardHeader>
                            <div style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <LineChart width={320} height={160} data={data} margin={{
                                    top: 30,
                                    right: 30,
                                    left: -20,
                                    bottom: 15
                                }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                                    <Line type="monotone" dataKey="value2" stroke="#82ca9d"/>
                                </LineChart>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Card>
                            <CardHeader tag="h3">日</CardHeader>
                            <CardHeader>
                                <ComboBox items={[2017, 2016, 2015]} onChange={value => this.setState({startYear: value})}/> {' 年 '}<ComboBox items={[1, 2, 3]} onChange={value => this.setState({endYear: value})}/> {' 月 '}<ComboBox items={[1, 2, 3]} onChange={value => this.setState({endYear: value})}/> {' 日 ~ '}<ComboBox items={[1, 2, 3]} onChange={value => this.setState({endYear: value})}/> {' 日 '}
                            </CardHeader>
                            <div style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <LineChart width={320} height={160} data={data} margin={{
                                    top: 30,
                                    right: 30,
                                    left: -20,
                                    bottom: 15
                                }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                                    <Line type="monotone" dataKey="value2" stroke="#82ca9d"/>
                                </LineChart>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
