const wifi = require(`Wifi`);
const mqtt = require(`MQTT`);

const WIFI_SSID = "";
const WIFI_PASS = "";
const MQTT_BROKER = "xperiment.southeastasia.cloudapp.azure.com";
const MQTT_OPTIONS = {
  port: 1883,
  protocol_name: `MQTT`,
  protocol_level: 4,
};
const MQTT_SUBSCRIBE_TOPIC = "devcember/espectro/led";
const MQTT_PUBLISH_TOPIC = "devcember/espectro/tx";

const mqttClient = mqtt.create(MQTT_BROKER, MQTT_OPTIONS);
let mqttConnected = false;

D15.mode('output');
D15.write(HIGH);

wifi.connect(WIFI_SSID, { password: WIFI_PASS }, () => {
  console.log(`Connected to WiFi`);
  mqttClient.connect();
});

mqttClient.on(`connected`, () => {
  console.log(`MQTT client is connected`);
  mqttClient.subscribe(MQTT_SUBSCRIBE_TOPIC);
  mqttConnected = true;
});

mqttClient.on(`disconnected`, () => {
  console.log(`MQTT client is diconnected`);
  mqttConnected = false;
  mqttClient.connect();
});

mqttClient.on(`publish`, (pub) => {
  console.log(`topic: ${pub.topic}\n message: ${pub.message}`);
  if (pub.topic === MQTT_SUBSCRIBE_TOPIC) {
    try {
      const message = JSON.parse(pub.message);

      if (message.led === 1) {
        D15.write(LOW); 
      } else {
        D15.write(HIGH); 
      }
    } catch (ex) {
      console.log(`Failed to parse message`); 
      console.log(ex.message);
    }
  }
});

setInterval(() => {
  if (!mqttConnected) {
    return;
  }
  
  const payload = {
    phototransistor: analogRead(D36), 
  };
  
  console.log(`publishing`, payload);
  mqttClient.publish(MQTT_PUBLISH_TOPIC, JSON.stringify(payload));
}, 5000);