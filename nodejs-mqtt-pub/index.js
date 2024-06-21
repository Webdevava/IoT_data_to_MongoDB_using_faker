const mqtt = require("mqtt");
const { default: getTimer } = require("mqtt/lib/get-timer");

let mqttConnection = mqtt.connect("mqtt://broker.hivemq.com");

mqttConnection.on("connect", () => {
  setInterval(() => {
    let msg = [
      {
        speed: Math.floor(Math.random() * 100),
        longitude: Math.random() * (-68.32 - -71.945) + -71.945,
        latitude: Math.random() * (19.935 - 17.541) + 17.541,
        time: Date.now(),
        date: new Date(Date.now()).toLocaleDateString(),
      },
    ];
    let jsonData = JSON.stringify(msg); // Convert array to JSON string
    console.log(jsonData);
    mqttConnection.publish("assets", jsonData);
  }, 5000);
});
