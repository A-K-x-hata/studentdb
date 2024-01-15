const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollno: String,
    name: String,
    degree: String, // Use lowercase 'degree'
    city: String,   // Use lowercase 'city'
});

module.exports = mongoose.model('Student', studentSchema);
