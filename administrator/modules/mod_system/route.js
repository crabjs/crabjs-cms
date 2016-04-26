/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

"use strict";
let express = require('express'),
    router = express.Router();
let settings = require('./controllers/settings');

router.route('/settings')
    .get(__.isAllow('site_settings'), settings.web_settings)
    .post(__.isAllow('site_settings'), settings.web_settings_update);

router.route('/modules/install')
    .get(__.isAllow('install_module'), settings.module_install);

router.route('/system/report').get(settings.report);

module.exports = router;