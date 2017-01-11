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

let Class = new Schema({
    name: {type: String, required: true, trim: true},
    course_name: {type: String, default: ''},
    alias: {type: String, maxlength: 255, trim: true, lowercase: true},
    description: {type: String, default: ''},
    status: {type: Number, default: 0},
    gallery_images: [{type: String, default: []}],
    logs_activity: [{type: String, default: []}],
    start_date: {type: Date, default: null},
    end_date: {type: Date, default: null},
    class_type: {type: Number, default: 1},
    center_id: {type: Schema.Types.ObjectId, ref: 'Centers', default: null},
    customers_id: [{type: Schema.Types.ObjectId, ref: 'Customers', default: []}],
    frequency: {type: Number, default: 2}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'class'
});

module.exports = mongoose.model('Class', Class);