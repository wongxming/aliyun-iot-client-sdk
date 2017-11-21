'use strict';

const crypto = require('./lib/hex_hmac_sha1');
const mqtt = require('mqtt');
const uuid = require('uuid');
/**
* options 
        productKey
        deviceName
        deviceSecret
*/
exports.getAliyunIotMqttClient = function(options) {

    if (!options || !options.productKey ||
        !options.deviceName || !options.deviceSecret) {
        throw new Error('options need productKey,deviceName,deviceSecret');
    }

    const deviceSecret = options.deviceSecret;
    delete options.deviceSecret;
    options.timestamp = Date.now();
    options.clientId = uuid.v4();

    let keys = Object.keys(options).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
        list.push(`${key}${options[key]}`);
    });
    const contentStr = list.join('');

    const password = crypto.hex_hmac_sha1(deviceSecret, contentStr);


    const mqttClientId = `${options.clientId}|securemode=3,signmethod=hmacsha1,timestamp=${options.timestamp}|`;

    //华东2节点域名是：${productKey}.iot-as-mqtt.cn-shanghai.aliyuncs.com:1883
    var url = `tcp://${options.productKey}.iot-as-mqtt.cn-shanghai.aliyuncs.com:1883`;
    var opts = {
        clientId: mqttClientId,
        username: `${options.deviceName}&${options.productKey}`,
        password: password
    };

    return mqtt.connect(url, opts);
}