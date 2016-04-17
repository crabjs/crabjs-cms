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

router.route('/settings').get(settings.web_settings);
router.route('/modules/install').get(settings.module_install);
router.route('/SEO/settings').get(settings.seo_settings);

module.exports = router;