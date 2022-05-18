let workshopTable = require('../tables/workshop')


let methods = {}

methods.Add = (title, date, time, link, lecturer, introduction, price, image, callback) => {
    console.log('server');
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
    console.log(newWorkshop);
    newWorkshop.save((err, workshop) => {
        if (err) {
            callback(500, err, null)
        } else {
            callback(null, null, workshop)
        }
    })
}

// methods.getlist = (callback) => {
//     workshopTable.find().populate('Lecturer', 'Name').lean().exec((err, list) => {
//         if (err) {
//             callback(500, err)
//         } else {
//             callback(null, null, list)
//         }
//     })
// }

methods.getAllList = (callback) => {
    workshopTable.find().populate('lecturer', 'name').lean().exec((err, list) => {
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