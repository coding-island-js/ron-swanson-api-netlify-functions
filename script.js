const quoteNetlifyFunctions =
  "https://ron-swanson-quotes-api.netlify.app/.netlify/callQuoteAPI";

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
