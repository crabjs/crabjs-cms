/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'google_analytics',
    _module = new __viewRender(module_name);

_module.list = function (req, res) {
    res.locals.structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'doctor_id',
            width: '15%',
            header: 'Tên bác sỹ',
            type: 'text'
        }
    ];

    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        createButton: {access: true, link: `/${__config.admin_prefix}/${moduleName}/create`, text: ' Thêm bệnh viện'},
        searchButton: {},
        deleteButton: {access: true}
    });

    // Call service web api

    _module.render(req, res, 'index', {
        title: 'Google analytics'
    })
};

module.exports = _module;