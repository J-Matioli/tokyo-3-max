const express = require('express')

const router = express.Router()

const MangaControler = require('../controllers/mangas-controller')

router.get('/', MangaControler.getMangas)

router.get('/:id', MangaControler.getByIdManga)

router.post('/', MangaControler.postManga)

router.put('/:id', MangaControler.putManga)

router.delete('/:id', MangaControler.deleteManga)

module.exports = router