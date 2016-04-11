/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

module.exports = {
    addUser: function (user, next) {
        let newUser = new __models.Users({
            email: user.email,
            password: user.password,
            displayName: user.displayName,
            status: user.status
        });

        newUser.save(function (err) {
            if (err) {
                return next(err);
            }
            next(null);
        })
    },
    updateUser: function (user, next) {
        
    },
    findOne: function (data, next) {
        __models.Users.findOne(data, function (err, user) {
            next(err, user)
        })
    },
    find: function (data, next) {
        __models.Users.find(data, function (err, user) {
            next(err, user);
        })
    }
};