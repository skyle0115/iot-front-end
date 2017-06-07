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
import OverviewItem from './OverviewItem';

const data02 = [
    {
        name: '剩餘電量',
        value: 20
    }, {
        name: '冷氣',
        value: 100
    }, {
        name: '電風扇',
        value: 200
    }, {
        name: '充電器',
        value: 100
    }, {
        name: '電視',
        value: 80
    }, {
        name: '洗衣機',
        value: 40
    }
]

export default class Overview extends Component {
    constructor(props) {
        super(props);

        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div>
                <Row className="my-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>

                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col className="vcenter">
                                        <h3 style={{
                                            margin: 0
                                        }}>總覽</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                            <DropdownToggle caret>
                                                日
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>日</DropdownItem>
                                                <DropdownItem>月</DropdownItem>
                                                <DropdownItem>年</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <div style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <PieChart width={200} height={200}>
                                    <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
                                        剩餘 12 度
                                    </text>
                                    <Pie data={data02} nameKey="name" dataKey="value" innerRadius={60} outerRadius={80} fill="#82ca9d">
                                        <Cell fill="#ededed"/>
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <OverviewItem inverse color="danger"/>
                <OverviewItem inverse color="warning"/>
                <OverviewItem inverse color="info"/>
                <OverviewItem inverse color="primary"/>

            </div>
        );
    }
}
