/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let passport = require('passport'),
    loginModule = new __viewRender('backend', 'mod_auth');

module.exports = function (app) {

    app.route(`/${__config.admin_prefix}/login`).get(function (req, res) {
        loginModule.render(req, res, 'login')
    }).post(passport.authenticate('adminLogin', {
        failureRedirect: `/${__config.admin_prefix}/login`,
        failureFlash: 'Tài khoản hoặc mật khẩu không đúng!',
        successRedirect: `/${__config.admin_prefix}/dashboard`
    }));

    app.route(`/${__config.admin_prefix}/logout`).get(function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect(`/${__config.admin_prefix}/login`);
    });


    app.get('*', function (req, res, next) {
        res.locals.user = req.user;
        next();
    });

    if (__config.authentication) {
        app.use(`/${__config.admin_prefix}(/)?`, function (req, res, next) {
            if (!req.isAuthenticated() || !req.user) {
                return res.redirect(`/${__config.admin_prefix}/login`);
            }
            next();
        });
    }
};