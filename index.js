require('dotenv').config();

const fetch = require('node-fetch');
const twilio = require('twilio');

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const productIds = ['146183292', '146183254'];
const url = `https://hullutpaivat.com/api/balance?orinIds=${productIds.join(
  ','
)}`;

async function notify(productId) {
  try {
    await client.messages.create({
      body: `Tuoleja on tullut varastoon! https://hullutpaivat.com/tuote/${productId}`,
      to: `whatsapp:${process.env.NUMBER_TO}`,
      from: `whatsapp:${process.env.NUMBER_FROM}`
    });
  } catch (error) {
    console.error(error);
  }
}

(async function run() {
  try {
    const res = await fetch(url);
    const json = await res.json();

    Object.keys(json.balances).forEach(key => {
      if (json.balances[key]) {
        notify(key);
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
