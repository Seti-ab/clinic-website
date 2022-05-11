let mongoose = require('mongoose')
let schema = mongoose.Schema
let bcrypt = require('bcrypt')

let Psychologist = new schema({
    Name: {
        type: String,
    },
    Email: {
        type: String
    },
    JobTitle: {
        type: String
    },
    Education: {
        type: String
    },
    Link: {
        type: String
    },
    Introduction: {
        type: String
    },
    Password: {
        type: String
    },
})


Psychologist.pre('save', function (next) {
    let Psychologist = this;
    if (this.isModified('Password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                return next(err)
            } else {
                bcrypt.hash(Psychologist.Password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return next(err)
                    } else {
                        Psychologist.Password = hash
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
    bcrypt.compare(pass, this.Password, (err, isMatch) => {
        if (err) {
            return cb(err)
        } else {
            return cb(null, isMatch)
        }
    })
}

module.exports = mongoose.model('Psychologist', Psychologist)