const mqtt = require("mqtt");
const mongoConnect = require("./dbConnection");
const deviceSchema = require("./model/device");

let mqttConnection = mqtt.connect("mqtt://broker.hivemq.com");

mqttConnection.on("connect", () => {
  mqttConnection.subscribe("assets");
  console.log("subscribed successfully");
});

mqttConnection.on("message", async (topic, data) => {
  console.log(data.toString());

  try {
    let funRes_MongoDB = await saveDataToMongo(JSON.parse(data.toString()));
    console.log(funRes_MongoDB);
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
  }
});


mongoConnect();

function saveDataToMongo(inputJSON) {
  try {
    return new Promise(async (resolve, reject) => {
      await deviceSchema
        .insertMany(inputJSON)
        .then((result) => {
          if (result.length > 0) {
            resolve({
              statusCode: 200,
              message: "document inserted successfully",
            });
          } else {
            reject({ statusCode: 400, message: "document not inserted" });
          }
        })
        .catch((e) => {
          reject({ statusCode: 400, message: e.message });
        });
    });
  } catch (error) {
    console.log(error);
  }
}
