const fetch = require("node-fetch");

const API_ENDPOINT = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";


exports.handler = async (event, context, callback) => {
  return fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};


