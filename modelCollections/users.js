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
    Schema = new mongoose.Schema;

let UserSchema = new Schema({
    full_name: {type: String},
    birthday: {type: Date},
    address: {type: String},
    email: {type: String},
    password: {type: String},
    salt: {type: String},
    token: {type: String},
    image: {type: String},
    gender: {type: Number},
    phone_number: {type: String},
    followed_topics: [
        {type: Schema.Types.ObjectId, ref: 'Topics', default: []}
    ],
    created_date: {type: Date, default: Date.now}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'users'
});

module.exports = mongoose.model('Users', UserSchema);