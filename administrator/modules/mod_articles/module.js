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
    module.articles = {
        title: 'Bài viết',
        author: 'Hai',
        version: '0.0.1',
        description: 'Quản lý bài viết',
        backend_menu: {
            title: 'Bài viết',
            icon: 'fa fa-newspaper-o',
            menu: [
                {
                    title: 'Danh sách bài viết',
                    link: `/${__config.admin_prefix}/posts`,
                    icon: 'fa fa-arrows-h',
                    ref: 'list_posts'
                }, {
                    title: 'Viết bài mới',
                    link: `/${__config.admin_prefix}/posts/create`,
                    ref: 'create_posts'
                }
            ]
        }, roles: [
            {
                name: 'list_posts',
                title: 'Xem tất cả bài viết'
            }, {
                name: 'delete_posts',
                title: 'Xóa bài viết'
            }, {
                name: 'create_posts',
                title: 'Tạo mới bài viết'
            }, {
                name: 'update_posts',
                title: 'Cập nhật bài viết'
            }
        ]
    };
    return module;
};
