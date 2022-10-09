const router = require('express').Router();
const User = require('../models/User');

// router.get('/', (req, res) =>
//         User.find({}, (err, users) => 
//             res.send(users.reduce((userMap, item) => {
//                 userMap[item] = item
//                 return userMap
//             }, {}))
//         )
// )

router.get('/', (req, res) =>
        User.find({}, { _id : 1, name : 1 }, function (err, data) {
            // res.send(users.reduce((userMap, item) => {
            //     userMap[item] = item
            //     return userMap
            // }, {}))
            return res.status(200).json(data)
        }
    )
)

module.exports = router