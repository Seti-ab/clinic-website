const { log } = require('debug/src/browser')
let express = require('express')
let router = express.Router()
let workshopServices = require('../server/workshop')
const workshop = require('../tables/workshop')
// typeof req.body.Email === 'undefined' ||

let auth = require('./Authentication').authentication()

router.post('/add', auth, (req, res) => {
    if (typeof req.body.title === 'undefined' || typeof req.body.date === 'undefined' || typeof req.body.time === 'undefined' || typeof req.body.link === 'undefined' || typeof req.body.introduction === 'undefined' || typeof req.body.image === 'undefined' || typeof req.body.price === 'undefined') {
        res.status(400).send({
            success: false,
            error: "missing data"
        })
    } else {
        console.log(req.colleague)
        workshopServices.Add(req.body.title, req.body.date, req.body.time, req.body.link, req.colleague._id, req.body.introduction, req.body.price, req.body.image, (errorcode, errortext, workshop) => {
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