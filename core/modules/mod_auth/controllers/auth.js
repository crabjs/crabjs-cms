/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'auth',
    passport = require('passport'),
    _module = new __viewRender(module_name);


_module.login = function (req, res) {
    _module.render(req, res, '_login');
};

_module.logged = passport.authentication('adminLogin', {
    failureRedirect: `/${__config.admin_prefix}/login`,
    failureFlash: 'Tài khoản hoặc mật khẩu không đúng!',
    successRedirect: `/${__config.admin_prefix}/dashboard`
});

_module.logout = function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect(`/${__config.admin_prefix}/login`);
};

_module.middleware = function (req, res, next) {
    res.locals.user = req.user || null;
    next();
};

module.exports = _module;