import React, {Component} from 'react';
import {AreaChart, Area, ResponsiveContainer} from 'recharts';

import {
    Col,
    Row,
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

const data = [
    {
        name: '11:00',
        value: 1
    }, {
        name: '11:15',
        value: 0.8
    }, {
        name: '11:30',
        value: 1.2
    }, {
        name: '11:45',
        value: 1.2
    }, {
        name: '12:00',
        value: 0.8
    }
];

export default class OverviewItem extends Component {
    render() {
        return (
            <Row className="mb-3">
                <Col md={{
                    size: 4,
                    offset: 4
                }}>
                    <Card inverse={this.props.inverse} color={this.props.color}>
                        <CardBlock>
                            <Row>
                                <Col>
                                    <ResponsiveContainer width="100%" height={50}>
                                        <AreaChart data={data}>
                                            <Area type='monotone' dataKey='value' stroke='#fff' fill='#fff'/>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Col>
                                <Col className="text-right">
                                    <CardTitle>電風扇</CardTitle>
                                    <CardSubtitle>12</CardSubtitle>
                                </Col>
                            </Row>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        );
    }
}
