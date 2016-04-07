/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";

let path = require('path'),
    os = require('os'),
    express = require('express'),
    logger = require('morgan'),
    userAgent = require('express-useragent'),
    viewEngine = require('./nunjucks'),
    helmet = require('./helmet'),
    requestParser = require('./requestParser'),
    flash = require('./flash'),
    appLoader = require('./appLoaders'),
    throwError = require('./throwError'),
    passport = require('../passport');

module.exports = function () {

    // Initialization express application
    let app = express();

    if (process.env.NODE_ENV === 'development' || os.hostname() == 'DESKTOP-PSSOURR' || os.hostname() == 'Razor') {
        app.use(logger('dev'));

        /** Disable views cache */
        app.set('view cache', false);
        app.enable('verbose errors');
    } else {
        app.locals.cache = 'memory';
        app.disabled('verbose errors');

        /** trust first proxy */
        app.set('trust proxy', 1);

    }
    app.enable("trust proxy");

    app.set("showStackError", true);

    app.use(express.static(path.resolve('./public'), {maxAge: 3600}));

    app.use(userAgent.express());

    /**
     * Passing the request url to environment locals
     */
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + "://" + req.headers.host + req.url;
        res.locals.route = req.url;
        res.locals.path = req.protocol + "://" + req.headers.host;
        //res.setHeader('Cache-Control', 'public, max-age=600');  // Enable for caching session-flash
        next();
    });

    /**
     * Helmet module security express application.
     */
    helmet.secure(app);

    /**
     * Request parser call bodyParser, cookie-parser, cookie-parser, express-session for storage
     * and extends `delete` method using methodOverride module
     */
    requestParser.configure(app);

    /*
     View engine initialization support three method for configuration
     1> configure: extend application for config settings and set view engine extension.
     2> getCustomFilter: get path custom filter use glob module for load path.
     3> showConfigure: show configuration view settings.
     FIXME: options filter and addGlobal move to render_manager function call this.
     FIXME: Env not exports to app, use Singleton pattern.
     */

    let viewOpts = {
        path: __base, // path view engine loader
        autoescape: false, // options nunjucks setting template engine
        dev: true
    };

    let view = new viewEngine(app);
    view.configure(viewOpts, {
        showConfigure: true
    });

    /**
     * Connect-flash module middleware
     */
    flash.configure(app);

    passport.configure(app);


    /**
     * Application router loader modules
     */
    appLoader.routeLoader(app);

    /**
     * Logging exception error any status
     */
    throwError.configure(app);

    return app;
};