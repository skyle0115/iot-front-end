import React, {Component} from 'react';
import {AreaChart, Area, ResponsiveContainer} from 'recharts';

import {Col, Row, Card, CardBlock, CardTitle} from 'reactstrap';

export default class OverviewItem extends Component {
    render() {
        const {inverse, color, data, title, value} = this.props;

        return (
            <Row className="mb-3">
                <Col md={{
                    size: 6,
                    offset: 3
                }}>
                    <Card inverse={inverse} style={{
                        border: 0,
                        backgroundColor: color
                    }}>
                        <ResponsiveContainer width="100%" height={100}>
                            <AreaChart data={data} margin={{
                                top: 60,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }}>
                                <Area type='monotone' dataKey='value' stroke='#fff' fill='#fff'/>
                            </AreaChart>
                        </ResponsiveContainer>
                        <CardBlock style={{
                            position: 'absolute',
                            width: '100%',
                            color: '#fff'
                        }}>
                            <Row>
                                <Col className="my-auto">
                                    <h3>{`${title}`}</h3>
                                </Col>
                                <Col className="text-right">
                                    <h3>{`${value} 度`}</h3>
                                </Col>
                            </Row>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        );
    }
}
