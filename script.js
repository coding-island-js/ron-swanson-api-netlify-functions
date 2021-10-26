//url for Netlify Functions
const quoteNetlifyFunctions =
  "https://ron-swanson-quotes-api.netlify.app/.netlify/functions/callQuoteAPI";

//call api when page loads
callQuoteAPI();

//call netlify functions for api
function callQuoteAPI() {
  fetch(quoteNetlifyFunctions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}

