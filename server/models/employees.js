const mongoose = require('mongoose');

var Elyschema = new mongoose.Schema({
    employee_id: String,
    name: String,
    gender: String,
    title: String,
    content: String,
    updated_at: Date
});

var employees = mongoose.model('Employee', Elyschema);

module.exports = employees;