
import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"

// const urlInfo = './test.log';



// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AboutPage = () => {


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
