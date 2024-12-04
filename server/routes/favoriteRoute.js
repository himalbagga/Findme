const express = require('express');
const {getFavorite} = require('../controllers/favoriteController')

const router = express.Router();

router.get('/favourites/:userId', getFavorite);