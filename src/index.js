require('dotenv').config();
const axios = require('axios');
const { genString, sleep } = require('./utils');

const CONCURRENT = 3;
const DELAY = 60000;

async function earnFreeTraffic(clientId) {
  const installId = genString(11);

  let data = {
    key: `${genString(43)}=`,
    install_id: installId,
    fcm_token: `${installId}:APA91b${genString(134)}`,
    referrer: clientId,
    warp_enabled: false,
    tos: new Date().toISOString().replace('Z', '+07:00'),
    type: 'Android',
    locale: 'en_US'
  };

  const options = {
    url: 'https://api.cloudflareclient.com/v0a745/reg',
    method: 'POST',
    data
  };

  const response = await axios(options);

  return response.data;
}

async function waiting() {
  console.log(`Waiting 1 minute.`);

  await sleep(DELAY);
}

async function main() {
  let count = 0;
  const clientId = process.env.CLIENT_ID;

  while (true) {
    try {
      for (let i = 0; i < CONCURRENT; i++) {
        await earnFreeTraffic(clientId);
        console.log(`${++count}. Earned +1GB traffic.`);
        await sleep(2000);
      }
    } catch (err) {
      console.error(err);
    }

    await waiting();
  }
}

main().catch(err => {
  console.error(err);
});
