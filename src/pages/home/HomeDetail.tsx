/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Form, Input, Button, Card, Row, Col, Table, Tag, Space, Modal } from "antd";
import Axios from "../../utils/axios"
import moment from 'moment'




const FormItem = Form.Item;

class HomeDetail extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }


    handleOk = (e: any) => {
        const { handleCancel } = this.props
        window.console.log("dddddd")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handleCancel()
    };


    handleSubmit = (value: any) => {

        // void Axios.post('http://127.0.0.1:8003/module/get/list', value).then(response => {
        //     window.console.log(JSON.stringify(value))
        //     this.setState({ dataList: response.data.data })
        // })
    }

    public render(): JSX.Element {

        const { visible, handleCancel } = this.props
        const [form] = Form.useForm();

        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={handleCancel}
                >
                    <React.Fragment>

                        <Form form={form} onFinish={this.handleSubmit} className="login-form">
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
                            </Row>

                        </Form>
                    </React.Fragment>
                </Modal>
            </div>

        );
    }
}



export default HomeDetail;
