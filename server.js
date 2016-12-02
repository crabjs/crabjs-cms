/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

global.__base = __dirname;

if (require('fs').existsSync('./config/config.json')) {

    // Install already
    let app = require('./bin/crab');
    app.start(3000, {
        debug: true
    });
    module.exports = app;
} else {
    require('./bin/generator')
}

// let newCenter = new __models.Centers({
//     name: "ILearn - Chung cư linh đàm",
//     alias: "ilearn-chung-cu-linh-dam",
//     description: "Cơ sở 2, ILearn nằm trong chung cư Linh Đàm",
//     status: 1,
//     avartar: ""
// });
//
// newCenter.save(function(err){
//     console.log(err);
// })

// let newClass = new __models.Class({
//     name: "Giao tiếp cơ bản - Cô Trang",
//     alias: "giao-tiep-co-ban-co-trang",
//     description: "Lớp giao tiếp cơ bản. Cô Nguyen Trang",
//     status: 1,
//     start_date: "10-20-2016",
//     end_date: "04-20-2017"
// });
//
// newClass.save(function(err){
//     console.log(err);
// })

// let newStudent = new __models.Customers({
//     display_name: "Lê Tâm Anh",
//     date_of_birth: "05/12/1994",
//     address: "Nguyễn Cảnh Dị, Hà Nội",
//     phone_number: [
//         "0984754855"
//     ],
//     email: "tamanh94@gmail.com",
//     gender: "FEMALE",
//     avatar: "",
//     age: "23",
//     status: 1
// });
//
// newStudent.save(function(err){
//     console.log(err);
// });