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
    Schema = mongoose.Schema;

let AdsProduct = new Schema({
    ads_type: {type: String, default: 'ADS_PRODUCT'},
    intro_text: {type: String, default: ''},
    images: [{
        url: {type: String, default: ''},
        description: {type: String, default: ''}
    }],
    website: {type: String, default: ''},
    company_id: {type: Schema.Types.ObjectId, ref: 'Company', default: null},
    follow_id: {type: Schema.Types.ObjectId, ref: 'UserDefault', default: null},
    location: [{
        lat: {type: Number, default: 0},
        lng: {type: Number, default: 0}
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }, collection: 'ads'
});


module.exports = mongoose.model('AdsProduct', AdsProduct);