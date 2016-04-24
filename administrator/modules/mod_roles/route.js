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
let roles = require('./controllers/roles');

router.route('/roles').get(__.isAllow('list_roles'),roles.list).delete(__.isAllow('delete_roles', roles.delete));
router.route('/roles/create').get(__.isAllow('create_roles'), roles.create).post(__.isAllow('create_roles'), roles.created);
router.route('/roles/view/:id').get(__.isAllow('update_roles'), roles.view).post(__.isAllow('update_roles'), roles.update);

module.exports = router;