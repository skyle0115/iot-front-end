import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import {
    Col,
    Row,
    Card,
    CardBlock,
    CardHeader,
    CardText,
    CardFooter,
    Button,
    Progress
} from 'reactstrap';
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
        this.props.getOverview(type, overviewStart, overviewEnd);
    }

    renderOverview(overview) {
        return overview.map((ele, idx) => {
            const {t_a, name, color, kWh} = ele;
            return (<OverviewItem key={idx} data={t_a} title={name} value={kWh} color={color} inverse/>);
        });
    }

    calculateBill(month, kWh) {
        const unit = ((month + 1) >= 6 || (month + 1) <= 9)
            ? 6
            : 3;
        return unit * kWh;
    }

    render() {
        const {overviewType, overviewStart, overviewEnd} = this.state;
        const {overview} = this.props;
        const {summerTarget, notSummerTarget} = this.props.target;
        const monthTarget = ((moment().month() + 1) >= 6 || (moment().month() + 1) <= 9)
            ? summerTarget
            : notSummerTarget;
        const target = overviewType === '日'
            ? Math.round(monthTarget / moment().daysInMonth())
            : overviewType === '月'
                ? monthTarget
                : summerTarget * 4 + notSummerTarget * 8;
        const total = _.sumBy(overview, ele => ele.kWh);
        const rest = Math.round((target - total) * 10) / 10;
        const data = [
            {
                id: -1,
                name: rest > 0
                    ? '剩餘'
                    : '超過',
                kWh: rest > 0
                    ? rest
                    : -rest,
                color: rest > 0
                    ? '#ededed'
                    : '#000000'
            },
            ...overview
        ];
        const alert = {
            distance: '',
            time: '',
            unit: '',
            currentFee: '',
            totalFee: ''
        };
        alert.currentFee = Math.round(this.calculateBill(moment().month(), total));
        switch (overviewType) {
            case '日':
                alert.distance = '今天';
                alert.time = moment().endOf('day').hour() - moment().hour();
                alert.unit = '個小時';
                alert.totalFee = Math.round(alert.currentFee * moment().endOf('day').hour() / moment().hour());
                break;
            case '月':
                alert.distance = '本月';
                alert.time = moment().endOf('month').date() - moment().date();
                alert.unit = '天';
                alert.totalFee = Math.round(alert.currentFee * moment().endOf('month').date() / moment().date());
                break;
            default:
                alert.distance = '今年';
                alert.time = moment().endOf('year').month() - moment().month();
                alert.unit = '個月';
                alert.totalFee = Math.round(alert.currentFee * moment().endOf('year').month() / moment().month());
        }
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
                                        <ComboBox default={this.state.overviewType} items={['日', '月', '年']} onChange={value => this.overviewOnChange(value)}/>{' '}
                                        <Button onClick={e => this.overviewOnChange(this.state.overviewType)} color="primary">
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardHeader>{`${alert.distance}上限 ${target} 度，剩餘 ${rest} 度，距${alert.distance}結束還有 ${alert.time} ${alert.unit}。`}</CardHeader>
                            <CardBlock>
                                <div className="mx-auto mb-3" style={{
                                    width: 300
                                }}>
                                    <PieChart width={300} height={200}>
                                        <Pie data={data} nameKey="name" dataKey="kWh" innerRadius={0} outerRadius={80} fill="#82ca9d">
                                            {data.map(e => <Cell key={e.id} fill={e.color}/>)}
                                        </Pie>
                                        <Legend align="right" verticalAlign="middle" layout="vertical"/>
                                        <Tooltip/>
                                    </PieChart>
                                </div>
                                <CardText className="text-center">
                                    <Progress multi>
                                        <Progress bar color="success" value={Math.round(alert.currentFee * 100 / alert.totalFee)}>{`$${alert.currentFee}`}</Progress>
                                    </Progress>
                                    {`${alert.distance}電費：目前 ${alert.currentFee} 元，預估共 ${alert.totalFee} 元。`}
                                </CardText>
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
