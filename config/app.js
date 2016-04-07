/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

module.exports = {
    app: {
        name: 'CrabJS',
        title: "CrabJS! The CMS on NodeJS for their Websites and API Service",
        description: "LifeParser | LifeParser v2 | CrabJS | CMS on NodeJS | 100dayproject",
        keywords: "LifeParser, LifeParser v2, Open source, 100dayproject, CrabJS | CMS on NodeJS",
        language: "en_US"
    },
    admin_prefix: "admin",
    site: {
        port: 1337
    },
    appLayer: {
        frontend: {
            pathView: 'views',

            /**
             * Render_manager use array[0] for loader path error 404, 500 and more.
             * You can fix fix it but note the caption up.
             * Ex: backend.loader[0]
             */
            loader: [
                "themes/frontend/",
                "app/modules/"
            ]
        },
        backend: {
            pathView: 'views',
            loader: [
                "themes/backend/",
                "app/modules/"
            ]
        }
    }
};