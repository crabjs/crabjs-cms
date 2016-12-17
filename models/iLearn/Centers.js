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

let Centers = new Schema({
    name: {type: String, required: true, trim: true},
    alias: {type: String, maxlength: 255, trim: true, lowercase: true},
    description: {type: String, default: ''},
    status: {type: Number, default: 0},
    avatar: {type: String, default: ''},
    gallery_images: [{type: String, default: []}],
    address: {type: String},
    logs_activity: [{type: String}]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'centers'
});

module.exports = mongoose.model('Centers', Centers);
 
