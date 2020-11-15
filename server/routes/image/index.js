const router = require('express').Router();

const { isAuth } = require('@auth');
const image = require('@contr/image');

router.post('/avatar', isAuth, (req, res) => {
  image.upload(req, res);
});
router.post('/slider', isAuth, (req, res) => {
  image.upload(req, res, 'slider');
});
router.delete('/slider/:imageName', isAuth, (req, res) => {
  image.delete(res, req.params.imageName, 'slider');
});
router.post('/about', isAuth, (req, res) => {
  image.upload(req, res, 'about');
});
router.post('/works', isAuth, (req, res) => {
  image.upload(req, res, 'works');
});
router.post('/parallax/:layer', isAuth, (req, res) => {
  image.upload(req, res, 'parallax', req.params.layer);
});

module.exports = router;
