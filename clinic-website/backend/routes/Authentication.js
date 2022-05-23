let jwt = require('jsonwebtoken');
let secretKey ='sayeh_clinic'
const PsychologistTable = require("../tables/Psychologist");
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
                PsychologistTable.findOne({ _id: decode.id }).exec((err, Psychologist) => {
                    if (err) {
                        res.status(500).send({
                            error: err
                        })
                    }else if (!Psychologist) {
                        res.res.status(403).send({
                            "error": "unautherized"
                        });
                    } else {
                        req.Psychologist=Psychologist
                        next();
                    }
                })
            }
        })
    }
}

module.exports=methods