/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let LocalStrategy = require('passport-local').Strategy,
    randToken = require('rand-token');

module.exports = function (passport) {

    passport.use('AdminLogin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            __models.Users.findOne({
                email: email,
                type: 0,
                status: 'Available'
            }, function (err, user) {
                if (err) {
                    return done(err);
                } else if (user) {
                    if (user.validPassword(password)) {
                        __models.Users.findByIdAndUpdate(user.id, {
                            last_login_date: Date.now()
                        }).exec(function (err) {
                            if (err) {
                                __.logger.error(err);
                                return done(null, false, {message: 'Connect server error!'});
                            }
                        });
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Oops! Invalid login credentials.'});
                    }
                } else {
                    return done(null, false, {message: 'The specified email does not exist.'})
                }
            })
        })
    }));

    passport.use('ForgotPassword', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, function (req, email, done) {
        process.nextTick(function () {
            __models.Users.findOne({
                email: 'email'
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    // Send email
                } else {
                    return done(null, false, req.flash('forgotMessage', 'That email does not exists!'));
                }
            })
        })
    }));
};