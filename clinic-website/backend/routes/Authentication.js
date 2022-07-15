let jwt = require('jsonwebtoken');
let secretKey ='sayeh_clinic'
const colleagueTable = require("../tables/colleague");
methods = []

methods.authentication =()=> (req, res, next) => {
    
    if (typeof req.headers.token === 'undefined') {
        res.status(403).send({
            "error": "unautherized"
        });
    } else {
        let token = req.headers.token
        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                res.status(403).send({
                    "error": "unautherized"
                });
            } else {
                colleagueTable.findOne({ _id: decode.id }).exec((err, colleague) => {
                    if (err) {
                        res.status(500).send({
                            error: err
                        })
                    }else if (!colleague) {
                        res.res.status(403).send({
                            "error": "unautherized"
                        });
                    } else {
                        req.colleague=colleague
                        next();
                    }
                })
            }
        })
    }
}

module.exports=methods