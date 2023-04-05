import express from 'express';
import axios from 'axios';
import moment from 'moment';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

const BASE_URL = 'https://app.orderdesk.me/api/v2';

const headers = {
  'ORDERDESK-STORE-ID': '51994',
  'ORDERDESK-API-KEY': 'h7DNSdVq56HXGLhqHEcsanb2pyphEKJ3gkvAyfXzFCXXffcUq7',
  'Content-Type': 'application/json',
};

let lastDate = moment().subtract(1, 'hour').toISOString();

app.get('/orders', async (req, res) => {
  try {
    async function fetchOrders() {
      const response = await axios.get(`${BASE_URL}/orders`, {
        headers,
        params: {
          search_start_date: lastDate,
        },
      });
      const orders = response.data.orders;
      console.log(`Found ${orders.length} new order(s)`);
      orders.forEach((order) => logOrder(order));

      if (orders.length > 0) {
        const latestOrder = orders[orders.length - 1];
        lastDate = moment(latestOrder.created_at).toISOString();
      }

      res.status(200).json(orders);
      res.end();
    };

    await fetchOrders();
    setInterval(async () => {
      await fetchOrders();
    }, 3600000)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    res.end();
  }
});

function logOrder(order) {
  console.log(`Order ID: ${order.id}`);
  if (order.shipping.address1) {
    console.log(`Shipping Address: ${order.shipping.address1}`);
  } else {
    console.log('Shipping Address not found.');
  }
}

app.listen(PORT || process.env.PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/orders`);
});
