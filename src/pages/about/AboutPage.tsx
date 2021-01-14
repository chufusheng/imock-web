/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Card, message } from "antd";
import ReactMarkdown from "react-markdown"
import myData from '../../source/README.md';
import Kityminder from 'react-kityminder';
import { useState } from "react";
{/* <><script src="https://cdn.jsdelivr.net/npm/kity"></script><script src="https://cdn.jsdelivr.net/npm/kityminder-core"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-kityminder"></script></>
// import AgileTCEditor from 'react-agiletc-editor'; */}


const AboutPage = () => {
    var json = { "template": "default", "root": { "data": { "created": 1562059643204, "id": "bv8nxhi3c800", "text": "测试" }, "children": [{ "data": { "created": 1609814203254, "id": "c8avibj2k880", "text": "用例" }, "children": [{ "data": { "resource": ["执行步骤"], "created": 1609814210520, "id": "c8aviev8fi00", "text": "步骤" }, "children": [{ "data": { "resource": ["执行步骤", "预期结果"], "created": 1609814216189, "id": "c8avihh01xs0", "text": "结果", "priority": 1 }, "children": [] }] }] }] }, "theme": "classic-compact", "version": "1.4.43", "base": 12 }
    const [value, setValue] = useState(json)
    const minderRef = React.useRef()
    const minder = minderRef.current
    const onChange = (value: any) => {
        window.console.log('value',JSON.stringify(value))
        window.console.log('mider',minder)
        setValue(value)

    }

    // const renderers = {
    //     code: () => {
    //       return <SyntaxHighlighter style={dark}  />
    //     }
    //   }

    // React.useEffect(() => {
    //     readTxt()
    // }, [props])
    return (
        <div>
            {/* <Card bordered title="About" style={{ margin: "16px 16px" }} >
                <ReactMarkdown source={myData} escapeHtml={false} />
            </Card > */}
            <Kityminder
                ref={minderRef}
                value={value}
                tags={['前置条件', '执行步骤', '预期结果']}
                title="testjlksadjfkasdj"
                onChange={onChange}
                tabIndex='111'
                progressShow={false}
                readOnly={false}
                mediaShow={!false}
                // editorStyle={{ height: 'calc(100vh - 100px)' }}
                toolbar={{
                  image: false,
                  theme: ['classic-compact', 'fresh-blue', 'fresh-green-compat'],
                  template: ['default', 'right', 'fish-bone'],
                }}
                style={{
                    width: '100%',
                    height: '800px',
                  }}
            />
            {/* <AgileTCEditor
                // ref={editorNode => (this.editorNode = editorNode)}
                tags={['前置条件', '执行步骤', '预期结果']}
                progressShow={false}
                readOnly={false}
                mediaShow={!false}
                editorStyle={{ height: 'calc(100vh - 100px)' }}
                toolbar={{
                    image: false,
                    theme: ['classic-compact', 'fresh-blue', 'fresh-green-compat'],
                    template: ['default', 'right', 'fish-bone'],
                }}
                baseUrl="/"
                uploadUrl="/api/projmgr/common/uploadAttachment"
                wsUrl={`ws://localhost:8000/api/case//1/2212/undefined/0`}
                onSave={
                    Number(1) !== 2
                        ? () => {
                            message.loading('保存中......', 1);
                            // this.updateCase();
                        }
                        : null
                }
            /> */}
        </div>
    );
}


export default AboutPage;
