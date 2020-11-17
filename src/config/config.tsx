/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readFileSync } from 'fs'
import { join } from 'path'
import { safeLoad } from 'js-yaml'
import YAML from 'yaml';


interface BackendMap {
    development: string;
    test: string
}

interface Service {
    port: string;
}

class Config {
    appCode: string;
    pageTitle: string;
    service: Service;
    backendMap: BackendMap;

    constructor() {
        try {
            window.console.log('yamlConfig')
            const file = readFileSync('./file.yml', 'utf8')
            const yamlConfig = YAML.parse(file)

            this.appCode = yamlConfig.appCode;
            this.pageTitle = yamlConfig.pageTitle;
            this.service = yamlConfig.service;
            this.backendMap = yamlConfig.backendMap;
        } catch (err) {
            window.console.log(err)
        }
    }

    getAppCode() {
        return this.appCode
    }

}



export default Config
