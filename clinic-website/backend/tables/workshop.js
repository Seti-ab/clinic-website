let mongoose = require('mongoose')
let schema = mongoose.Schema

let workshop = new schema({
    Title: {
        type: String,
    },
    Introduction: {
        type: String
    },
    date: {
        type: String
    },
    Lecturer: {
        type: mongoose.Types.ObjectId,
        ref: 'Psychologist'
    },
    Time: {
        type: String
    },
    Link: {
        type: String
    },
    Date: {
        type: String
    },
    Price: {
        type: String
    },
    Image: {
        type: String
    }
})
module.exports = mongoose.model('workshop', workshop)
