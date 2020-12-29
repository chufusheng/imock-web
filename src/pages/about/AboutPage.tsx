/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"
import myData from '../../source/README.md';

const AboutPage = () => {


    // React.useEffect(() => {
    //     readTxt()
    // }, [props])


    window.console.log(myData)
    const input = '### 标题';
    return (
        <Card bordered title="About" style={{ margin: "16px 16px" }} >
            <ReactMarkdown source={myData} />
        </Card >
    );
}


export default AboutPage;
