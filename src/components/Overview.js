import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';
import {Col, Row, Card, CardBlock, CardHeader} from 'reactstrap';

import {getOverview} from '../actions/current';
import OverviewItem from './OverviewItem';
import ComboBox from './ComboBox';

class Overview extends Component {
    constructor(props) {
        super(props);

        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.state = {
            dropdownOpen: false,
            overviewType: '日'
        };
    }

    componentWillMount() {
        this.props.getOverview('日');
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    overviewOnChange(value) {
        this.setState({overviewType: value});
        this.props.getOverview(value);
    }

    render() {
        const {overviewType} = this.state;
        const {overview} = this.props;
        const {day_target, month_target, year_target} = this.props.target;
        const target = overviewType === '日' ? day_target : overviewType === '月' ? month_target : year_target;
        const rest = Math.round((target - _.sumBy(overview, ele => ele.kWh)) * 10) / 10;
        const data = [
            {
                name: '剩餘',
                kWh: rest
            },
            ...overview
        ];
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
                                        <ComboBox items={['日', '月', '年']} onChange={value => this.overviewOnChange(value)}/>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBlock style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}>
                                <PieChart width={200} height={200}>
                                    <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
                                        {`剩餘 ${rest} 度`}
                                    </text>
                                    <Pie data={data} nameKey="name" dataKey="kWh" innerRadius={60} outerRadius={80} fill="#82ca9d">
                                        <Cell fill="#ededed"/>
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                {overview.map((ele, idx) => {
                    const {t_a, name, kWh} = ele;
                    const color = idx < 3
                        ? ['danger', 'warning', 'info'][idx]
                        : 'secondary';
                    return (<OverviewItem key={idx} data={t_a} title={name} value={kWh} color={color} inverse/>);
                })}
            </div>
        );
    }
}

function mapStateToProps({overview, target}) {
    return {overview, target};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getOverview
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
