/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable id-blacklist */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space, Modal, message } from "antd";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import Axios from "../../utils/axios"
import moment from 'moment'



const FormItem = Form.Item;

const ConfigDetail = (props: any) => {

    const [form] = Form.useForm();
    const [resObj, setResObj] = React.useState<any>()


    React.useEffect(() => {
        if (isUpdata()) {
            form.setFieldsValue({ ...props.detailData });
            // window.console.log("...props.detailData.returnObj", props.detailData.returnObj)
            setResObj(props.detailData.returnObj)
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

    const getJson = () => {
        if (isUpdata()) {
            return JSON.parse(props.detailData.returnObj)
        } else {
            return defaultReturnObj
        }
    }



    const onChange = (value: any) => {
        setResObj(JSON.parse(value.json))
    }

    const handleOk = () => {

        const returnData = form.getFieldsValue()
        returnData.id = isUpdata() ? props.detailData.id : null
        returnData.returnObj = resObj

        void Axios.post('http://127.0.0.1:8003/config/save', returnData).then(response => {
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
            >
                <Form form={form} className="login-form">
                    <Row>
                        <Col span={9} offset={2}>
                            <FormItem label='服务名' name='appName' rules={[{ required: false, message: '请输入服务名：' }]}>
                                <Input placeholder="服务名" />
                            </FormItem>
                        </Col>
                        <Col span={9} offset={2}>
                            <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入环境：' }]}>
                                <Input placeholder="环境" />
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
                    <FormItem  {...formItemLayout} label='是否异常' name='isThrows' rules={[{ required: false, message: '请输入环境：' }]}>
                        <Input placeholder="是否异常	" />
                    </FormItem>
                    <JSONInput
                        id='a_unique_id'
                        width="100%"
                        height="400px"
                        placeholder={getJson()}
                        onChange={onChange}
                        locale={locale}
                    />
                </Form>
            </Modal>
        </div>
    );

}

export default ConfigDetail;
