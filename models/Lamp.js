'use strict'
const { Schema, model } = require('mongoose')

const schema = new Schema({
    lampId: { type: String, required: true, unique: true },
    lampType: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    list: { staticMode: [{ label: String, value: Number }], dinMode: [{ label: String, value: Number }] } 
})

module.exports = model('Lamp', schema)