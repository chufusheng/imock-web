/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable object-shorthand */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Select, Tag, Switch, Modal, message } from "antd";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import Axios from "../../utils/axios"
import config from "../../config/config"



const FormItem = Form.Item;
const { Option } = Select;


const ConfigDetail = (props: any) => {

    const [form] = Form.useForm();
    const [resObj, setResObj] = React.useState<any>()
    const [isThrowsObj, setIsThrowsObj] = React.useState<boolean>()

    const servicePath = config.backendMap.test != undefined ? config.backendMap.test : ""

    React.useEffect(() => {
        if (isUpdata()) {
            setResObj(JSON.parse(props.detailData.returnObj))
            setIsThrowsObj(props.detailData.isThrows)
            form.setFieldsValue({ ...props.detailData });
        } else {
            setResObj(defaultReturnObj)
            setIsThrowsObj(false)

        }
    }, [props.visible])


    const isUpdata = () => {
        if (props.detailData.id == undefined) {
            return false
        } else {
            return true
        }
    }


    const defaultReturnObj = {
        classNames: [
            'com.tester.jvm.mock.common.domain.PageResult',
        ],
        returnData: {}
    }

    const defaultExceptionReturnObj = {
        classNames: [
        ],
        returnData: {
            exceptionName: 'java.lang.RuntimeException',

        }
    }

    const switchOnChange = (checked: Boolean) => {
        if (checked) {
            setResObj(defaultExceptionReturnObj)
            setIsThrowsObj(true)
        } else {
            setResObj(defaultReturnObj)
            setIsThrowsObj(false)
        }

    }


    const onChange = (value: any) => {
        setResObj(JSON.parse(value.json))
    }

    const handleOk = () => {
        const returnData = form.getFieldsValue()
        returnData.id = isUpdata() ? props.detailData.id : null
        returnData.returnObj = JSON.stringify(resObj)
        returnData.isThrows = isThrowsObj

        void Axios.post(servicePath + '/config/save', returnData).then(response => {
            if (response.data.success) {
                props.getPages({})
                void message.info("保存成功")
            } else {
                void message.info("保存失败")
            }
        })
        props.handleCancel()
    };

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
    }


    return (
        <div>
            <Modal
                title={isUpdata() ? "修改" : "新建"}
                width='50%'
                visible={props.visible}
                onOk={handleOk}
                onCancel={props.handleCancel}
                maskClosable={false}
            >
                <Form form={form} className="login-form">
                    <Row>
                        <Col span={8} offset={3}>
                            <FormItem label='服务名' name='appName' rules={[{ required: false, message: '请输入服务名：' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    // style={{ width: 200 }}
                                    optionFilterProp="children"
                                    onChange={props.onChangeAppName}
                                >{props.appNameOption}</Select>
                            </FormItem>
                        </Col>
                        <Col span={8} offset={2}>
                            <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入环境：' }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    optionFilterProp="children"
                                >{props.appEnvOption}</Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem  {...formItemLayout} label='Mock类' name='mockClass' rules={[{ required: false, message: '请输入环境：' }]}>
                        <Input placeholder="Mock类" />
                    </FormItem>
                    <FormItem  {...formItemLayout} label='方法' name='mockMethod' rules={[{ required: false, message: '请输入环境：' }]}>
                        <Input placeholder="方法" />
                    </FormItem>
                    <FormItem  {...formItemLayout} label='规则' name='ruleConfig' rules={[{ required: false, message: '请输入环境：' }]}>
                        <Input placeholder="规则" />
                    </FormItem>
                    <FormItem  {...formItemLayout} label='是否异常' name='isThrows'>
                        <Switch defaultChecked={isThrowsObj} onChange={switchOnChange} />
                    </FormItem>
                    <JSONInput
                        id='a_unique_id'
                        width="100%"
                        height="400px"
                        placeholder={resObj}
                        onChange={onChange}
                        locale={locale}
                    />
                </Form>
            </Modal>
        </div>
    );

}

export default ConfigDetail;
