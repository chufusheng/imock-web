/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Space, Modal } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'




const FormItem = Form.Item;

class HomePage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { dataList: [], visible: false };
    }

    componentDidMount() {
        // const configa = new config();
        // window.console.log("111111", configa.getAppCode)
        this.handleSubmit({})
    }



    handleSubmit = (value: any) => {
        void Axios.post('http://127.0.0.1:8003/module/get/list', value).then(response => {
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
                title: 'IP',
                dataIndex: 'ip',
            }, {
                key: 4,
                title: '端口',
                dataIndex: 'port',
            }, {
                key: 5,
                title: '版本',
                dataIndex: 'version',
            }, {
                key: 6,
                title: '更新时间',
                dataIndex: 'updateTime',
                render: (updateTime: any) => (
                    moment(updateTime).format('YYYY-MM-DD HH:mm:ss')
                )
            }, {
                key: 7,
                title: '状态',
                dataIndex: 'status',
            }, {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <Space size="middle">
                        {/* <Button type="primary" onClick={() => this.showModal(record)}>修改</Button> */}
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
                    <Table dataSource={this.state.dataList} pagination={{ pageSize: 10 }} columns={columns} bordered />
                </Card>
            </div>

        );
    }
}



export default HomePage;
