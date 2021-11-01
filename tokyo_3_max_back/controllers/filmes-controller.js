const mysql = require('../mysql').pool

exports.getFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `SELECT * FROM filme`

        conn.query(SQL, (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                filmes: result
            })
        })
    })
}

exports.getByIdFilmes = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
            SELECT * FROM filme
            WHERE filme.idfilme = ?`

        conn.query(SQL, [req.params.id], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            if(result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado um filme com este id'
                })
            }

            return res.status(200).send({
                data: result[0]
            })

        })
    })
}

exports.postFilme = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        INSERT INTO filme (
            nome,
            duracao,
            diretor,
            genero,
            lancamento
        ) VALUES (?, ?, ?, ?, ?)`

        conn.query(SQL, [
            req.body.nome,
            req.body.duracao,
            req.body.diretor,
            req.body.genero,
            req.body.lancamento,
        ], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            if(result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado denúncia com este id'
                })
            }

            return res.status(200).send({
                id_filme: result.insertId,
                filme: req.body
            })

        })
    })
}

exports.putFilme = (req, res, next) => {
    
    const idFilme = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        UPDATE filme
        SET nome = ?,
            duracao = ?,
            diretor = ?,
            genero = ?,
            lancamento = ?
        WHERE idfilme = ?`

        conn.query(SQL, [
            req.body.nome,
            req.body.duracao,
            req.body.diretor,
            req.body.genero,
            req.body.lancamento,
            idFilme
        ], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                data: req.body
            })
        })
    })
}

exports.deleteFilme = (req, res, next) => {
    const idFilme = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `DELETE FROM filme WHERE idfilme = ?`

        conn.query(SQL, [idFilme], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                mensagem: 'Filme removido com sucesso',
            })

        })
    })
}