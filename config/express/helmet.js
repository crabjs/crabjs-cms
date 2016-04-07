/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";

let helmet = require('helmet');

// Use helmet to security web application, xss vulnerability,..
exports.secure = function (app) {
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.enable("trust proxy");
    app.set("trust proxy", true);
    app.use(helmet.hidePoweredBy({setTo: "PHP 4.2.0"}));
    //app.disable("x-powered-by");
};