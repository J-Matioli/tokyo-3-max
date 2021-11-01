const express = require('express')

const router = express.Router()

const FilmeControler = require('../controllers/filmes-controller')

router.get('/', FilmeControler.getFilmes)

router.get('/:id', FilmeControler.getByIdFilmes)

router.post('/', FilmeControler.postFilme)

router.put('/:id', FilmeControler.putFilme)

router.delete('/:id', FilmeControler.deleteFilme)

module.exports = router