/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 * Created by Hai on 11/18/2016.
 */

"use strict";

var uuid = require('node-uuid');

module.exports = function logRequest(req, res, next) {
    let startTime = Date.now(),
        requestId = uuid.v1();

    function logResponse() {
        res.responseTime = (Date.now() - startTime) + 'ms';
        req.requestId = requestId;

        if (req.err) {
            console.log(`\nError: \n + RequestId: ${requestId}\n + ResponseTime: ${res.responseTime}\n`);
        } else {
            console.log(`\nInfo: \n + RequestId: ${requestId}\n + ResponseTime: ${res.responseTime}\n`);
        }

        res.removeListener('finish', logResponse);
        res.removeListener('close', logResponse);
    }

    res.on('finish', logResponse);
    res.on('close', logResponse);

    next();
};


