const express = require('express')

const router = express.Router()

const AnimesController = require('../controllers/animes-controller')

router.get('/', AnimesController.getAnimes)

router.get('/:id', AnimesController.getByIdAnimes)

router.post('/', AnimesController.postAnime)

router.put('/:id', AnimesController.putAnime)

router.delete('/:id', AnimesController.deleteAnime)

module.exports = router