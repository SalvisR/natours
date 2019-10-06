const express = require('express');

const {
  getAllusers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto
} = require('./../controllers/userConroller');

const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
  updatePassword
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updatemypassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateme', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteme', deleteMe);

router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllusers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
