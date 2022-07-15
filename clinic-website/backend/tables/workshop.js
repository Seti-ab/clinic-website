let mongoose = require('mongoose')
let schema = mongoose.Schema

let workshop = new schema({
    title: {
        type: String,
    },
    introduction: {
        type: String
    },
    lecturer: {
        type: mongoose.Types.ObjectId,
        ref: 'colleague'
    },
    time: {
        type: String
    },
    link: {
        type: String
    },
    date: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model('workshop', workshop)
