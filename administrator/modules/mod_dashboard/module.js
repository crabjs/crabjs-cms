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
    module.google_analytics = {
        title: 'Google analytics',
        author: 'Hai',
        version: '0.0.1',
        description: 'Google analytics page views',
        menus: {
            title: 'Google analytics',
            icon: '',
            background: '#5f5f5f',
            items: [
                {
                    permissions: [{
                        social: ['seo_prof'] // if user has permission from <social> module then access it.
                    }, 'view_ga_today'],
                    title: 'Page view today',
                    link: '/ga/today'
                }, {
                    permissions: ['index', 'view_ga_today'],
                    title: 'Page view weekly',
                    link: '/ga/weekly'
                }
            ]
        }

    }
};