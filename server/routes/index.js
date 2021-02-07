const router = require('express').Router();
const { NOT_FOUND } = require('@httpSt');

router.use('/parallax', require('./parallax'));
router.use('/image', require('./image'));
router.use('/work', require('./work'));
router.use('/skill', require('./skill'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/user', require('./user'));

router.get('*', (req, res) => {
  res.status(NOT_FOUND).json({ msg: 'Not found', err: NOT_FOUND });
});

module.exports = router;
