# troublemaker  (捣蛋鬼)


#### 这是一个mock服务管理后台，包含用户（接入的应用）、配置（应用mock规则配置）功能

- 使用该mock平台需要在应用端安装 mock client，安装步骤


### 第一步（安装）


1. 配置应用jvm环境变量

```
-Dmock.host=http://10.250.10.6:8003 -Dapp.name=hsc -Dapp.env=20201207-daily-zejun
```
2. 启动应用后安装mock client
```shell
curl -s https://kunchu.oss-cn-beijing.aliyuncs.com/install-troublemaker.sh |sh
```
3. 启动mock client （默认启动 48 pid  如果不是 需要手动启动）

```
cd ~
jps 通过jps找到应用的 pid  比如 pid 为 49
./sandbox/bin/sandbox.sh -p 49
```
4. 如果启动成功，就可以在mock平台查看到自己应用的用户已经在运行中了


### 第二步（配置mock）


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

    