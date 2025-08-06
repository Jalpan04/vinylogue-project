const express = require('express');
const router = express.Router();
const { searchAlbums, getAlbumById } = require('../controllers/spotifyController');

router.get('/search', searchAlbums);
router.get('/album/:id', getAlbumById);

module.exports = router;