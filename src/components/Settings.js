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

        const {summerTarget, notSummerTarget, summerFee, notSummerFee} = this.props.target;
        this.state = {
            targetModal: false,
            deviceModal: false,
            summerTarget,
            notSummerTarget,
            summerFee,
            notSummerFee,
            create_device_name: '',
            create_device_dataChnId: '',
            create_device_V: '',
            edit_device_id: '',
            edit_device_name: '',
            edit_device_dataChnId: '',
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
        const {summerTarget, summerFee, notSummerTarget, notSummerFee} = this.state;
        this.props.updateTarget(summerTarget, summerFee, notSummerTarget, notSummerFee);
        this.targetToggle();
    }

    deviceToggle() {
        this.setState({
            deviceModal: !this.state.deviceModal
        });
    }

    deviceOnCreate() {
        const {create_device_name, create_device_dataChnId, create_device_V} = this.state;
        this.props.createDevice(create_device_name, create_device_dataChnId, create_device_V);
        this.setState({create_device_name: '', create_device_dataChnId: '', create_device_V: ''});
    }

    deviceOnClickUpdate(edit_device_id, edit_device_name, edit_device_dataChnId, edit_device_V) {
        this.setState({edit_device_id, edit_device_name, edit_device_dataChnId, edit_device_V});
        this.deviceToggle();
    }

    deviceOnUpdate() {
        const {edit_device_id, edit_device_name, edit_device_dataChnId, edit_device_V} = this.state;
        this.props.updateDevice(edit_device_id, edit_device_name, edit_device_dataChnId, edit_device_V);
        this.deviceToggle();
    }

    renderDevices() {
        return this.props.devices.map(e => {
            const {id, name, dataChnId, V, color} = e;
            return (
                <tr key={id}>
                    <td className="align-middle">
                        <div className="mx-auto" style={{
                            width: 10,
                            height: 10,
                            backgroundColor: color
                        }}/>
                    </td>
                    <td className="align-middle">{name}</td>
                    <td className="align-middle">{dataChnId}</td>
                    <td className="align-middle">{V}</td>
                    <td className="align-middle">
                        <Button onClick={e => this.deviceOnClickUpdate(id, name, dataChnId, V)} color="info">編輯</Button>{' '}
                        <Button onClick={e => this.props.deleteDevice(id)} color="danger">刪除</Button>
                    </td>
                </tr>
            );

        });
    }

    render() {
        const {
            summerTarget,
            summerFee,
            notSummerTarget,
            notSummerFee,
            edit_device_name,
            edit_device_dataChnId,
            edit_device_V,
            create_device_name,
            create_device_dataChnId,
            create_device_V
        } = this.state;
        return (
            <div>
                <Modal isOpen={this.state.targetModal} toggle={this.targetToggle}>
                    <ModalHeader>編輯目標</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>夏季月用電量上限（度）</Label>
                                <Input value={summerTarget} onChange={e => this.setState({summerTarget: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>夏季月電費（元／度）</Label>
                                <Input value={summerFee} onChange={e => this.setState({summerFee: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>非夏季月用電量上限（度）</Label>
                                <Input value={notSummerTarget} onChange={e => this.setState({notSummerTarget: e.target.value})} type="text"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>非夏季月電費（元／度）</Label>
                                <Input value={notSummerFee} onChange={e => this.setState({notSummerFee: e.target.value})} type="text"/>
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
                        size: 6,
                        offset: 3
                    }}>
                        <Row>
                            <Col className="my-auto">
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
                        size: 6,
                        offset: 3
                    }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>月份</th>
                                    <th>用電量上限（度）</th>
                                    <th>電費（元／度）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">夏季月(6 ~ 9)</th>
                                    <td>{this.props.target.summerTarget}</td>
                                    <td>{this.props.target.summerFee}</td>
                                </tr>
                                <tr>
                                    <th scope="row">非夏季月</th>
                                    <td>{this.props.target.notSummerTarget}</td>
                                    <td>{this.props.target.notSummerFee}</td>
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
                                <Label>資料通道 ID</Label>
                                <Input value={edit_device_dataChnId} onChange={e => this.setState({edit_device_dataChnId: e.target.value})} type="text"/>
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
                        size: 6,
                        offset: 3
                    }}>
                        <h3>裝置管理</h3>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 6,
                        offset: 3
                    }}>
                        <Form style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }} inline>
                            <Input value={create_device_name} onChange={e => this.setState({create_device_name: e.target.value})} className="w-25" type="text" placeholder="名稱"/>
                            <Input value={create_device_dataChnId} onChange={e => this.setState({create_device_dataChnId: e.target.value})} className="w-25" type="text" placeholder="資料通道 ID"/>
                            <Input value={create_device_V} onChange={e => this.setState({create_device_V: e.target.value})} className="w-25" type="text" placeholder="伏特"/>
                            <Button onClick={e => this.deviceOnCreate()} color="primary">新增</Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 6,
                        offset: 3
                    }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>名稱</th>
                                    <th>資料通道 ID</th>
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
