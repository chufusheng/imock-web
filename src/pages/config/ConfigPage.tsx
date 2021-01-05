/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Button, Card, Row, Col, Table, Select, Space, Tooltip, message } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'

import ConfigDetail from "./ConfigDetail"
import config from "../../config/config"



const FormItem = Form.Item;
const { Option } = Select;

const ConfigPage = (props: any) => {
    const servicePath = config.backendMap.test != undefined ? config.backendMap.test : ""
    const formRef: any = React.createRef()

    const [dataList, setDataList] = React.useState<any>([])
    const [visible, setVisible] = React.useState<any>()
    const [detailData, setDetailData] = React.useState<any>({})
    const [appNameOption, setAppNameOption] = React.useState<any>([])
    const [appEnvOption, setAppEnvOption] = React.useState<any>([])

    React.useEffect(() => {
        getPagesList({})
        getAppNameList()
    }, [props])

    const showModal = (value: any) => {
        setVisible(true)
        setDetailData(value)

    };

    const stopAndOpen = (value: any) => {
        const form: any = formRef.current
        const data = { "id": value.id, "isUsable": value.isUsable }
        void Axios.post(servicePath + '/config/status', data).then((response: any) => {
            if (response.data.success) {
                message.success(value.isUsable ? "暂停成功" : "打开成功");
                getPagesList(form.getFieldsValue(['appName', 'environment']))
            } else {
                message.error(value.isUsable ? "暂停失败" : "打开失败");
            }
        })

    }

    const handleCancel = (e: any) => {
        setVisible(false)
    };

    const getPagesList = (value: any) => {
        void Axios.post(servicePath + '/config/get/list', value).then((response: { data: { data: any; }; }) => {
            setDataList(response.data.data)
        })
    }


    const getAppNameList = () => {
        void Axios.get(servicePath + '/module/get/appName/list').then(response => {
            if (response.status == 200) {
                const children = [];
                for (const a in response.data) {
                    children.push(<Option value={response.data[a]}>{response.data[a]}</Option>);
                }
                setAppNameOption(children)
            }
        })

    }

    const onChangeAppName = (value: string) => {
        void Axios.get(servicePath + '/module/get/appEnv/list?appName=' + value).then(response => {
            if (response.status == 200) {
                const children = [];
                for (const i in response.data) {
                    children.push(<Option value={response.data[i]}>{response.data[i]}</Option>);
                }
                setAppEnvOption(children)
            }
        })

    }


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
            // align: 'center',
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
            // align: 'center',
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
            render: (text: any, record: any) => {
                let refuse = "";
                if (record.isUsable) {
                    refuse = "暂停"
                } else {
                    refuse = "打开"
                }
                return (
                    <Space size="middle">
                        <a onClick={() => showModal(record)}>修改</a>
                        <a onClick={() => stopAndOpen(record)}>{refuse}</a>
                    </Space>)
            },
        },
    ];


    return (
        <div>
            <Card style={{ margin: "16px 16px" }}>
                <Form ref={formRef} onFinish={getPagesList} className="login-form">
                    <Row gutter={20}>
                        <Col className="gutter-row" span={8}>
                            <FormItem label='服务名' name='appName' rules={[{ required: false, message: '请输入：' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                    onChange={onChangeAppName}
                                >{appNameOption}</Select>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入：' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                >{appEnvOption}</Select>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" onClick={showModal}>新增</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card bordered title="" style={{ margin: "16px 16px" }}>
                <Table dataSource={dataList} columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: 1500 }} bordered />
            </Card>

            <ConfigDetail
                visible={visible}
                handleCancel={handleCancel}
                detailData={detailData}
                getPages={getPagesList}
                onChangeAppName={onChangeAppName}
                appNameOption={appNameOption}
                appEnvOption={appEnvOption}
            />
        </div>

    );

}


export default ConfigPage;
