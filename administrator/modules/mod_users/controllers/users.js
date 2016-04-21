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
    module_name = 'mod_users',
    _module = new __viewRender('backend', module_name);

_module.list = function (req, res) {

    let structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'display_name',
            width: '22%',
            header: 'Họ tên'
        }, {
            column: 'email',
            width: '22%',
            header: 'Email'
        }, {
            column: 'type',
            width: '20%',
            header: 'Loại tài khoản',
            type: {
                name: 'select',
                values: {
                    '0': 'Quản trị',
                    '-1': 'Người dùng'
                }
            }
        }, {
            column: 'last_login_date',
            width: '20%',
            header: 'Đăng nhập',
            type: 'date-range',
            buttonClass: 'fa fa-calendar'
        }, {
            column: 'status',
            width: '13%',
            header: 'Trạng thái',
            type: {
                name: 'select',
                values: {
                    'Available': 'Kích hoạt',
                    'Block': 'Khóa',
                    'Pending': 'Chờ kích hoạt'
                }
            }
        }
    ];

    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/users`},
        createButton: {access: true, link: `/${__config.admin_prefix}/users/create`, text: ' Tạo tài khoản'},
        searchButton: {},
        deleteButton: {access: true} // isAllow
    });

    res.locals.tableColumns = structure;

    let cond = __.verifyCondition(req.query, {
        display_name: 'string',
        email: 'string',
        type: 'boolean',
        last_login_date: 'date',
        status: 'boolean'
    });

    __models.Users.find(cond).sort({
        created_at: -1
    }).exec(function (err, users) {

        if (err) {
            __.logger.error(err);
            req.flash('danger', 'Có lỗi xảy ra khi truy cập danh sách người dùng!');
            return res.redirect(`/${__config.admin_prefix}/dashboard`);
        }
        _module.render(req, res, 'index', {
            title: 'Quản lý người dùng',
            toolbar: toolbar.render(),
            users: users
        })
    });
};

_module.delete = function (req, res) {
    __models.Users.remove({_id: {$in: req.body.ids}})
        .exec(function (err) {
            if (err) {
                __.logger.error(err);
                req.flash('danger', 'Có lỗi xảy ra khi thực hiện xóa thông tin người dùng!');
                res.sendStatus(200);
            } else {
                req.flash('success', 'Xóa tài khoản thành công!');
                res.sendStatus(200);
            }
        })
};


module.exports = _module;