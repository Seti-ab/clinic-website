let express = require('express')
let router = express.Router()
let PsychologistSrvices = require('../server/Psychologist')
let pr = {
    validateEmail: (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }
}

router.post('/Add', (req, res) => {
    if (typeof req.body.Name === 'undefined' || typeof req.body.Email === 'undefined' ||
        typeof req.body.Password === 'undefined' || typeof req.body.JobTitle === 'undefined' ||
        typeof req.body.Link === 'undefined' || typeof req.body.Education === 'undefined' || typeof req.body.Introduction === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        if (pr.validateEmail(req.body.Email)) {
            //server
            PsychologistSrvices.AddPsychologist(req.body.Name, req.body.Email, req.body.Password, req.body.JobTitle
                , req.body.Link, req.body.Education, req.body.Introduction, (errorcode, errortext, info) => {
                    if (errorcode) {
                        res.status(errorcode).send({
                            success: false,
                            errortext: errortext,
                            duplicated: info
                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            Psychologist: info
                        })
                    }
                })
            // res.status(200).send({
            //     done:true
            // })
        } else {
            res.status(400).send({
                done: false,
                error: 'ایمیل وارد شده اشتباه است'
            })
        }

    }
})

router.get('/getlist', (req, res) => {
    PsychologistSrvices.getPsychologist((errorcode, errortext, list) => {
        if (errorcode) {
            res.status(errorcode).send({
                success: false,
                errortext: errortext
            })
        } else {
            res.status(200).send({
                success: true,
                list: list
            })
        }
    })
})

router.post('/login', (req, res) => {
    if (typeof req.body.Email === 'undefined' || typeof req.body.Password === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        if (pr.validateEmail(req.body.Email)) {
            PsychologistSrvices.login(req.body.Email, req.body.Password, (errorcode, errortext
                , Psychologist, token) => {
                if (errorcode) {
                    res.status(errorcode).send({
                        success: false,
                        error: errortext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        Psychologist:Psychologist.Name,
                        token: token
                    })
                }
            })
        } else {
            res.status(400).send({
                done: false,
                error: 'ایمیل وارد شده اشتباه است'
            })
        }
    }
})
module.exports = router
