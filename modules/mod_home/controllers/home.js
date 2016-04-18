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
    _module = new __viewRender(module_name);

_module.index = function (req, res) {

    __models.Objects.findOne({key: 'seo:settings'}, function (err, meta) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        _module.render(req, res, 'index', {
            title: meta.site_title,
            meta: meta
        });
    });
};

_module.home = function (req, res) {
    _module.render(req, res, 'home', {
        title: 'Blog of the 100dayproject'
    })
};

module.exports = _module;