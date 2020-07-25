const router = require('express').Router();

const { isAuth } = require('@auth');
const upload = require('@contr/upload');

router.post('/avatar', isAuth, (req, res) => {
  upload(req, res);
});
router.post('/slider', isAuth, (req, res) => {
  upload(req, res, 'slider');
});
router.post('/about', isAuth, (req, res) => {
  upload(req, res, 'about');
});

module.exports = router;
