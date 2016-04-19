/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";
let express = require('express'),
    router = express.Router();
let articles = require('./controllers/articles');

router.route('/posts').get(articles.list).delete(articles.delete);

router.route('/posts/create').get(articles.create).post(articles.created);
router.route('/posts/view/:id').get(articles.view).post(articles.update);
router.route('/upload').post(articles.upload);

module.exports = router;