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

    /**
     * Passport strategies AdminLogin
     * Check authentication
     */
    app.route(`/${__config.admin_prefix}/login.crab`).get(function (req, res) {
        loginModule.render(req, res, 'login')
    }).post(passport.authenticate('AdminLogin', {
        failureRedirect: `/${__config.admin_prefix}/login`,
        failureFlash: 'Tài khoản hoặc mật khẩu không đúng!',
        successRedirect: `/${__config.admin_prefix}/dashboard`
    }));

    /**
     * Passport strategies ForgotPassword
     * Forgot password account
     */
    app.route(`/${__config.admin_prefix}/forgot_password.crab`).get(function (req, res) {
        loginModule.render(req, res, 'forgot_password');
    }).post(passport.authenticate('ForgotPassword', {
        failureFlash: 'No email/password account exists with the provided email.',
        successFlash: `An e-mail has been sent to you with further instructions.`,
        successRedirect: `/${__config.admin_prefix}/login.crab`
    }));

    /**
     * Sign out account and destroy session
     */
    app.route(`/${__config.admin_prefix}/logout`).get(function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect(`/${__config.admin_prefix}/login.crab`);
    });

    /**
     * Middleware get user account information
     */
    app.get('*', function (req, res, next) {
        res.locals.user = req.user;
        next();
    });

    app.use(`/${__config.admin_prefix}(/)?`, function (req, res, next) {
        if (!req.isAuthenticated() || !req.user) {
            return res.redirect(`/${__config.admin_prefix}/login.crab`);
        }
        next();
    });
};