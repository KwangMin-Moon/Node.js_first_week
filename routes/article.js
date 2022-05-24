const express = require('express');
const Articles = require('../schemas/articles');
const router = express.Router();

// 전체 게시글 목록 및 username으로 게시글 조회 API
router.get('/', async (req, res) => {
  const { username } = req.query;
  const wholeArticle = await Articles.find(
    {},
    { _id: 0, title: 1, username: 1, date: 1 }
  );

  const article = username
    ? await Articles.find(
        { username },
        { _id: 0, title: 1, username: 1, date: 1 }
      )
    : wholeArticle.sort((a, b) => b['date'] - a['date']);
  res.json({ article });
});

// 게시글 작성 API
router.post('/article', async (req, res) => {
  const { title, username, password, content } = req.body;
  const createdArticle = await Articles.create({
    title,
    username,
    password,
    content,
  });
  res.json({ article: createdArticle });
});

// 게시글 조회 API
router.get('/article', async (req, res) => {
  const article = await Articles.find(
    {},
    { _id: 0, username: 1, title: 1, date: 1, content: 1 }
  );
  res.json({ article });
});

// 게시글 수정 API
router.put('/article', async (req, res) => {
  const { password, content } = req.body;
  const dataPassword = (await Articles.find({})).filter(
    (a) => a.password === password
  );
  if (!dataPassword.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: '비밀번호를 확인해주세요' });
  }
  await Articles.updateOne({ password }, { $set: { content } });
  res.json({ success: true });
});

// 게시글 삭제 API
router.delete('/article', async (req, res) => {
  const { password } = req.body;
  const dataPassword = (await Articles.find({})).filter(
    (a) => a.password === password
  );
  if (!dataPassword.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: '비밀번호를 확인해주세요' });
  }
  await Articles.deleteOne({ password });
  res.json({ success: true });
});

module.exports = router;
