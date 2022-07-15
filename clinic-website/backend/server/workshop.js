let workshopTable = require('../tables/workshop')


let methods = {}

methods.Add = (title, date, time, link, lecturer, introduction, price, image, callback) => {
    
    let newWorkshop = new workshopTable({
        title: title,
        introduction: introduction,
        lecturer: lecturer,
        time: time,
        link: link,
        date: date,
        price: price,
        image:image
    })
    newWorkshop.save((err, workshop) => {
        if (err) {
            callback(500, err, null)
        } else {
            callback(null, null, workshop)
        }
    })
}

methods.getAllList = (callback) => {
    workshopTable.find().populate('lecturer', 'name').lean().exec((err, list) => {
        if (err) {
            callback(500, err)
        } else {
            callback(null, null, list)
        }
    })
}

methods.delete = (id, callback) => {
    workshopTable.findOneAndRemove({ _id: id }).lean().exec((err, deleted) => {
        if (err) {
            callback(500, err, null)
        } if (deleted) {
            callback(null, null, deleted)
        } else {
            callback(400, 'workshop not found', null)
        }
    })
}
module.exports = methods