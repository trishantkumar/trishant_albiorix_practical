const User = require('../models/user.model.js');
const mongoose = require('mongoose');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.user_create = function (req, res) {
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            res.status(500).json({
                error:"Email already exists"
            })
            // res.send({msg: 'Email already exists'});
        } else {
            let user = new User(
                {
                    _id: new mongoose.Types.ObjectId,
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    dob: req.body.dob,
                }
            );
            user.save()
                .then(() => {
                res.status(200).json({
                    msg: "User Created successfully"
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error:err
                })
            });
        }
    })
};

exports.fetch_user = function (req, res) {
    User.find().then(result=>{
        result = result.sort((date1, date2) => date2.updatedAt - date1.updatedAt)
        res.status(200).json({
            users: result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.remove_user = function (req, res) {
    User.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({
            message: 'Delete Success'
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}

exports.edit_user = function (req, res) {
    User.findByIdAndUpdate({_id:req.params.id}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
        }
    }).then(() => {
        res.status(200).json({
            msg: "Updated Successfully!"
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}
