const quoteNetlifyFunctions = "/.netlify/functions/callQuoteAPI.js";

//call netlify functions for api
function callQuoteAPI() {
  fetch(quoteNetlifyFunctions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}

callQuoteAPI();
