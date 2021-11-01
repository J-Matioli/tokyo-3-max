const mysql = require('../mysql').pool

exports.getAnimes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `SELECT * FROM anime`

        conn.query(SQL, (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                animes: result
            })
        })
    })
}

exports.getByIdAnimes = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
            SELECT * FROM anime
            WHERE anime.idanime = ?`

        conn.query(SQL, [req.params.id], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            if(result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado um anime com este id'
                })
            }

            return res.status(200).send({
                data: result[0]
            })

        })
    })
}

exports.postAnime = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        INSERT INTO anime (
            nome,
            episodios,
            estudio,
            genero,
            lancamento
        ) VALUES (?, ?, ?, ?, ?)`

        conn.query(SQL, [
            req.body.nome,
            req.body.episodios,
            req.body.estudio,
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
                id_anime: result.insertId,
                anime: req.body
            })

        })
    })
}

exports.putAnime = (req, res, next) => {
    
    const idAnime = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        UPDATE anime 
        SET nome = ?,
            episodios = ?,
            estudio = ?,
            genero = ?,
            lancamento = ?
        WHERE idanime = ?`

        conn.query(SQL, [
            req.body.nome,
            req.body.episodios,
            req.body.estudio,
            req.body.genero,
            req.body.lancamento,
            idAnime
        ], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                data: req.body
            })
        })
    })
}

exports.deleteAnime = (req, res, next) => {
    const idanime = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `DELETE FROM anime WHERE idanime = ?`

        conn.query(SQL, [idanime], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                mensagem: 'Anime removido com sucesso',
            })
        })
    })
}