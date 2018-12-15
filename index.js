const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || '9090';
const NAVER_API_CLIENT_ID = process.env.NAVER_API_CLIENT_ID || '';
const NAVER_API_CLIENT_SECRETE_ID = process.env.NAVER_API_CLIENT_SECRETE_ID || '';

const app = express();

const NAVER_PLACE_SEARCH_URL = 'https://naveropenapi.apigw.ntruss.com/map-place/v1/search';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.post('/search', (req, res) => {
  const { coords: { latitude, longitude}, keyword } = req.body;

  console.log(`${NAVER_PLACE_SEARCH_URL}?query=${encodeURIComponent(keyword)}&coordinate=${[longitude, latitude].join(',')}`);

  request.get(`${NAVER_PLACE_SEARCH_URL}?query=${encodeURIComponent(keyword)}&coordinate=${[longitude, latitude].join(',')}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-NCP-APIGW-API-KEY-ID': NAVER_API_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': NAVER_API_CLIENT_SECRETE_ID
    }
  }, (error, response, body) => {
    if (error) return console.error(error);

    res.json(body);
  });
});

app.listen(PORT, () => {
  console.log(`port ${PORT} is open`);
});