const mysql = require('../mysql').pool

exports.getMangas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `SELECT * FROM manga`

        conn.query(SQL, (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                mangas: result
            })
        })
    })
}

exports.getByIdManga = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
            SELECT * FROM manga
            WHERE manga.idmanga = ?`

        conn.query(SQL, [req.params.id], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            if(result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado um mangá com este id'
                })
            }

            return res.status(200).send({
                data: result[0]
            })

        })
    })
}

exports.postManga = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        INSERT INTO manga (
            nome,
            volumes,
            mangaka,
            genero,
            lancamento
        ) VALUES (?, ?, ?, ?, ?)`

        conn.query(SQL, [
            req.body.nome,
            req.body.volumes,
            req.body.mangaka,
            req.body.genero,
            req.body.lancamento,
        ], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            if(result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado um mangá com este id'
                })
            }

            return res.status(200).send({
                id_manga: result.insertId,
                filme: req.body
            })

        })
    })
}

exports.putManga = (req, res, next) => {
    
    const idManga = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `
        UPDATE manga
        SET nome = ?,
            volumes = ?,
            mangaka = ?,
            genero = ?,
            lancamento = ?
        WHERE idmanga = ?`

        conn.query(SQL, [
            req.body.nome,
            req.body.volumes,
            req.body.mangaka,
            req.body.genero,
            req.body.lancamento,
            idManga
        ], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                data: req.body
            })
        })
    })
}

exports.deleteManga = (req, res, next) => {
    const idManga = req.params.id

    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({ error: error })
        
        const SQL = `DELETE FROM manga WHERE idmanga = ?`

        conn.query(SQL, [idManga], (error, result, fields) => {
            if(error) return res.status(500).send({ error: error })
            conn.release()

            return res.status(200).send({
                mensagem: 'Mangá removido com sucesso',
            })

        })
    })
}