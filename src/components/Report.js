import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {
    Col,
    Row,
    Card,
    Button,
    CardHeader
} from 'reactstrap';

import ComboBox from './ComboBox';
import {getReport} from '../actions/current';
import ReportItem from './ReportItem';

var YEAR = [
        2016, 2017
    ],
    MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    DAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

class Report extends Component {

    constructor(props) {
        super(props);
        let year = moment().year(),
            month = moment().month() + 1,
            date = moment().date();
        this.state = {
            yearStartYear: year,
            yearEndYear: year,
            monthStartYear: year,
            monthStartMonth: month,
            monthEndMonth: month,
            dayStartYear: year,
            dayStartMonth: month,
            dayStartDate: date,
            dayEndDate: date
        }
    }

    componentWillMount() {
        this.fetchYear();
        this.fetchMonth();
        this.fetchDay();
    }

    fetchYear() {
        const {yearStartYear, yearEndYear} = this.state;
        this.props.getReport('YYYY', `${yearStartYear}/1/1 00:00:00`, `${yearEndYear}/12/31 23:59:59`);
    }

    fetchMonth() {
        const {monthStartYear, monthStartMonth, monthEndMonth} = this.state;
        let daysInMonth = moment(`${monthStartYear}/${monthEndMonth}`, "YYYY/MM").daysInMonth();
        this.props.getReport('MM', `${monthStartYear}/${monthStartMonth}/1 00:00:00`, `${monthStartYear}/${monthEndMonth}/${daysInMonth} 23:59:59`);
    }

    fetchDay() {
        const {dayStartYear, dayStartMonth, dayStartDate, dayEndDate} = this.state;
        this.props.getReport('DD', `${dayStartYear}/${dayStartMonth}/${dayStartDate} 00:00:00`, `${dayStartYear}/${dayStartMonth}/${dayEndDate} 23:59:59`);
    }

    render() {
        const {day, month, year} = this.props.report;
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
                                <ComboBox default={this.state.yearStartYear} items={YEAR} onChange={value => this.setState({yearStartYear: value})}/> {' ~ '}
                                <ComboBox default={this.state.yearEndYear} items={YEAR} onChange={value => this.setState({yearEndYear: value})}/> {' '}
                                <Button color='primary' onClick={e => this.fetchYear()}>送出</Button>
                            </CardHeader>
                            <ReportItem data={year}/>
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
                                <ComboBox default={this.state.monthStartYear} items={YEAR} onChange={value => this.setState({monthStartYear: value})}/> {' '}
                                <ComboBox default={this.state.monthStartMonth} items={MONTH} onChange={value => this.setState({monthStartMonth: value})}/> {' ~ '}
                                <ComboBox default={this.state.monthEndMonth} items={MONTH} onChange={value => this.setState({monthEndMonth: value})}/> {' '}
                                <Button color='primary' onClick={e => this.fetchMonth()}>送出</Button>
                            </CardHeader>
                            <ReportItem data={month}/>
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
                                <ComboBox default={this.state.dayStartYear} items={YEAR} onChange={value => this.setState({dayStartYear: value})}/> {' '}
                                <ComboBox default={this.state.dayStartMonth} items={MONTH} onChange={value => this.setState({dayStartMonth: value})}/> {' '}
                                <ComboBox default={this.state.dayStartDate} items={DAY} onChange={value => this.setState({dayStartDate: value})}/> {' ~ '}
                                <ComboBox default={this.state.dayEndDate} items={DAY} onChange={value => this.setState({dayEndDate: value})}/> {' '}
                                <Button color='primary' onClick={e => this.fetchDay()}>送出</Button>
                            </CardHeader>
                            <ReportItem data={day}/>
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
