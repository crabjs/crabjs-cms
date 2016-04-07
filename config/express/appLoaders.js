/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";

let sep = require('path').sep;

exports.routeLoader = function (app) {
    let layer = Object.keys(__config.appLayer);
    __.logger.info(`[Router loader] use ${layer.join(' & ')} router.\n`);
    let corePath = __base + ['app', 'modules', 'core_route'].join(sep);

    let moduleIgnore = '' || '*';

    let frontendPath = __base + ['app', 'modules', moduleIgnore, 'frontend', 'route.js'].join(sep);
    let backendPath = __base + ['app', 'modules', moduleIgnore, 'backend', 'route.js'].join(sep);

    /**
     * Core routing loader
     */
    require(corePath)(app);

    /**
     * Frontend routing loader
     */
    __.getGlobbedFiles(frontendPath).forEach(function (routePath) {
        require(routePath)(app);
    });

    /**
     * Backend routing loader, route protection name prefix for security
     * between frontend and backend difference
     */
    __.getGlobbedFiles(backendPath).forEach(function (routePath) {
        app.use('/' + __config.admin_prefix, require(routePath));
    });
};