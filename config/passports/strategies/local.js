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

    passport.use('adminLogin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            if (req.body.doctor) {
                process.nextTick(function () {
                    __models.Doctor.findOne({
                        email: email,
                        active_state: {$nin: ['denied', 'suspended']},
                        roles: {$exists: true}
                    }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        /*hardcode thêm crypt md5 trên cms??
                         Lũ điên.
                         */
                        if (!user || !user.validPassword(__.md5Hash(password))) {
                            return done(null, false);
                        } else {
                            var current = Date.now();
                            var token = __.md5Hash(current.toString());
                            var hashToken = require('password-hash').generate(token + user._id);

                            if (user.token && user.last_activity_date && (current - user.last_activity_date < 1000 * 60 * 60 * 24)) {
                                token = user.token;
                                hashToken = user.hash_token;
                            }

                            __models.Doctor.findByIdAndUpdate(user._id, {
                                is_online: true,
                                token: token,
                                hash_token: hashToken,
                                last_login_date: current,
                                last_activity_date: current,
                                timebase: current
                            }).exec(function (err, re) {
                                if (err) __.logger.error(err);
                            });

                            return done(null, user);
                        }
                    });
                });
            } else {
                process.nextTick(function () {
                    __models.Admin.findOne({email: email, is_active: true}, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (!user || !user.validPassword(password)) {
                            return done(null, false);
                        } else {
                            let token = __.md5Hash(Date.now().toString());
                            let hashToken = require('password-hash').generate(token);
                            __models.Admin.findByIdAndUpdate(user.id, {
                                $set: {
                                    token: hashToken,
                                    last_login_date: Date.now()
                                }
                            }).exec(function (err, re) {
                                if (err) __.logger.error(err);
                            });

                            return done(null, user);
                        }
                    });
                });
            }
        })
    );

    passport.use('doctorLogin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                __models.Doctor.findOne({'email': email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user || !user.validPassword(__.md5Hash(password))) {
                        return done(null, false);
                    }
                    else {
                        let token = __.md5Hash(Date.now().toString());
                        let hashToken = require('password-hash').generate(token);
                        __models.Doctor.findByIdAndUpdate(user.id, {
                            $set: {
                                token: hashToken,
                                last_login_date: Date.now()
                            }
                        }).exec(function (err, re) {
                            if (err) __.logger.error(err);
                        });

                        return done(null, user);
                    }
                });
            });
        })
    );
    /*
     htvu0917
     */

    passport.use('userLogin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                __models.User.findOne({'email': email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user || !user.validPassword(__.md5Hash(password))) {
                        return done(null, false);
                    }
                    else {
                        let token = __.md5Hash(Date.now().toString());
                        let hashToken = require('password-hash').generate(token);
                        __models.User.findByIdAndUpdate(user.id, {
                            $set: {
                                token: hashToken,
                                last_login_date: Date.now()
                            }
                        }).exec(function (err, re) {
                            if (err) __.logger.error(err);
                        });

                        return done(null, user);
                    }
                });
            });
        })
    );


    passport.use('userSignUp', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            process.nextTick(function () {

                __models.User.findOne({'email': email}, function (err, exists) {
                    if (err) return done(err);

                    if (exists) return done(null, false);

                    else {
                        var newUser = new __models.User;
                        newUser.displayName = req.body.displayName;
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.avatar = 'images/default.png';
                        newUser.role = 'user';
                        newUser.activeToken = randToken.generate(60);
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );
};