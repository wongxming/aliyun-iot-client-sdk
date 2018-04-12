'use strict';

const crypto = require('crypto');
const mqtt = require('mqtt');
/**
* options 
        productKey
        deviceName
        deviceSecret
*/
exports.getAliyunIotMqttClient = function(opts) {

    if (!opts || !opts.productKey ||
        !opts.deviceName || !opts.deviceSecret) {
        throw new Error('options need productKey,deviceName,deviceSecret');
    }

    if (opts.protocol === 'mqtts' && !opts.ca) {
        throw new Error('mqtts need ca ');
    }
    if (!opts.host && !opts.regionId) {
        throw new Error('options need host or regionId (aliyun regionId)');
    }

    const deviceSecret = opts.deviceSecret;
    delete opts.deviceSecret;

    let secureMode = (opts.protocol === 'mqtts') ? 2 : 3;

    var options = {
        productKey: opts.productKey,
        deviceName: opts.deviceName,
        timestamp: Date.now(),
        clientId: Math.random().toString(36).substr(2)
    }
    let keys = Object.keys(options).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
        list.push(`${key}${options[key]}`);
    });
    const contentStr = list.join('');

    opts.password = crypto.createHmac('sha1', deviceSecret).update(contentStr).digest('hex');
    opts.clientId = `${options.clientId}|securemode=${secureMode},signmethod=hmacsha1,timestamp=${options.timestamp}|`;
    opts.username = `${options.deviceName}&${options.productKey}`;

    opts.port = opts.port || 1883;
    opts.host = opts.host || `${opts.productKey}.iot-as-mqtt.${opts.regionId}.aliyuncs.com`;
    opts.protocol = opts.protocol || 'mqtt';

    return mqtt.connect(opts);
}
