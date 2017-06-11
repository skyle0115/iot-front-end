import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {Col, Row, Card, Button, CardHeader} from 'reactstrap';

import ComboBox from './ComboBox';
import {getReport} from '../actions/current';
import ReportItem from './ReportItem';

var YEAR = [
        2016, 2017
    ],
    MONTH = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
    ];

class Report extends Component {

    constructor(props) {
        super(props);
        let year = moment().year(),
            month = moment().month() + 1,
            date = moment().date();
        this.state = {
            monthStartYear: year,
            dayStartYear: year,
            dayStartMonth: month
        }
    }

    componentWillMount() {
        this.fetchYear();
        this.fetchMonth();
        this.fetchDay();
    }

    fetchYear() {
        this.props.getReport('YYYY', `2016/1/1 00:00:00`, `2017/12/31 23:59:59`);
    }

    fetchMonth() {
        const {monthStartYear} = this.state;
        this.props.getReport('MM', `${monthStartYear}/1/1 00:00:00`, `${monthStartYear}/12/31 23:59:59`);
    }

    fetchDay() {
        const {dayStartYear, dayStartMonth} = this.state;
        this.props.getReport('DD', `${dayStartYear}/${dayStartMonth}/1 00:00:00`, `${dayStartYear}/${dayStartMonth}/31 23:59:59`);
    }

    render() {
        const {day, month, year} = this.props.report;
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
                                        }}>
                                            日</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <ComboBox default={this.state.dayStartYear} items={YEAR} onChange={value => this.setState({dayStartYear: value})}/> {' '}
                                        <ComboBox default={this.state.dayStartMonth} items={MONTH} onChange={value => this.setState({dayStartMonth: value})}/> {' '}
                                        <Button color='primary' onClick={e => this.fetchDay()}>
                                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <ReportItem startIndex={Math.max(moment().date() - 6, 1) - 1} endIndex={moment().date() - 1} xunit="日" data={day}/>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
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
                                        }}>
                                            月</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <ComboBox default={this.state.monthStartYear} items={YEAR} onChange={value => this.setState({monthStartYear: value})}/> {' '}
                                        <Button color='primary' onClick={e => this.fetchMonth()}>
                                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <ReportItem startIndex={Math.max(moment().month() + 1 - 6, 1) - 1} endIndex={moment().month() + 1 - 1} xunit="月" data={month}/>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
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
                                        }}>
                                            年</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <Button color='primary' onClick={e => this.fetchYear()}>
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <ReportItem startIndex={0} endIndex={0} xunit="年" data={year}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({report, device}) {
    return {report, device};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReport
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
