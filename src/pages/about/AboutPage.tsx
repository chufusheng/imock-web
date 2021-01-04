/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"
import myData from '../../source/README.md';

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
        <Card bordered title="About" style={{ margin: "16px 16px" }} >
            <ReactMarkdown source={myData} escapeHtml={false} />
        </Card >
    );
}


export default AboutPage;
