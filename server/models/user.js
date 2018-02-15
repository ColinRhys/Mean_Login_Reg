const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name cannot be blank']
    },
    lastName: {
        type: String,
        required: [true, 'Last name cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
}, { timestamps: true });

// UserSchema.pre('save', (next) => {
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
//     next();
// })

UserSchema.methods.authenticate = function(password){
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);