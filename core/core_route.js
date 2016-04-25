/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";
let rand = require('csprng');
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
        failureRedirect: `/${__config.admin_prefix}/login.crab`,
        failureFlash: true,
        successRedirect: `/${__config.admin_prefix}/dashboard`
    }));

    /**
     * Passport strategies ForgotPassword
     * Forgot password account
     */

    app.route(`/${__config.admin_prefix}/forgot_password.crab`).get(function (req, res) {
        loginModule.render(req, res, 'forgot_password');
    }).post(function (req, res) {
        let title = '100dayproject - Khôi phục mật khẩu';
        let token = rand(160, 36);
        let expires = Date.now() + 3600000;
        let email = req.body.email.toLocaleLowerCase().trim();

        __models.Users.findOne({
            email: email,
            status: {$ne: 'Block'}
        }, {email: 1, display_name: 1}, function (err, user) {
            if (err) {
                req.flash('error', 'Có lỗi xảy ra khi thực hiện thay đổi mật khẩu!');
                return res.redirect(`/${__config.admin_prefix}/forgot_password.crab`);
            }
            if (user) {
                user.reset_password_token = token;
                user.reset_password_expires = expires; // 1 hour
                user.save();

                require('fs').readFile(__base + '/resource/email_template/user_forgot_password.crab', 'utf-8', function (err, messages) {
                    messages = messages.replace('{placeholder:user_name}', `${user.display_name}`);
                    if (err) {
                        console.log('Error read message data: ', err);
                    } else {
                        __.send_email(email, title, messages, function (err, re) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(re);
                            }
                        });
                    }
                });
                req.flash('success', "OK. We've sent you an email describing how to reset your password.");
                return res.redirect(`/${__config.admin_prefix}/forgot_password.crab`);
            } else {
                req.flash('error', "No email / password account exists with the provided email.");
                return res.redirect(`/${__config.admin_prefix}/forgot_password.crab`);
            }
        })
    });

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