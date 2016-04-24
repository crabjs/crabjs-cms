/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

module.exports = function (module) {
    module.users = {
        title: 'Quản lý người dùng',
        author: 'Hai',
        version: '0.0.1',
        description: 'Quản lý tài khoản người dùng',
        backend_menu: {
            title: 'Quản lý người dùng',
            icon: 'fa fa-user',
            menu: [
                {
                    title: 'Danh sách tài khoản',
                    link: `/${__config.admin_prefix}/users`,
                    icon: 'fa fa-arrows-h',
                    ref: 'list_users'
                }, {
                    title: 'Tạo tài khoản',
                    link: `/${__config.admin_prefix}/users/create`,
                    ref: 'create_users'
                }
            ]
        }, roles: [
            {
                name: 'list_users',
                title: 'Xem danh sách tài khoản'
            }, {
                name: 'delete_users',
                title: 'Xóa tài khoản'
            }, {
                name: 'create_users',
                title: 'Tạo tài khoản'
            }, {
                name: 'update_users',
                title: 'Cập nhật tài khoản'
            }
        ]
    };
    return module;
};