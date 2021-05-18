// создать роутер
const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validateUserUpdatingBody } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', validateUserUpdatingBody, updateUserInfo);

// экспортировать роутер
module.exports = router;
