/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_roles',
    _module = new __viewRender('backend', module_name);

_module.create = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/roles`},
        saveButton: {access: true}
    });

    var listModuleExtends = {};
    __.getGlobbedFiles(__base + `/administrator/modules/*/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    let modules = [];

    for (let md in listModuleExtends) {
        if (listModuleExtends.hasOwnProperty(md)) {
            if (listModuleExtends[md].roles) {
                modules.push(listModuleExtends[md]);
            }
        }
    }

    _module.render(req, res, 'view', {
        title: 'Tạo nhóm quyền mới',
        toolbar: toolbar.render(),
        modules: modules
    });
};

_module.list = function (req, res) {

    let structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'role_name',
            width: '25%',
            header: 'Tên nhóm quyền'
        }, {
            column: 'created_by',
            width: '15%',
            header: 'Người tạo'
        }, {
            column: 'created_date',
            width: '15%',
            header: 'Ngày tạo',
            type: 'date-range',
            buttonClass: 'fa fa-calendar'
        }, {
            column: 'status',
            width: '15%',
            header: 'Trạng thái'
        }
    ];
    /**
     * Toolbar call and render element
     * Access authentication call isAllow for check permission
     */
    let toolbar = new __.Toolbar();
    toolbar.custom({
        createButton: {access: true, link: `/${__config.admin_prefix}/roles/create`},
        refreshButton: {link: `/${__config.admin_prefix}/roles`},
        searchButton: {},
        deleteButton: {access: true} // isAllow
    });
    res.locals.tableColumns = structure;

    _module.render(req, res, 'index', {
        title: 'Danh sách quyền',
        toolbar: toolbar.render()
    })
};

_module.view = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/roles`},
        saveButton: {access: true}
    });

    _module.render(req, res, 'view', {
        title: 'Danh sách quyền',
        toolbar: toolbar.render()
    });
};

module.exports = _module;