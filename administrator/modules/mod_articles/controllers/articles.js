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
    _module = new __viewRender('backend', module_name);

_module.create = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/posts`},
        saveButton: {access: true}
    });

    _module.render(req, res, 'view', {
        title: 'Viết bài mới',
        toolbar: toolbar.render()
    })
};

_module.created = function (req, res) {
    req.body.key = 'article';
    req.body.authors = req.user;
    var newPost = new __models.Posts(req.body);
    newPost.save(function (err) {
        if (err) {
            __.logger.error(err);
            req.flash('danger', 'Có lỗi xảy ra!');
        } else {
            req.flash('success', 'Đăng bài viết thành công!');
            res.redirect(`/${__config.admin_prefix}/posts`);
        }
    });
};

_module.upload = function (req, res) {

    let formidable = require('formidable');

    let form = new formidable.IncomingForm();

    form.uploadDir = __base + '/public/uploads';

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        console.log(fields);

    });


    // var form = new formidable.IncomingForm();
    // form.uploadDir = __base + '/public/upload';
    // form.encoding = 'binary';
    //
    // form.addListener('file', function(name, file) {
    //     // do something with uploaded file
    // });
    //
    // form.addListener('end', function() {
    //     res.end();
    // });
    //
    // form.parse(req, function(err, fields, files) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    // let form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //     // res.writeHead(200, {'content-type': 'text/plain'});
    //     // res.write('received upload:\n\n');
    //     // res.end(util.inspect({fields: fields, files: files}));
    //     console.log(err);
    //     console.log(fields);
    //     console.log(files);
    // });

    // console.log('fsdaf',form);
    //
    // let fs = require('fs');
    // req.files.attachments.forEach(function (element, index, array) {
    //     fs.readFile(element.path, function (err, data) {
    //         let newPath = __base + '/public/uploads/' + element.name;
    //         fs.writeFile(newPath, data, function (err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //         })
    //     })
    // });
};

_module.list = function (req, res) {

    let structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'title',
            width: '25%',
            header: 'Tiêu đề'
        }, {
            column: 'alias',
            width: '25%',
            header: 'Alias'
        }, {
            column: 'authors.displayName',
            width: '20%',
            header: 'Họ tên'
        }, {
            column: 'created_at',
            width: '15%',
            header: 'Ngày đăng',
            type: 'date-range',
            buttonClass: 'fa fa-calendar',
            condition: {
                type: 'none'
            }
        }, {
            column: 'status',
            width: '13%',
            header: 'Trạng thái',
            type: {
                name: 'select',
                values: {
                    '0': 'Publish',
                    '-1': 'Draft'
                }
            }
        }
    ];

    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/posts`},
        createButton: {access: true, link: `/${__config.admin_prefix}/posts/create`, text: ' Viết bài mới'},
        searchButton: {},
        deleteButton: {access: true} // isAllow
    });

    res.locals.tableColumns = structure;

    for (let key in req.query) {
        if (req.query.hasOwnProperty(key) && !req.query[key]) {
            delete req.query[key]
        } else {
            if (key !== 'status' && key !== 'created_at')
                req.query[key] = {
                    $regex: req.query[key],
                    $options: "iu"
                }
        }
    }

    req.query.key = 'article';
    if (req.query.status == 'all') {
        delete req.query.status;
    }

    if (req.query.created_at) {
        let date = req.query.created_at.split(' - ');
        req.query.created_at = {
            $gte: date[0],
            $lte: date[1]
        };
    }


    __models.Posts.find(req.query, function (err, posts) {
        if (err) {
            __.logger.error(err);
            req.flash('danger', 'Có lỗi xảy ra khi truy cập bài viết!');
            return res.redirect(`/${__config.admin_prefix}/dashboard`);
        }
        _module.render(req, res, 'index', {
            title: 'Danh sách bài viết',
            toolbar: toolbar.render(),
            posts: posts
        })
    });
};

_module.view = function (req, res) {

    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/posts`},
        saveButton: {access: true}
    });
    __models.Posts.findOne({key: 'article', _id: req.params.id}, function (err, post) {
        if (err) {
            console.log(err);
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        _module.render(req, res, 'view', {
            title: post.title,
            toolbar: toolbar.render(),
            post: post
        })
    });
};

_module.update = function (req, res) {
    __models.Posts.update({key: 'article', _id: req.params.id}, req.body).exec(function (err, re) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        req.flash('success', 'Cập nhật bài viết thành công!');
        res.redirect(`/${__config.admin_prefix}/posts/view/${req.params.id}`);
    });
};

module.exports = _module;