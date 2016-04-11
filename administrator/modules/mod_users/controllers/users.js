/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let services = require('../services'),
    module_name = 'mod_users',
    _module = new __viewRender('backend', module_name);

_module.list = function (req, res) {

};

_module.addUser = function (req, res) {
    services.addUser({
        email: 'hailp@novaon.vn',
        password: 'social',
        displayName: 'Vietworm',
        status: 'Pending'
    }, function (err, re) {
        console.log(err, re);
    })
};