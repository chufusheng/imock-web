/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Select, Space, message } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'
import config from "../../config/config"
import LogDetail from "./LogDetail"




const FormItem = Form.Item;
const { Option } = Select;

class HomePage extends React.Component<any, any> {

    servicePath = config.backendMap.test != undefined ? config.backendMap.test : ""

    constructor(props: any) {
        super(props);
        this.state = { dataList: [], visible: false, moduleInfo: {}, appNameOption: [], appEnvOption: [] };
    }

    componentDidMount() {
        this.handleSubmit({})
        this.getAppNameList()
    }



    handleSubmit = (value: any) => {
        void Axios.post(this.servicePath + '/module/get/list', value).then((response: { data: { data: any; }; }) => {
            this.setState({ dataList: response.data.data })
        })
    }

    onActiveOrFrozen = (value: any) => {
        void Axios.post(this.servicePath + '/module/frozenOrActive', value).then((response: { data: { success: any; }; }) => {
            if (response.data.success) {
                message.success(value.status == "ACTIVE" ? "冻结成功" : "运行成功");
            } else {
                message.error(value.status == "ACTIVE" ? "冻结失败" : "运行失败");
            }
        })
    }

    onUpdata = (value: any) => {
        void Axios.post(this.servicePath + '/module/reload', value).then((response: { data: { success: any; }; }) => {
            if (response.data.success) {
                message.success("更新成功");
            } else {
                message.error("更新失败");
            }
        })
    }

    showLog = (value: any) => {
        this.setState({ moduleInfo: value, visible: true })
    }

    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };

    getAppNameList = () => {
        void Axios.get(this.servicePath + '/module/get/appName/list').then(response => {
            if (response.status == 200) {
                const children = [];
                for (const a in response.data) {
                    children.push(<Option value={response.data[a]}>{response.data[a]}</Option>);
                }
                this.setState({ appNameOption: children })
            }
        })

    }

    onChangeAppName = (value: string) => {
        void Axios.get(this.servicePath + '/module/get/appEnv/list?appName=' + value).then(response => {
            if (response.status == 200) {
                const children = [];
                for (const i in response.data) {
                    children.push(<Option value={response.data[i]}>{response.data[i]}</Option>);
                }
                this.setState({ appEnvOption: children })
            }
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
                render: (text: any) => {
                    if (text == "ACTIVE") {
                        return <p style={{ color: '#24d34a' }}>运行中</p>
                    } else {
                        return <p style={{ color: '#F5222E' }}>已冻结</p>
                    }
                }
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text: any, record: JSON) => {
                    let refuse = "";
                    if (record.status == "ACTIVE") {
                        refuse = "冻结"
                    } else {
                        refuse = "运行"
                    }
                    return (
                        <Space size="middle">
                            <a onClick={() => this.onActiveOrFrozen(record)}>{refuse}</a>
                            <a onClick={() => this.onUpdata(record)}>更新配置</a>
                            <a onClick={() => this.showLog(record)}>日志</a>
                        </Space>)
                },
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
                                        <Select
                                            showSearch
                                            allowClear
                                            optionFilterProp="children"
                                            onChange={this.onChangeAppName}
                                        >{this.state.appNameOption}</Select>
                                    </FormItem>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入：' }]}>
                                        <Select
                                            showSearch
                                            allowClear
                                            optionFilterProp="children"
                                        >{this.state.appEnvOption}</Select>
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

                <LogDetail visible={this.state.visible} handleCancel={this.handleCancel} moduleInfo={this.state.moduleInfo} />
            </div>

        );
    }
}



export default HomePage;
