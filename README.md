# troublemaker  (捣蛋鬼)


#### 这是一个imock服务可视化管理后台，包含用户（接入的应用）、配置（应用mock规则配置）功能

 
####  安装imock-web 
1. 首先需要安装[Node](https://nodejs.org/zh-cn/) 环境
2. 下载项目 [imock-web](https://github.com/chufusheng/imock-web)
3. 进入项目 /src/config  配置后台地址 
4. 进入项目  运行  yarn install （需要安装yarn  npm install yarn）
5. 启动    运行    yarn start
     
```
const config = {
    "appCode": "",
    "pageTitle": "",
    "service": "",
    "backendMap": {
        "test": "http://127.0.0.1:8003"
    },
}
```

### 第二步（配置mock）



![image](https://kunchu.oss-cn-beijing.aliyuncs.com/image/first.png)


![image](https://kunchu.oss-cn-beijing.aliyuncs.com/image/create.png)

1. 选择需要mock的应用及环境
2. 配置需要mock的类名及方法名 （Interface类不支持）
3. 配置这个方法需要的返回
- 如果返回的是基本类型，直接在returnData里返回（比如布尔类型返回false）例如：
``` 
{
  classNames: [
  ],
  returnData: false
}
```

- 如果返回的是简单对象  例如：
```
{
  classNames: [
    'com.ytgw.facade.message.SupergwMessage'
  ],
  returnData: {
    businessResultCode: 'SUCCESS1',
    channelResponseCode: '0',
    channelResponseMessage: '校验成功',
    channelResponseType: 'SUCCESS',
    data: {
      name: 'message'
    }
  }
}
```

- 如果返回的是嵌套对象 例如：

```
{
  classNames: [
    'com.tester.jvm.mock.common.domain.MockResult',//这里需要按照类型从外到内排序（MockResult<String>）
    'java.lang.String'
  ],
  returnData: {
    success: true,
    data: 'ccccccc',
    message: '获取成功'
  }
}
```

- 如果是异常返回  例如：
``` 
{
  classNames: [
  ],
  returnData: java.io.IOException
}
```

#### 功能介绍
1. 运行及暂停功能 是动态开启关闭目标应用的mock功能，即开即用，即关即停
2. 配置好mock 后需要手动在首页更新配置，目的是更新目标应用的监听
3. 日志功能可以远程查看目标应用mock 服务的日志，便于排查问题