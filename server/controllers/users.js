//get model
//requires mongoose
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = mongoose.model('User');

class UsersController {
    dashboard(req, res){
        if(!req.session.user_id){
            return res.redirect('/');
        }
        res.render('dashboard', { session: req.session })   
    }
    homepage(req, res){
        return res.render('index');
    }
    create(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, user) => {
            if(err){
                // console.log(err);
                // return res.redirect('/');
                return res.json(err);
            }
            req.session.user_id = user._id;
            return res.redirect('/dashboard');
        })    
    }
    authenticate(req, res){
        User.findOne({ email: req.body.email }, (err, user) => {
            if(err){
                return res.redirect('/')
            }
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                req.session.user_id = user._id;
                // return res.json(user); 
                return res.redirect('/dashboard')
            }
            //if email blank and password blank redirect to homepage 
            // return res.redirect('/')
        })
    }
    isLoggedIn(req, res){
        if(req.session.user_id){
            //for angular
            return res.json({
                'status': true
            })
            //if using ejs
            //return res.redirect()
        } else {
            //if using ejs
            //redirect to login page

            //if using Angular
            return res.json({
                'status': false
            })
        }
    }
    logout(req, res){
        delete req.session.user_id;
        // delete this.req.session.user_id;
        // req.session = null;
        return res.redirect('/');
        //if using Angular 
        // return res.json({
        //     'status: true'
        // })
    }
}

module.exports = new UsersController();