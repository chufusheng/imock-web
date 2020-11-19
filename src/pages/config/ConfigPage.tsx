/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space, Tooltip } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'


const FormItem = Form.Item;

class ConfigPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { dataList: [] };
    }

    componentDidMount() {
        // const configa = new config();
        // window.console.log("111111", configa.getAppCode)
        this.handleSubmit({})
    }


    handleSubmit = (value: any) => {
        void Axios.post('http://127.0.0.1:8003/config/get/list', value).then(response => {
            window.console.log(JSON.stringify(value))
            this.setState({ dataList: response.data.data })
        })
    }

    public render(): JSX.Element {

        const columns = [
            {
                key: 0,
                title: 'Id',
                dataIndex: 'id',
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
            }, {
                key: 6,
                title: '模拟返回',
                dataIndex: 'returnObj',
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
                render:(updateTime:any)=>(
                    moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
                )
            },
            {
                key: 9,
                title: '状态',
                dataIndex: 'isUsable',
                render: (text: any) => {
                    if (text) {
                        return <p>打开</p>
                    } else {
                        return <p>关闭</p>
                    }
                }
            }, {
                title: '操作',
                key: 'action',
                render: (text: any, record: { name: React.ReactNode; }) => (
                    <Space size="middle">
                        <a>修改</a>
                        <a>暂停</a>
                    </Space>
                ),
            },
        ];


        return (
            <div>
                <Card style={{ margin: "16px 16px" }}>

                    <React.Fragment>

                        <Form onFinish={this.handleSubmit} className="login-form">
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
                                <Col className="gutter-row" span={4}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                </Col>
                            </Row>

                        </Form>
                    </React.Fragment>
                </Card>

                <Card bordered title="" style={{ margin: "16px 16px" }}>
                    <Table dataSource={this.state.dataList} columns={columns} pagination={{ pageSize: 10 }} />
                </Card>

            </div>

        );
    }
}



export default ConfigPage;
