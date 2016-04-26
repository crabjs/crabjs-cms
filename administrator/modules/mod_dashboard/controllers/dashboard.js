/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let services = require('../services'),
    module_name = 'mod_dashboard',
    _module = new __viewRender('backend', module_name),
    formidable = require('formidable');

_module.view = function (req, res) {
    Promise.all([
        __models.Posts.count({key: 'article'}, function (err, re) {
            if (err) {
                __.logger.error(err);
            }
            return re; // Số lượng bài viết
        }),
        __models.Users.count(function (err, re) {
            if (err) {
                __.logger.error(err);
            }
            return re; // Số lượng người dùng
        })
    ]).then(function (statistic) {
        _module.render(req, res, 'index', {
            title: 'Dashboard',
            re: statistic
        })
    });
};

_module.upload = function (req, res) {

    var file_path = '';
    var form = new formidable.IncomingForm();

    form.multiples = true;

    // form.uploadDir = __base + '/public/uploads';

    form.uploadDir = require('path').resolve(__base, '..','media');

    form.on('file', function (field, file) {
        require('fs').rename(file.path, require('path').join(form.uploadDir, file.name));
        file_path = require('path').join(form.uploadDir, file.name);
    });

    console.log('sdfasdf',file_path);

    form.on('error', function (err) {
        if (err) {
            console.log(`An error file upload ${err}`);
            __.logger.error(`An error file upload ${err}`);
        }
    });

    form.on('end', function () {
        res.send({
            status: 200,
            messages: 'success',
            path: file_path
        });
    });

    form.parse(req);
};

module.exports = _module;