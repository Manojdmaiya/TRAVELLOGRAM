const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js')
const campgrounds = require('../controllers/campgrounds.js')
const multer = require('multer')
const { storage } = require('../cloudinary/index.js')

const upload = multer({ storage: storage })

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array('images'),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  )

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router
  .route('/:id')
  .get(isLoggedIn, catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('images'),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
)

module.exports = router
