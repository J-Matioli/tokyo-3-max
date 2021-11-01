const express = require('express')
const cors = require('cors')

const morgan = require('morgan')

const rotaAnimes = require('./routes/animes')
const rotaFilmes = require('./routes/filmes')
const rotaMangas = require('./routes/mangas')

const app = express()


app.use(morgan('dev'))

app.use(express.urlencoded({extended: false})) 
app.use(express.json())

app.use(cors())

app.use('/animes', rotaAnimes)
app.use('/filmes', rotaFilmes)
app.use('/mangas', rotaMangas)

app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app