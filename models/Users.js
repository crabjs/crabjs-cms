/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let mongoose = require('mongoose'),
    Schema = require('mongoose').Schema,
    bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
let userSchema = new Schema({
    email: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    avatar: {type: Schema.Types.String},
    token: {type: Schema.Types.String, required: true},
    display_name: {type: Schema.Types.String, required: true},
    last_login_date: {type: Schema.Types.Date, default: Date.now},
    rules: {type: Schema.Types.Mixed, default: {}},
    settings: {type: Schema.Types.Mixed, default: {}},
    status: {type: Schema.Types.String, enum: ['Available', 'Block', 'Pending']},
    created_date: {type: Schema.Types.Date, default: Date.now},
    roles: {type: Schema.Types.ObjectId, ref: 'objects'},
    type: {type: Schema.Types.Number, enum: [0, -1]}
});

// userSchema.pre('save', function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();
//
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
//     next();
// });

userSchema.static('generateHash', function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function (password) {
    if (this.password.split('$').length === 4) {
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};

module.exports = mongoose.model('Users', userSchema);