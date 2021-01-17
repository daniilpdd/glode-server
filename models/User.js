'use strict'
const { Schema, model } = require('mongoose')

const schema = new Schema({
    login: { type: String, required: true, unique: true },
    pass: { type: String, required: true }
})

module.exports = model('User', schema)