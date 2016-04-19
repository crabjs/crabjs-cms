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
    module.system = {
        title: 'Hệ thống',
        author: 'Hai',
        version: '0.0.1',
        description: 'Cấu hình hệ thống',
        backend_menu: {
            title: 'Cấu hình hệ thống',
            icon: 'fa fa-cog',
            menu: [
                {
                    title: 'Cấu hình website',
                    link: `/${__config.admin_prefix}/site/settings`,
                    ref: 'site_settings'
                }, {
                    title: 'Thiết lập SEO',
                    link: `/${__config.admin_prefix}/SEO/settings`,
                    ref: 'seo_plugin_setting'
                }, {
                    title: 'Cài đặt modules',
                    link: `/${__config.admin_prefix}/modules/settings`,
                    ref: 'install_module'
                }
            ]
        }, roles: [
            {
                name: 'site_settings',
                title: 'Cấu hình website'
            }, {
                name: 'install_module',
                title: 'Cài đặt module'
            }
        ]
    };
    return module;
};