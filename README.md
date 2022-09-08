## aliyun-iot-mqtt

[![npm-version](https://img.shields.io/npm/v/aliyun-iot-mqtt.svg)](https://npmjs.org/package/aliyun-iot-mqtt)
[![travis-ci](https://travis-ci.org/xihu-fm/aliyun-iot-mqtt.svg?branch=master)](https://travis-ci.org/xihu-fm/aliyun-iot-mqtt)
[![coverage](https://coveralls.io/repos/github/xihu-fm/aliyun-iot-mqtt/badge.svg?branch=master)](https://coveralls.io/github/xihu-fm/aliyun-iot-mqtt?branch=master)
[![npm-download](https://img.shields.io/npm/dm/aliyun-iot-mqtt.svg)](https://npmjs.org/package/aliyun-iot-mqtt)

[Aliyun IoT Hub](https://www.aliyun.com/product/iot) MQTT client for Node.js


## Installation

You can install it as dependency with npm.

```sh
$ # save into package.json dependencies with -S
$ npm install aliyun-iot-mqtt -S
```

## Usage

Aliyun IoT Hub mqtt client with authrozied by productKey & deviceName & deviceSecret.


### GET Data 

```js
const Mqtt = require('aliyun-iot-mqtt');

const client = Mqtt.getAliyunIotMqttClient({
    productKey: "",
    deviceName: "",
    deviceSecret: "",
    regionId: "cn-shanghai",

    keepalive:120 // mqtt options
});


client.on('connect', function() {
    console.log("connect")
})

client.end(function (){
    console.log("end")
})

```

### TLS mqtts
[aliyun_iot_root.cer](http://aliyun-iot.oss-cn-hangzhou.aliyuncs.com/cert_pub/root.crt)

```js
var trustedCA = fs.readFileSync(path.join(__dirname, '/aliyun_iot_root.cer'))

var options = {
    productKey: "",
    deviceName: "",
    deviceSecret: "",
    regionId: "cn-shanghai",
    protocol: 'mqtts',
    ca: trustedCA,

    keepalive:120 // mqtt options
};

```

### Subscribe Topic 

```js
client.subscribe(topic)

```
### Publish Message 

```js
client.publish(topic, 'Hello mqtt')
client.publish(topic, 'Hello mqtt', { qos: 1 })

```

### Receive Message 

```js
client.on('message', function(topic, message) {
    console.log(topic+"," + message.toString())
})

```
