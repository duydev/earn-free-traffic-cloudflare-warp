require('dotenv').config();
const axios = require('axios');
const { genString, sleep } = require('./utils');

const CONCURRENT = process.env.CONCURRENT || 3;
const DELAY_BETWEEN_REQUEST = process.env.DELAY_BETWEEN_REQUEST || 5000;
const DELAY_AFTER_BATCH = process.env.DELAY_AFTER_BATCH || 60000;

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

async function main() {
  let count = 0;
  const clientId = process.env.CLIENT_ID;

  if (!clientId) throw Error('Missing client ID.');

  while (true) {
    try {
      for (let i = 0; i < CONCURRENT; i++) {
        await earnFreeTraffic(clientId);
        console.log(`${++count}. Earned +1GB traffic.`);
        await sleep(DELAY_BETWEEN_REQUEST);
      }
    } catch (err) {
      console.error(err);
    }

    console.log(`Waiting some minutes...`);

    await sleep(DELAY_AFTER_BATCH);
  }
}

main().catch(err => {
  console.error(err);
});
