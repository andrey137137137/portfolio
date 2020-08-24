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
router.post('/works', isAuth, (req, res) => {
  upload(req, res, 'works');
});
router.post('/parallax/:layer', isAuth, (req, res) => {
  upload(req, res, 'parallax', req.params.layer);
});

module.exports = router;
