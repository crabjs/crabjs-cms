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
    module.roles = {
        title: 'Phân quyền',
        author: 'Hai',
        version: '0.0.1',
        system: false,
        description: 'Quản lý các nhóm quyền của hệ thống',
        group: 0,
        backend_menu: {
            title: 'Quản lý phân quyền',
            icon: 'fa fa-users',
            menu: [
                {
                    title: 'Danh sách quyền',
                    link: `/${__config.admin_prefix}/roles`,
                    ref: 'list_roles'
                }, {
                    title: 'Tạo quyền mới',
                    link: `/${__config.admin_prefix}/roles/create`,
                    ref: 'create_role'
                }
            ]
        }, roles: [
            {
                name: 'list_roles',
                title: 'Xem danh sách'
            }, {
                name: 'update_role',
                title: 'Cập nhật quyền hạn'
            }, {
                name: 'create_role',
                title: 'Tạo mới nhóm quyền'
            }
        ]
    };
    return module;
};
