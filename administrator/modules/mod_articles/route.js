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

router.route('/posts').get(__.isAllow('list_posts'), articles.list).delete(__.isAllow('delete_posts', articles.delete));

router.route('/posts/create').get(__.isAllow('create_posts'), articles.create).post(__.isAllow('create_posts', articles.created));
router.route('/posts/view/:id').get(__.isAllow('update_posts'), articles.view).post(__.isAllow('update_posts'), articles.update);

module.exports = router;