/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let module_name = 'mod_articles',
    _module = new __viewRender(module_name);

_module.list = function (req, res) {
    _module.render(req, res, 'index');
};

_module.view_article = function (req, res) {
    _module.render(req, res, 'article_view', {
        title: 'Tiêu đề'
    })
};

module.exports = _module;