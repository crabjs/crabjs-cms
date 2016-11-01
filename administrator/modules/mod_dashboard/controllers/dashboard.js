/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_dashboard',
    _module = new __viewRender('backend', module_name);

_module.view = function (req, res) {

    /**
     * cookie.maxAge is updated automatically by connect.session touch(), but only on server side.
     * The updating of maxAge on client side has to be done manually with res.cookie
     */

    var hour = 3600000;
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
    res.cookie('100dayproject', req.cookies['100dayproject'], {
        maxAge: req.session.cookie.maxAge,
        path: '/',
        httpOnly: true
    });

    Promise.all([
        __models.Posts.count({key: 'article'}).then(function(count){
            return count;
        }, function(err){
            if (err) {
                __.logger.error(err);
            }
        }),
        __models.Users.count().then(function(count){
            return count;
        }, function(err){
            if (err) {
                __.logger.error(err);
            }
        })
    ]).then(function (statistic) {
        _module.render(req, res, 'dashboard', {
            title: 'Dashboard',
            re: statistic
        })
    });
};


module.exports = _module;