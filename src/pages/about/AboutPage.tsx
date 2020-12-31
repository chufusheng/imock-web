/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as React from "react";
import { Card } from "antd";
import ReactMarkdown from "react-markdown"
import myData from '../../source/README.md';

const AboutPage = () => {


    // React.useEffect(() => {
    //     readTxt()
    // }, [props])
    return (
        <Card bordered title="About" style={{ margin: "16px 16px" }} >
            <ReactMarkdown source={myData}/>
        </Card >
    );
}


export default AboutPage;
