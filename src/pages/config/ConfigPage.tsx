/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space, Tooltip, message } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'

import ConfigDetail from "./ConfigDetail"
import config from "../../config/config"



const FormItem = Form.Item;

class ConfigPage extends React.Component<any, any> {

    servicePath = config.backendMap.test != undefined ? config.backendMap.test : ""

    constructor(props: any) {
        super(props);
        this.state = { dataList: [], visible: false, detailData: {} };
    }

    componentDidMount() {
        this.getPagesList({})
    }

    showModal = (value: any) => {
        this.setState({
            visible: true,
            detailData: value
        });

    };

    stopAndOpen = (value: any) => {
        const data = { "id": value.id, "isUsable": value.isUsable }
        void Axios.post(this.servicePath + '/config/status', data).then((response: any) => {
            if (response.data.success) {
                message.success(value.isUsable ? "暂停成功" : "打开成功");
                this.getPagesList({})
            } else {
                message.error(value.isUsable ? "暂停失败" : "打开失败");
            }
        })

    }

    handleCancel = (e: any) => {
        // window.console.log(e);
        this.setState({
            visible: false,
        });
    };

    getPagesList = (value: any) => {
        void Axios.post(this.servicePath + '/config/get/list', value).then((response: { data: { data: any; }; }) => {
            this.setState({ dataList: response.data.data })
        })
    }

    public render(): JSX.Element {

        const columns = [
            {
                key: 0,
                title: 'Id',
                dataIndex: 'id',
                width: 80,
            },
            {
                key: 1,
                title: '服务名',
                dataIndex: 'appName',
            },
            {
                key: 2,
                title: '环境',
                dataIndex: 'environment',
            }, {
                key: 3,
                title: 'Mock类',
                dataIndex: 'mockClass',
                width: 230,
                ellipsis: {
                    showTitle: false,
                },
                render: (mockClass: any) => (
                    <Tooltip placement="topLeft" title={mockClass}>
                        {mockClass}
                    </Tooltip>
                ),
            }, {
                key: 4,
                title: '方法',
                dataIndex: 'mockMethod',
            }, {
                key: 5,
                title: '规则',
                dataIndex: 'ruleConfig',
                width: 100,
            }, {
                key: 6,
                title: '模拟返回',
                dataIndex: 'returnObj',
                width: 230,
                ellipsis: {
                    showTitle: false,
                },
                render: (returnObj: any) => (
                    <Tooltip placement="topLeft" title={returnObj}>
                        {returnObj}
                    </Tooltip>
                ),
            }, {
                key: 7,
                title: '是否异常',
                dataIndex: 'isThrows',
                align: 'center',
                width: 100,
                render: (text: any) => {
                    if (text) {
                        return <p>是</p>
                    } else {
                        return <p>否</p>
                    }
                }
            },
            {
                key: 8,
                title: '更新时间',
                dataIndex: 'updateTime',
                width: 230,
                render: (updateTime: any) => (
                    moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            {
                key: 9,
                title: '状态',
                dataIndex: 'isUsable',
                align: 'center',

                width: 80,
                render: (text: any) => {
                    if (text) {
                        return <p style={{ color: '#24d34a' }}>打开</p>
                    } else {
                        return <p style={{ color: '#F5222E' }}>暂停</p>
                    }
                }
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text: any, record: JSON) => {
                    let refuse = "";
                    if (record.isUsable) {
                        refuse = "暂停"
                    } else {
                        refuse = "打开"
                    }
                    return (
                        <Space size="middle">
                            <a onClick={() => this.showModal(record)}>修改</a>
                            <a onClick={() => this.stopAndOpen(record)}>{refuse}</a>
                        </Space>)
                },
            },
        ];


        return (
            <div>
                <Card style={{ margin: "16px 16px" }}>
                    <Form onFinish={this.getPagesList} className="login-form">
                        <Row gutter={20}>
                            <Col className="gutter-row" span={8}>
                                <FormItem label='服务名' name='appName' rules={[{ required: false, message: '请输入：' }]}>
                                    <Input placeholder="服务名" />
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入：' }]}>
                                    <Input placeholder="环境" />
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={2}>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="primary" onClick={this.showModal}>新增</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card bordered title="" style={{ margin: "16px 16px" }}>
                    <Table dataSource={this.state.dataList} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 1500 }} bordered />
                </Card>

                <ConfigDetail visible={this.state.visible} handleCancel={this.handleCancel} detailData={this.state.detailData} getPages={this.getPagesList} />
            </div>

        );
    }
}



export default ConfigPage;
