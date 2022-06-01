let colleagueTable = require('../tables/colleague')
const jwt = require('jsonwebtoken')
const secretKey = 'sayeh_clinic'

let pr = {
    generateJWT: (id) => {
        return jwt.sign({ id: id }, secretKey, { expiresIn: '10d' });
    }
}
let methods = {}

methods.AddColleague = (name, email, password, jobTitle, link, education, introduction, callback) => {
    colleagueTable.findOne({ email: email }).lean().exec((err, colleague) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (colleague) {
                callback(400, 'کاربر تکراری است', colleague)
            } else {
                let newColleague = new colleagueTable({
                    name: name,
                    email: email,
                    jobTitle: jobTitle,
                    link: link,
                    education: education,
                    introduction: introduction,
                    password: password
                })

                newColleague.save((err, colleague) => {
                    if (err) {
                        callback(500, err, null)
                    } else {
                        callback(null, null, colleague)
                    }
                })
            }
        }
    })
}


methods.getcolleague = (callback) => {
    colleagueTable.find().lean().exec((err, colleagues) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (!colleagues) {
                callback(400, 'کاربری یافت نشد'.null)
            } else {
                callback(null, null, colleagues)
            }
        }
    })
}

methods.login = function (email, password, callback) {
    colleagueTable.findOne({ email: email }).exec((err, colleagueRecord) => {
        if (err) {
            callback(500, err, null)
        } else {
            if (colleagueRecord) {
                colleagueRecord.comparePassword(password, (err, success) => {
                    if (err) {
                        callback(500, err, null)
                    } else {
                        if (success) {
                            let token = pr.generateJWT(colleagueRecord.id)
                            callback(null, null, colleagueRecord, token)
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