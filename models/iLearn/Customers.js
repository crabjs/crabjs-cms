/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 * Created by Hai on 11/17/2016.
 */

"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let Customers = new Schema({
    display_name: {type: String},
    parent_name: {type: String},
    date_of_birth: {type: Schema.Types.Date, default: ''},
    address: {type: String, default: ''},
    phone_number: {type: String},
    mobile_number: {type: String},
    email: {type: String, default: ''},
    gender: {type: String, uppercase: true, trim: true, default: ''},
    avatar: {type: String, default: ''},
    age: {type: Number, default: null},
    class_id: [{type: Schema.Types.ObjectId, ref: 'Class'}],
    status: {type: Number, default: 0},
    logs_activity: [{type: String}]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'customers'
});

module.exports = mongoose.model('Customers', Customers);