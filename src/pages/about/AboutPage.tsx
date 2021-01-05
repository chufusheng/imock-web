/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Card, message } from "antd";
import ReactMarkdown from "react-markdown"
import myData from '../../source/README.md';
import AgileTCEditor from 'react-agiletc-editor';


const AboutPage = () => {

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
            <Card bordered title="About" style={{ margin: "16px 16px" }} >
                <ReactMarkdown source={myData} escapeHtml={false} />
            </Card >
            <AgileTCEditor
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
            />
        </div>
    );
}


export default AboutPage;
