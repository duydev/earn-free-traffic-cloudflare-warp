const { genString, sleep } = require('./utils');

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

  data = JSON.stringify(data);

  await axios({
    url: 'https://api.cloudflareclient.com/v0a745/reg',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json',
      Host: 'api.cloudflareclient.com',
      Connection: 'Keep-Alive',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/3.12.1',
      'Content-Length': data.length
    }
  });
}

async function main() {
  const clientId = process.env.CLIENT_ID;

  await earnFreeTraffic(clientId);

  console.log(`Earned +1GB traffic.`);
}

main().catch(err => {
  console.error(err);
});
