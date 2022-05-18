let express = require('express')
let router = express.Router()
let PsychologistSrvices = require('../server/Psychologist')
// let pr = {
//     validateEmail: (elementValue) => {
//         var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailPattern.test(elementValue);
//     }
// }

router.post('/add', (req, res) => {
    if (typeof req.body.name === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.jobTitle === 'undefined' || typeof req.body.link === 'undefined') {
        res.status(400).send({
            success: false,
            error: "لطفا فیلدهای لازم را تکمیل کنید."
        })
    } else {
        // if (pr.validateEmail(req.body.Email)) {
            //server
            PsychologistSrvices.AddPsychologist(req.body.name, req.body.email, req.body.password, req.body.jobTitle, req.body.link, req.body.education, req.body.introduction, (errorcode, errortext, info) => {
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
        // } else {
        //     res.status(400).send({
        //         done: false,
        //         error: 'ایمیل وارد شده اشتباه است'
        //     })
        // }

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
    if (typeof req.body.email === 'undefined' || typeof req.body.password === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        //if (pr.validateEmail(req.body.Email)) {
            PsychologistSrvices.login(req.body.email, req.body.password, (errorcode, errortext
                , Psychologist, token) => {
                if (errorcode) {
                    res.status(errorcode).send({
                        success: false,
                        error: errortext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        Psychologist:Psychologist.name,
                        token: token
                    })
                }
            })
        // } else {
        //     res.status(400).send({
        //         done: false,
        //         error: 'ایمیل وارد شده اشتباه است'
        //     })
        // }
    }
})
module.exports = router
