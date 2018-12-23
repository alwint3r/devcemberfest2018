const wifi = require(`Wifi`);

const WIFI_SSID = "";
const WIFI_PASS = "";

wifi.scan((ap) => console.log(ap));
wifi.connect(WIFI_SSID, { password: WIFI_PASS }, () => {
  console.log(`Connected to WiFi`);
});
