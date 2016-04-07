/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
            clientID: __config.facebookAuth.clientID,
            clientSecret: __config.facebookAuth.clientSecret,
            callbackURL: __config.facebookAuth.callbackURL,
            passReqToCallback: true,
            profileFields: ['id', 'displayName', 'photos', 'emails', 'first_name', 'last_name']

        },
        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({'email': profile.emails[0].value}, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user);
                    }
                    else {
                        // if there is no user, create them
                        var newUser = new User();
                        newUser.displayName = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.avatar = profile.photos[0].value;
                        newUser.role = 'user';
                        newUser.status = 1;
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