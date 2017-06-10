import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Col,
    Row,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import {updateTarget} from '../actions/target';
import {createDevice, updateDevice, deleteDevice} from '../actions/devices';

class Settings extends Component {
    constructor(props) {
        super(props);

        const {day_target, month_target, year_target} = this.props.target;
        this.state = {
            targetModal: false,
            deviceModal: false,
            day_target,
            month_target,
            year_target,
            create_device_name: '',
            create_device_deviceId: '',
            create_device_V: '',
            edit_device_id: '',
            edit_device_name: '',
            edit_device_deviceId: '',
            edit_device_V: ''
        };

        this.targetToggle = this.targetToggle.bind(this);
        this.targetOnUpdate = this.targetOnUpdate.bind(this);
        this.deviceToggle = this.deviceToggle.bind(this);
        this.deviceOnCreate = this.deviceOnCreate.bind(this);
        this.deviceOnClickUpdate = this.deviceOnClickUpdate.bind(this);
        this.deviceOnUpdate = this.deviceOnUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            ...nextProps.target
        });
    }

    targetToggle() {
        this.setState({
            targetModal: !this.state.targetModal
        });
    }

    targetOnUpdate() {
        const {day_target, month_target, year_target} = this.state;
        this.props.updateTarget(day_target, month_target, year_target);
        this.targetToggle();
    }

    deviceToggle() {
        this.setState({
            deviceModal: !this.state.deviceModal
        });
    }

    deviceOnCreate() {
        const {create_device_name, create_device_deviceId, create_device_V} = this.state;
        this.props.createDevice(create_device_name, create_device_deviceId, create_device_V);
        this.setState({create_device_name: '', create_device_deviceId: '', create_device_V: ''});
    }

    deviceOnClickUpdate(edit_device_id, edit_device_name, edit_device_deviceId, edit_device_V) {
        this.setState({edit_device_id, edit_device_name, edit_device_deviceId, edit_device_V});
        this.deviceToggle();
    }

    deviceOnUpdate() {
        const {edit_device_id, edit_device_name, edit_device_deviceId, edit_device_V} = this.state;
        this.props.updateDevice(edit_device_id, edit_device_name, edit_device_deviceId, edit_device_V);
        this.deviceToggle();
    }

    renderDevices() {
        return this.props.devices.map(e => {
            const {id, name, deviceId, V} = e;
            return (
                <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{deviceId}</td>
                    <td>{V}</td>
                    <td>
                        <Button onClick={e => this.deviceOnClickUpdate(id, name, deviceId, V)} color="info">編輯</Button>{' '}
                        <Button onClick={e => this.props.deleteDevice(id)} color="danger">刪除</Button>
                    </td>
                </tr>
            );

        });
    }

    render() {
        const {
            day_target,
            month_target,
            year_target,
            edit_device_name,
            edit_device_deviceId,
            edit_device_V,
            create_device_name,
            create_device_deviceId,
            create_device_V
        } = this.state;
        return (
            <div>
                <Modal isOpen={this.state.targetModal} toggle={this.targetToggle}>
                    <ModalHeader>編輯目標</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>日目標</Label>
                                <Input value={day_target} onChange={e => this.setState({day_target: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>月目標</Label>
                                <Input value={month_target} onChange={e => this.setState({month_target: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>年目標</Label>
                                <Input value={year_target} onChange={e => this.setState({year_target: e.target.value})} type="text"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.targetToggle}>取消</Button>{' '}
                        <Button color="primary" onClick={this.targetOnUpdate}>送出</Button>
                    </ModalFooter>
                </Modal>
                <Row className="my-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Row>
                            <Col className="vcenter">
                                <h3 style={{
                                    margin: 0
                                }}>
                                    目標</h3>
                            </Col>
                            <Col className="text-right">
                                <Button onClick={this.targetToggle} color="info">編輯</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>度數</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">日目標</th>
                                    <td>{this.props.target.day_target}</td>
                                </tr>
                                <tr>
                                    <th scope="row">月目標</th>
                                    <td>{this.props.target.month_target}</td>
                                </tr>
                                <tr>
                                    <th scope="row">年目標</th>
                                    <td>{this.props.target.year_target}</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Col>
                </Row>
                <Modal isOpen={this.state.deviceModal} toggle={this.deviceToggle}>
                    <ModalHeader>編輯裝置</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>名稱</Label>
                                <Input value={edit_device_name} onChange={e => this.setState({edit_device_name: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>ID</Label>
                                <Input value={edit_device_deviceId} onChange={e => this.setState({edit_device_deviceId: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>伏特</Label>
                                <Input value={edit_device_V} onChange={e => this.setState({edit_device_V: e.target.value})} type="text"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.deviceToggle}>取消</Button>{' '}
                        <Button color="primary" onClick={this.deviceOnUpdate}>送出</Button>
                    </ModalFooter>
                </Modal>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <h3>裝置管理</h3>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Form inline>
                            <Input value={create_device_name} onChange={e => this.setState({create_device_name: e.target.value})} className="w-25 mr-1" type="text" placeholder="名稱"/>
                            <Input value={create_device_deviceId} onChange={e => this.setState({create_device_deviceId: e.target.value})} className="w-25 mr-1" type="text" placeholder="ID"/>
                            <Input value={create_device_V} onChange={e => this.setState({create_device_V: e.target.value})} className="w-25 mr-1" type="text" placeholder="伏特"/>
                            <Button onClick={e => this.deviceOnCreate()} color="primary">新增</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>名稱</th>
                                    <th>ID</th>
                                    <th>伏特</th>
                                    <th>動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDevices()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps({target, devices}) {
    return {target, devices};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateTarget,
        createDevice,
        updateDevice,
        deleteDevice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
