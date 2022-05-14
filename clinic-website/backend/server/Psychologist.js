let PsychologistTable = require('../tables/Psychologist')
const jwt = require('jsonwebtoken')
const secretKey = 'setayesh_final_project'

let pr = {
    generateJWT: (id) => {
        return jwt.sign({ id: id }, secretKey, { expiresIn: '10d' });
    }
}
let methods = {}

methods.AddPsychologist = (Name, Email, Password, JobTitle, Link, Education, Introduction, callback) => {
    PsychologistTable.findOne({ Email: Email }).lean().exec((err, Psychologist) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (Psychologist) {
                callback(400, 'کاربر تکراری است', Psychologist)
            } else {
                let newPsychologist = new PsychologistTable({
                    Name: Name,
                    Email: Email,
                    JobTitle: JobTitle,
                    Link: Link,
                    Education: Education,
                    Introduction: Introduction,
                    Password: Password
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

methods.login = function (Email, password, callback) {
    PsychologistTable.findOne({ Email: Email }).exec((err, PsychologistRecord) => {
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
                            callback(400, 'رمز اشتباه است', null)
                        }
                    }
                })
            } else {
                callback(400, 'ایمیل شما در سیستم ثبت نشده', null)
            }
        }
    })
}
module.exports = methods