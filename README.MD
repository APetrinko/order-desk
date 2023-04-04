## Automatic Order Retrieval App
This is a Node.js app that retrieves new orders from the Order Desk API every hour and logs the order IDs and shipping addresses to the console.

# Installation
1. Clone the repository:
 ``` bash
git clone <repository-url>
 ```

2. Install dependencies:
  ``` bash
npm install
 ```

3. Start the server:
  ``` bash
npm start
 ```

# Configuration
To use this app, you'll need to provide your Order Desk store ID and API key. Replace the ORDERDESK-STORE-ID and ORDERDESK-API-KEY values in the headers object with your own values.

  ``` bash
const headers = {
  'ORDERDESK-STORE-ID': '<your-store-id>',
  'ORDERDESK-API-KEY': '<your-api-key>',
  'Content-Type': 'application/json',
};
 ```

 # Usage

 The app provides an endpoint /orders that retrieves new orders and logs the order IDs and shipping addresses to the console. You can access the endpoint by navigating to http://localhost:3000/orders in your browser.

The app will also automatically retrieve new orders every hour using the setInterval function.