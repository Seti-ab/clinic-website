let colleagueTable = require('./tables/colleague')

let methods = {}

methods.initial = (callback) => {
    colleagueTable.findOne({ _id: "999999999999999999999999" }).exec((err, admin) => {
        if (err) {
            callback(500, err)
        } else {
            if (admin ===null) {
                let colleague = new colleagueTable({
                    _id: "999999999999999999999999",
                    name: 'ستایش ابویی',
                    email: "setayesh.ab1998@gmail.com",
                    jobTitle: 'مدیر کلینیک',
                    education: 'کارشناسی مهندسی کامپیوتر گرایش نرم افزار',
                    password: '123',
                    introduction:'Front-End Developer در شرکت بامداد تک ، دانش آموخته دانشگاه علم و فرهنگ تهران',
                    link:'admin'
                })

                colleague.save((err) => {
                    if (err) {
                        console.log(err);
                        callback(501, err)
                    } else {
                        callback(null, 'added')
                    }
                })
            }else{
                callback(null,'already added')
            }
        }
    })

}

module.exports = methods.initial