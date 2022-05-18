let mongoose = require('mongoose')
let schema = mongoose.Schema
let bcrypt = require('bcrypt')

let Psychologist = new schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    jobTitle: {
        type: String
    },
    education: {
        type: String
    },
    link: {
        type: String
    },
    introduction: {
        type: String
    },
    password: {
        type: String
    },
})


Psychologist.pre('save', function (next) {
    let Psychologist = this;
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                return next(err)
            } else {
                bcrypt.hash(Psychologist.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return next(err)
                    } else {
                        Psychologist.password = hash
                        next()
                    }
                })
            }
        })
    } else {
        return next();
    }
})


Psychologist.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        } else {
            return cb(null, isMatch)
        }
    })
}

module.exports = mongoose.model('Psychologist', Psychologist)