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
let users = require('./controllers/users');

router.route('/users/create').get(__.isAllow('create_users'), users.create).post(__.isAllow('create_users'), users.created);
router.route('/users').get(__.isAllow('list_users'), users.list).delete(__.isAllow('delete_users'), users.delete);
router.route('/users/view/:id').get(__.isAllow('update_users'), users.view).post(__.isAllow('update_users'), users.update);
router.route('/users/change_pass').post(users.change_pass);

module.exports = router;