const fetch = require('node-fetch');

const productIds = ['146183292', '146183254'];
const url = `https://hullutpaivat.com/api/balance?orinIds=${productIds.join(
  ','
)}`;

(async function run() {
  try {
    const res = await fetch(url);
    const json = await res.json();

    Object.keys(json.balances).forEach(key => {
      if (json.balances[key]) {
        console.log('Löytyy varastosta');
      }
    });
  } catch (e) {
    console.error(e);
  }
})();
