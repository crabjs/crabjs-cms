/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_home',
    _module = new __viewRender(module_name),
    Promise = require('bluebird');

_module.index = function (req, res) {

    Promise.all([
        __models.Objects.findOne({key: 'seo:settings'}, function (err, meta) {
            return meta;
        }),
        __models.Posts.findOne({tags: 'page_index', status: 0},{title: 1, description: 1, content: 1, image: 1}, function (err, data) {
            return data;
        })
    ]).then(function (results) {
        _module.render(req, res, 'index', {
            title: results[0].site_title,
            meta: results[0],
            info: results[1]
        });
    }).catch(function(error){
        __.logger.error(error);
        return _module.render_error(req, res, '500');
    });
};

_module.home = function (req, res) {
    _module.render(req, res, 'home', {
        title: 'Blog of the 100dayproject'
    })
};

module.exports = _module;