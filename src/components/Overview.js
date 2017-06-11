import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';
import {
    Col,
    Row,
    Card,
    CardBlock,
    CardHeader,
    CardFooter,
    Table
} from 'reactstrap';
import randomColor from 'randomcolor';
import moment from 'moment';

import {getOverview} from '../actions/current';
import OverviewItem from './OverviewItem';
import ComboBox from './ComboBox';

class Overview extends Component {
    constructor(props) {
        super(props);

        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.state = {
            dropdownOpen: false,
            overviewType: '日',
            overviewStart: '',
            overviewEnd: ''
        };
    }

    componentWillMount() {
        this.overviewOnChange('日');
    }

    dropdownToggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    overviewOnChange(type) {
        let today = moment().format('YYYY/MM/DD'),
            this_month = moment().format('YYYY/MM') + '/01',
            this_year = moment().format('YYYY') + '/01/01';
        let start_day = type === '年'
            ? this_year
            : type === '月'
                ? this_month
                : today;
        let overviewStart = `${start_day} 00:00:00`,
            overviewEnd = moment().format('YYYY/MM/DD HH:mm:ss');
        this.setState({overviewType: type, overviewStart, overviewEnd});
        this.props.getOverview(overviewStart, overviewEnd);
    }

    renderLegend(data) {
        return (
            <ul style={{
                listStyleType: 'none',
                padding: 0,
                display: 'inline-block'
            }}>
                {data.map(e => {
                    const {id, name, color} = e;
                    return (
                        <li key={id}>
                            <div className="mr-2" style={{
                                display: 'inline-block',
                                width: 10,
                                height: 10,
                                backgroundColor: color
                            }}/>
                            <span>{name}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }

    renderOverview(overview) {
        return overview.map((ele, idx) => {
            const {t_a, name, color, kWh} = ele;
            return (<OverviewItem key={idx} data={t_a} title={name} value={kWh} color={color} inverse/>);
        });
    }

    render() {
        const {overviewType, overviewStart, overviewEnd} = this.state;
        const {overview} = this.props;
        const {day_target, month_target, year_target} = this.props.target;
        const target = overviewType === '日'
            ? day_target
            : overviewType === '月'
                ? month_target
                : year_target;
        const rest = Math.round((target - _.sumBy(overview, ele => ele.kWh)) * 10) / 10;
        const data = [
            {
                id: -1,
                name: '剩餘',
                kWh: rest,
                color: '#ededed'
            },
            ...overview
        ];
        return (
            <div>
                <Row className="my-3">
                    <Col md={{
                        size: 6,
                        offset: 3
                    }}>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col className="my-auto">
                                        <h3 style={{
                                            margin: 0
                                        }}>總覽</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <ComboBox items={['日', '月', '年']} onChange={value => this.overviewOnChange(value)}/>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBlock>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <PieChart width={200} height={200}>
                                        <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
                                            {`剩餘 ${rest} 度`}
                                        </text>
                                        <Pie data={data} nameKey="name" dataKey="kWh" innerRadius={60} outerRadius={80} fill="#82ca9d">
                                            {data.map(e => <Cell key={e.id} fill={e.color}/>)}
                                        </Pie>
                                        <Tooltip/>
                                    </PieChart>
                                    {this.renderLegend(data)}
                                </div>
                            </CardBlock>
                            <CardFooter className="text-muted text-center">
                                {`${overviewStart} ~ ${overviewEnd}`}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                {this.renderOverview(overview)}
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
