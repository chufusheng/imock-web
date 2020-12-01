
import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"

import a from './test'


const urlInfo = './test.log';



const AboutPage = (props: any) => {


    // React.useEffect(() => {
    //     readTxt()
    // }, [props])


    const input = '### 标题';
    return (
        <Card bordered title="About" style={{ margin: "16px 16px" }} >
            <ReactMarkdown source={input} />
        </Card >
    );
}


export default AboutPage;
