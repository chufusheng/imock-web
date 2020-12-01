/* eslint-disable eqeqeq */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Modal } from "antd";
import Axios from "../../utils/axios"
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/monokai.css';

import config from "../../config/config"





const HomeDetail = (props: any) => {

    const servicePath = config.backendMap.test != undefined ? config.backendMap.test : ""

    const [logInfo, setLog] = React.useState<any>("")

    React.useEffect(() => {
        getLog(props.moduleInfo)
    }, [props.visible])

    const handleOk = () => {
        getLog(props.moduleInfo)
    };

    const getLog = (value: any) => {
        window.console.log("value", value)
        void Axios.post(servicePath + '/module/log', value).then(response => {
            setLog(response.data)
        })
    }

    return (
        <div>
            <Modal
                title="Log"
                width='50%'
                maskClosable={false}
                visible={props.visible}
                onOk={handleOk}
                onCancel={props.handleCancel}
                okText={"刷新"}
            >
                <CodeMirror
                    value={logInfo}
                    options={{
                        theme: 'eclipse',
                        tabSize: 0,
                        keyMap: 'sublime',
                        mode: 'jsx',
                    }}
                />
            </Modal>
        </div>
    );

}

export default HomeDetail;
