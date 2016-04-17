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
    module_name = 'mod_system',
    _module = new __viewRender('backend', module_name);

_module.web_settings = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/site/settings`},
        saveButton: {access: true, link: `#`, text: ' Lưu lại'}
    });
    _module.render(req, res, 'web_settings', {
        title: 'Settings',
        toolbar: toolbar.render()
    })
};

_module.module_install = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/modules/settings`},
        createButton: {access: true, link: `#`, text: ' Thêm module'}
    });

    let moduleIgnore = '' || '*';
    let listModuleExtends = {};
    __.getGlobbedFiles(__base + `app/modules/${moduleIgnore}/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    _module.render(req, res, 'module_install', {
        title: 'Cài đặt modules',
        toolbar: toolbar.render(),
        modules: listModuleExtends
    })
};

_module.seo_settings = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/seo/settings`},
        createButton: {access: true, link: `#`, text: ' Thêm module'}
    });

    _module.render(req, res, 'module_install', {
        title: 'Cấu hình Search Engine Optimization',
        toolbar: toolbar.render()
    })
};

module.exports = _module;