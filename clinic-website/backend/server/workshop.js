let workshopTable = require('../tables/workshop')


let methods = {}

methods.Add = (Title, date, Time, Link, Lecturer, Introduction, price, callback) => {
    console.log('server');
    let newWorkshop = new workshopTable({
        Title: Title,
        Introduction: Introduction,
        Lecturer: Lecturer,
        Time: Time,
        Link: Link,
        Date: date,
        Price: price
    })
    console.log(newWorkshop);
    newWorkshop.save((err, workshop) => {
        if (err) {
            callback(500, err, null)
        } else {
            callback(null, null, workshop)
        }
    })
}

methods.getlist = (callback) => {
    workshopTable.find().populate('Lecturer', 'Name').lean().exec((err, list) => {
        if (err) {
            callback(500, err)
        } else {
            callback(null, null, list)
        }
    })
}
methods.del = (id, callback) => {
    console.log('server');
    workshopTable.findOneAndRemove({ _id: id }).lean().exec((err, deleted) => {
        if (err) {
            callback(500, err, null)
        } if (deleted) {
            callback(null, null, deleted)
        } else {
            callback(400, 'ورکشاپ مورد نظر یافت نشد', null)
        }
    })
}
module.exports = methods