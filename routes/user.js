const router = require("express").Router();
const {
  patchUser,
  getCurrentUser,
} = require("../controllers/users");
// const {
//   validationUpdateUser,
//   validationUpdateAvatar,
//   validationUserId,
// } = require("../middlewares/validationUser");

router.get("/me", getCurrentUser);
router.patch("/me", patchUser);

module.exports = router;