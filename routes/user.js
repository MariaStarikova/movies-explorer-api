const router = require('express').Router();
const {
  patchUser,
  getCurrentUser,
} = require('../controllers/users');
const {
  validationUpdateUser,
} = require('../middlewares/validationUser');

router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateUser, patchUser);

module.exports = router;
