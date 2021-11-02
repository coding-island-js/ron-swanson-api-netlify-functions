# ron-swanson-api-netlify-functions

# My Table of content
- [Intended Audience](#id-section1)
- [What are we Building?](#id-section2)
- [Prerequisite](#id-section3)
- [Create Layout with HTML and CSS](#id-section4)
- [Install Netlify CLI](#id-section5)
- [Write Client Side JavaScript](#id-section6)
- [Write Netlify Functions](#id-section7)
- [Test Locally](#id-section8)
<div id='id-section1'/>

## Intended Audience

- Experience using NPM to install packages
- Newbies are welcome. Follow along and google (I use DuckDuckGo) anything you need more clarity on. Intermediate/Advanced programmers do this all the time.
<div id='id-section2'/>

## What are we Building?

A website ([demo link](https://ronswansonquotesapi.netlify.app/)) that calls the Ron Swanson Quotes API, using Netlify Functions (serverless), and displays the quote. 

We will be using HTML, CSS, and Vanilla JavaScript to build the website.
<div id='id-section3'/>

The  [code](https://github.com/coding-island-js/ron-swanson-api-netlify-functions) is publicly available at GitHub.

## Prerequisite

- Node.js - here is a link to [install](https://nodejs.org/)
   - this is needed to test Netlify Functions locally
<div id='id-section4'/>

## Create Layout with HTML and CSS

Open up your code editor (I use VSCode). Create a folder. I called mine ```Ron-swanson-api-netlify-functions```.

Any name will do.

Create a HTML file called index.html

VSCode has a shortcut to create a HTML boilerplate. Just type:

```
!
``` 

or copy below:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
``` 

Give your HTML page a title. Any title will do.

```
<title>Ron Swanson Quotes</title>
``` 

Let's create a header, main, footer section, and a p tag with an id:

```
<body>
    <header>
        Ron Swanson Quotes
    </header>
    <main>
        <p id="ron-swanson-quote"></p>
    </main>
    <footer>
        made with love @codingraj
    </footer>
</body>
``` 

Let add some CSS to format the layout with Grid and add some color.

Create a css file called: style.css

Create a link to the css file on index.html in the <head> section.

```
<link rel="stylesheet" href="style.css">
``` 

Open style.css and set the box-sizing to border-box. Let's use the body tag to create the Grid plus some color and spacing between elements.

```
/* Box sizing rules */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Set Grid Layout, min-height, some color, and padding on the top and bottom */
body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background: #d1bdf7;
  place-items: center;
  padding-block: 2vw;
}
``` 
<div id='id-section5'/>

## Install Netlify CLI to test Netlify Function (serverless) locally

Run npm init to create a ```package.json``` file

Type this in the terminal.

```
npm init -y
``` 

Create/open a new file called ```.gitignore``` and type:

```
node_modules
# Local Netlify folder
.netlify
.env
``` 

This will ignore these folders/files if you sync changes with GitHub.

Open up Terminal to install Netlify CLI. For this tutorial, I have it installed locally. Type:

```
npm install netlify-cli --save-dev
``` 

Install node-fetch version 2.6.5 in terminal. Don't install node-fetch latest version 3.0. The latest version breaks Netlify Functions. I think it may have to do with serverless functions performed by AWS Lamda, which Netlify uses don't support ES6 modules yet. Type:

```
npm install node-fetch@2.6.5
```  

We will use this library to get a quote from the Ron Swanson quote generator.

Create a ```netlify.toml``` file in the root directory. This is a configuration file that Netlify will use to find the location of the Netlify Function (serverless code).

```
[functions]
  # Directory with serverless functions, including background functions,
  # to deploy. This is relative to the base directory if one has been set, 
  # or the root directory if a base hasn’t been set.
  directory = "functions/"
``` 
<div id='id-section6'/>

## Write Netlify Functions

Create a folder in the root directory called ```functions```. Create a file called ```ronSwansonQuotes.js``` in the functions folder. Type the below code:


```
const fetch = require("node-fetch");

const API_ENDPOINT = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

exports.handler = async (event, context, callback) => {
  return fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
``` 

```return fetch(API_ENDPOINT)```. This will get the Ron Swanson quote.

``` .then((response) => response.json())```. This will parse the quote as JSON.

```.then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))```. This will send the quote back as a string to the client. From my testing, it seems that Netlify Functions requires that data getting sent back to the client must be a string and not an object. And it requires a statusCode being sent back.
<div id='id-section7'/>

## Code Client-side JavaScript to call Netlify Function

Create a file called ```script.js``` in the root folder. Write a function to call the Netlify Function when the page loads.

```
// url for Netlify Functions. When Netlify builds the site, it places all functions in the "/.netlify/" folder
const quoteNetlifyFunctions = "/.netlify/functions/ronSwansonQuotes";

//call api when page loads
callQuoteAPI();

//call netlify functions for api
function callQuoteAPI() {
  fetch(quoteNetlifyFunctions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //display the quote on the HTML Page
      document.getElementById("ron-swanson-quote").innerText = data;
    })
    .catch((error) => console.error(error));
}
``` 
Add a script tag to link the script.js to the index.html.

```
<script src="/script.js"></script>
```
<div id='id-section8'/>

### Test Netlify Function locally

Start a local development server with Netlify CLI. 

```
npx netlify dev
``` 

Make sure to type in ```npx``` if you installed the Netlify CLI locally. Otherwise you will get this error ```zsh: command not found: netlify```.

This will start a server on http://localhost:8888. Open your web browser, if it didn't open automatically, and type in the browser's address bar ```http://localhost:8888/index.html```.

You will see the Ron Swanson Quote on the HTML page and console log. If you refresh the browser, you will see new quote again.













