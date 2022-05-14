const { log } = require('debug/src/browser')
let express = require('express')
let router = express.Router()
let workshopServices = require('../server/workshop')
const workshop = require('../tables/workshop')
// typeof req.body.Email === 'undefined' ||

let auth = require('./Authentication').authentication()

router.post('/add', auth, (req, res) => {
    if (typeof req.body.Title === 'undefined' || typeof req.body.Date === 'undefined' || typeof req.body.Time === 'undefined' ||
        typeof req.body.Link === 'undefined' || typeof req.body.Introduction === 'undefined'
        || typeof req.body.Price === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        console.log(req.Psychologist)
        workshopServices.Add(req.body.Title, req.body.Date, req.body.Time, req.body.Link, req.Psychologist._id, req.body.Introduction,
            req.body.Price, (errorcode, errortext, workshop) => {
                if (errorcode) {
                    res.status(errorcode).send({
                        success: false,
                        error: errortext
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        workshop: workshop
                    })
                }
            })
        // res.status(200).send({ success: true })
    }
})
// router.get('/get',auth, (req, res) => {
//     workshopServices.getlist((errorcode, errortext, list) => {
//         if (errorcode) {
//             res.status(errorcode).send({
//                 success: false,
//                 error: errortext
//             })
//         } else {
//             res.status(200).send({
//                 success: true,
//                 workshops: list
//             })
//         }
//     })
// })

router.get('/getall', (req, res) => {
    workshopServices.getAllList((errorcode, errortext, list) => {
        if (errorcode) {
            res.status(errorcode).send({
                success: false,
                error: errortext
            })
        } else {
            res.status(200).send({
                success: true,
                workshops: list
            })
        }
    })
})

router.post('/delete', auth, (req, res) => {
    if (typeof req.body._id === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        console.log('else');
        workshopServices.del(req.body._id, (errorcode, errortext, deletedWorkshop) => {
            if (errorcode) {
                res.status(errorcode).send({
                    success: false,
                    error: errortext
                })
            } else {
                res.status(200).send({
                    success: true,
                    deletedWorkshop: deletedWorkshop
                })
            }
        })
    }
})
module.exports = router