/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space } from "antd";
import Axios from "../utils/axios"







const FormItem = Form.Item;

const style = { background: '#0092ff', padding: '8px 0' };


class HomePage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { dataList: [] };
    }

    componentDidMount() {
        void Axios.get('http://127.0.0.1:8003/module/test?a=0')
            .then(response => {
                this.setState({ dataList: [{ appName: response.data }] })
            })
    }


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleSubmit = () => {
        void Axios.get('http://127.0.0.1:8003/module/test?a=0').then(response => {
            this.setState({ dataList: [{ appName: response.data }] })
        })
    }

    public render(): JSX.Element {

        const columns = [
            {
                title: '服务名',
                dataIndex: 'appName',
            },
            {
                title: '环境',
                dataIndex: 'environment',
            }, {
                title: 'IP',
                dataIndex: 'ip',
            }, {
                title: '端口',
                dataIndex: 'port',
            }, {
                title: '版本',
                dataIndex: 'version',
            }, {
                title: '状态',
                dataIndex: 'status',
            }, {
                title: '操作',
                key: 'action',
                render: (text: any, record: { name: React.ReactNode; }) => (
                    <Space size="middle">
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            }]


        return (
            <div>
                <Card style={{ margin: "16px 16px" }}>

                    <React.Fragment>

                        <Form onFinish={this.handleSubmit} className="login-form">
                            <Row gutter={20}>
                                <Col className="gutter-row" span={8}>
                                    <FormItem label='服务名' name='appName' rules={[{ required: true, message: '请输入：' }]}>
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
                    <Table dataSource={this.state.dataList} columns={columns} />
                </Card>

            </div>

        );
    }
}



export default HomePage;
