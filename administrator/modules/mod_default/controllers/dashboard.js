/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_default',
    _module = new __viewRender('backend', module_name);

_module.view = function (req, res) {
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