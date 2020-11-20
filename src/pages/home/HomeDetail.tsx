/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space, Modal } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'




const FormItem = Form.Item;


const HomeDetail = (props: any) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        const { handleCancel } = props
        window.console.log(form.getFieldsValue())
        handleCancel()
    };


    const handleSubmit = (value: any) => {

        // void Axios.post('http://127.0.0.1:8003/module/get/list', value).then(response => {
        //     window.console.log(JSON.stringify(value))
        //     this.setState({ dataList: response.data.data })
        // })
    }

    return (
        <div>
            <Modal
                title="Basic Modal"
                visible={props.visible}
                onOk={handleOk}
                onCancel={props.handleCancel}
            >
                <Form form={form} className="login-form">
                    <Row gutter={20}>
                        <Col className="gutter-row" span={8}>
                            <FormItem initialValue="jjkksdfads" label='服务名' name='appName' rules={[{ required: false, message: '请输入：' }]}>
                                <Input placeholder="服务名" />
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <FormItem label='环境' name='environment' rules={[{ required: false, message: '请输入：' }]}>
                                <Input placeholder="环境" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );

}

export default HomeDetail;
