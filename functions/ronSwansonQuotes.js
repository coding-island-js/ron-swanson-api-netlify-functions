import fetch from "node-fetch";

const API_ENDPOINT = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

exports.handler = async (event, context, callback) => {
  let obj = {};
  obj["name"] = "test";
  obj["test"] = "test12";
  return fetch(API_ENDPOINT)
    .then((res) => res.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
