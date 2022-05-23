let PsychologistTable = require('../tables/Psychologist')
const jwt = require('jsonwebtoken')
const secretKey = 'sayeh_clinic'

let pr = {
    generateJWT: (id) => {
        return jwt.sign({ id: id }, secretKey, { expiresIn: '10d' });
    }
}
let methods = {}

methods.AddPsychologist = (name, email, password, jobTitle, link, education, introduction, callback) => {
    PsychologistTable.findOne({ email: email }).lean().exec((err, Psychologist) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (Psychologist) {
                callback(400, 'کاربر تکراری است', Psychologist)
            } else {
                let newPsychologist = new PsychologistTable({
                    name: name,
                    email: email,
                    jobTitle: jobTitle,
                    link: link,
                    education: education,
                    introduction: introduction,
                    password: password
                })

                newPsychologist.save((err, Psychologist) => {
                    if (err) {
                        callback(500, err, null)
                    } else {
                        callback(null, null, Psychologist)
                    }
                })
            }
        }
    })
}


methods.getPsychologist = (callback) => {
    PsychologistTable.find().lean().exec((err, Psychologists) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (!Psychologists) {
                callback(400, 'کاربری یافت نشد'.null)
            } else {
                callback(null, null, Psychologists)
            }
        }
    })
}

methods.login = function (email, password, callback) {
    PsychologistTable.findOne({ email: email }).exec((err, PsychologistRecord) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (PsychologistRecord) {
                PsychologistRecord.comparePassword(password, (err, success) => {
                    if (err) {
                        callback(500, err, null)
                    } else {
                        if (success) {
                            let token = pr.generateJWT(PsychologistRecord.id)
                            callback(null, null, PsychologistRecord, token)
                        } else {
                            callback(400, 'رمز عبور وارد شده صحیح نمی باشد.', null)
                        }
                    }
                })
            } else {
                callback(400, 'ایمیل در سیستم ثبت نشده است.', null)
            }
        }
    })
}
module.exports = methods