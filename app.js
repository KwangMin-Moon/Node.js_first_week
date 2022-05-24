const express = require('express');
const connect = require('./schemas');
const app = express();
const port = 3000;
const articleRouter = require('./routes/article.js');

connect();

app.use(express.json());

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 켜졌어요!');
});
