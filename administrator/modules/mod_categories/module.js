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
    module.categories = {
        title: 'Danh mục',
        author: 'Hai',
        version: '0.0.1',
        description: 'Quản lý danh mục bài viết',
        backend_menu: {
            title: 'Danh mục bài viết',
            icon: 'fa fa-tags',
            link: `/${__config.admin_prefix}/categories`,
            ref: 'view_category'
        }, roles: [
            {
                name: 'list_category',
                title: 'Xem tất cả danh mục'
            }, {
                name: 'delete_category',
                title: 'Xóa danh mục'
            }, {
                name: 'create_category',
                title: 'Tạo mới danh mục'
            }, {
                name: 'update_category',
                title: 'Cập nhật danh mục'
            }
        ]
    };
    return module;
};