import React, {Component} from 'react';
import {
    Col,
    Row,
    Table,
    Button,
    Card,
    CardImg,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardHeader
} from 'reactstrap';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <Row className="my-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Card>
                            <CardHeader tag="h3">本月目標</CardHeader>
                            <CardBlock>
                                <Row>
                                    <Col className="vcenter">
                                        <h3 style={{
                                            margin: 0
                                        }}>
                                            300 度</h3>
                                    </Col>
                                    <Col className="text-right">
                                        <Button color="info">編輯</Button>
                                    </Col>
                                </Row>
                            </CardBlock>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Row>
                            <Col className="vcenter">
                                <h3 style={{
                                    margin: 0
                                }}>
                                    裝置管理
                                </h3>
                            </Col>
                            <Col className="text-right">
                                <Button color="primary">新增</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={{
                        size: 4,
                        offset: 4
                    }}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>裝置名稱</th>
                                    <th>伏特</th>
                                    <th>動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>電風扇</td>
                                    <td>110</td>
                                    <td>
                                        <Button color="info">編輯</Button>{' '}
                                        <Button color="danger">刪除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>電視</td>
                                    <td>110</td>
                                    <td>
                                        <Button color="info">編輯</Button>{' '}
                                        <Button color="danger">刪除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>充電器</td>
                                    <td>5</td>
                                    <td>
                                        <Button color="info">編輯</Button>{' '}
                                        <Button color="danger">刪除</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}
