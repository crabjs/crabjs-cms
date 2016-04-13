/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_home',
    _module = new __viewRender(module_name);

_module.index = function (req, res) {
    _module.render(req, res, 'index', {
        title: 'Hainho - The 100dayproject of archives & research collections and quickly save my ideas'
    });
};

_module.home = function (req, res) {
    _module.render(req, res, 'home', {
        title: 'Home page'
    })
};

module.exports = _module;