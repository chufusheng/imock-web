/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"
import { readFileSync } from 'fs'



const AboutPage = (props: any) => {

    const input = '### 标题';
    return (
        <Card bordered title="About" style={{ margin: "16px 16px" }} >
            <ReactMarkdown source={input} />
        </Card >
    );
}


export default AboutPage;
