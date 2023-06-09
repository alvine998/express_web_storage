
const db = require('../models')
const products = db.products
const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = req.query.size || 10;
        const result = await products.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                app_id: {[Op.eq]: req.header('x-app-id')},
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { code: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.category_id && { category_id: { [Op.eq]: req.query.category_id } },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            limit: size
        })
        return res.status(200).send({
            status: "success",
            total_items: result.length,
            items: result,
            code: 200
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error: error })
    }
};

exports.create = async (req, res) => {
    try {
        const existproducts = await products.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                code: { [Op.eq]: req.body.code }
            }
        })
        if (existproducts) {
            return res.status(404).send({ message: "Code telah terdaftar!" })
        }
        const payload = {
            ...req.body,
        };
        const result = await products.create(payload)
        return res.status(200).send({
            status: "success",
            items: result,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.update = async (req, res) => {
    try {
        const result = await products.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
        }
        const onUpdate = await products.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await products.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await products.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}
