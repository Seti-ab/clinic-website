let PsychologistTable = require('./tables/Psychologist')

let methods = {}

methods.initial = (callback) => {
    PsychologistTable.findOne({ _id: "999999999999999999999999" }).exec((err, admin) => {
        if (err) {
            callback(500, err)
        } else {
            console.log(admin);
            if (admin ===null) {
                let Psychologist = new PsychologistTable({
                    _id: "999999999999999999999999",
                    name: 'ستایش ابویی',
                    email: "setayesh.ab1998@gmail.com",
                    jobTitle: 'ادمین سایت',
                    education: 'کارشناسی مهندسی کامپیوتر گرایش نرم افزار',
                    password: '123',
                    introduction:'Front-End Developer در شرکت بامداد تک ، دانش آموخته دانشگاه علم و فرهنگ تهران',
                    link:'admin'
                })

                Psychologist.save((err) => {
                    if (err) {
                        console.log(err);
                        callback(501, err)
                    } else {
                        callback(null, 'added')
                    }
                })
            }else{
                callback(null,'alredy added')
            }
        }
    })

}

module.exports = methods.initial