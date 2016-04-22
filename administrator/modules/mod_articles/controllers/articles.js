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
    _module = new __viewRender('backend', module_name),
    Promise = require('bluebird');

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
    if (!req.body.alias) req.body.alias = require('slug')(req.body.title).toLocaleLowerCase();

    req.body.authors = {
        _id: req.user._id,
        display_name: req.user.display_name
    };
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
            column: 'authors.display_name',
            width: '20%',
            header: 'Người đăng tin'
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
                    '0': 'Phát hành',
                    '-1': 'Bản nháp'
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

    res.locals.module_name = 'posts';
    res.locals.tableColumns = structure;

    let page = req.query.page || 1;
    let order_by = req.query.order_by || 'created_at' || '_id';
    let order_type = req.query.order_type || 'desc';

    let cond = __.verifyCondition(req.query, {
        key: 'article',
        title: 'string',
        alias: 'string',
        created_at: 'date',
        status: 'boolean',
        "authors.display_name": 'string'
    });

    let sort = {};
    sort[req.query.order_by] = req.query.order_type == 'desc' ? -1 : 1;

    if (!req.query.order_by) sort = {created_at: -1};

    console.log(cond);

    Promise.all([
        __models.Posts.count(cond, function (err, count) {
            return count;
        }),
        __models.Posts.find(cond).sort(sort).limit(__config.page_size).skip((page - 1) * __config.page_size)
            .exec(function (err, posts) {
                return posts;
            })
    ]).then(function (results) {
        _module.render(req, res, 'index', {
            title: 'Danh sách bài viết',
            toolbar: toolbar.render(),
            posts: results[1],
            totalPage: Math.ceil(results[0] / __config.page_size),
            currentPage: page,
            order_by: order_by,
            order_type: order_type
        })
    }).catch(function (error) {
        __.logger.error(error);
        req.flash('danger', 'Có lỗi xảy ra khi truy cập bài viết!');
        return res.redirect(`/${__config.admin_prefix}/dashboard`);
    });
};

_module.delete = function (req, res) {
    __models.Posts.remove({key: 'article', _id: {$in: req.body.ids}})
        .exec(function (err) {
            if (err) {
                __.logger.error(err);
                req.flash('danger', 'Có lỗi kiểm tra!');
                res.sendStatus(200);
            } else {
                req.flash('success', 'Xóa bài viết thành công!');
                res.sendStatus(200);
            }
        })
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
    if (!req.body.alias) req.body.alias = require('slug')(req.body.title).toLocaleLowerCase();

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