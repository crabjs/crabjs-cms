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

let module_name = 'mod_ilearn',
    _module = new __viewRender('backend', module_name);

_module.list_centers = function (req, res) {

    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/ilearn/centers`},
        searchButton: {},
        deleteButton: {access: true}
    });

    res.locals.tableColumns = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'name',
            width: '25%',
            header: 'Tên trung tâm'
        }, {
            column: 'alias',
            width: '25%',
            header: 'Alias'
        }, {
            column: 'created_at',
            width: '25%',
            header: 'Ngày tạo',
            type: 'date-range',
            buttonClass: 'fa fa-calendar',
            condition: {
                type: 'none'
            }
        }, {
            column: 'status',
            width: '20%',
            header: 'Trạng thái',
            type: {
                name: 'select',
                values: {
                    '0': "Chưa hoạt động",
                    '1': "Đang hoạt động",
                    '-1': 'Dừng hoạt động'
                }
            }
        }
    ];

    let cond = __.verifyCondition(req.query, {
        name: 'string',
        created_at: 'date',
        alias: 'string',
        status: 'boolean'
    });

    cond.status = {$ne: -2};

    let filter = __.createFilter(req, res, 'ilearn/centers', {order_by: 'created_at', order_type: 'desc'});

    Promise.all([
        __models.Centers.count(cond, function (err, count) {
            return count;
        }),
        __models.Centers.find(cond).sort(filter.sort).limit(__config.page_size).skip((filter.page - 1) * __config.page_size)
            .exec(function (err, centers) {
                return centers;
            })
    ]).then(function (results) {
        _module.render(req, res, 'centers/list', {
            title: 'Quản lý trung tâm',
            toolbar: toolbar.render(),
            centers: results[1],
            totalPage: Math.ceil(results[0] / __config.page_size),
            currentPage: filter.page,
            order_by: filter.order_by,
            order_type: filter.order_type
        })
    }).catch(function (error) {
        __.logger.error(error);
        return _module.render_error(req, res, '500');
    });
};

_module.create_centers = function (req, res) {

    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/ilearn/centers`},
        saveButton: {access: true}
    });

    _module.render(req, res, 'centers/create_centers', {
        title: 'Thêm mới trung tâm',
        toolbar: toolbar.render()
    })
};

_module.center_created = function (req, res) {

    if (req.body.name) req.body.alias = require('slug')(req.body.name);

    if (!req.body.alias) {
        req.flash('error', 'Tạo mới thông tin trung tâm thất bại!');
        return res.redirect(`/${__config.admin_prefix}/ilearn/centers/create`);
    }

    let newCenter = new __models.Centers(req.body);

    newCenter.save(function (err) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        } else {
            req.flash('success', 'Thông tin trung tâm đã được tạo thành công!');
            res.redirect(`/${__config.admin_prefix}/ilearn/centers`);
        }
    });
};

_module.view_center = function (req, res) {

    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/ilearn/centers`},
        saveButton: {access: true}
    });

    __models.Centers.findOne({_id: req.params.id}, function (err, result) {
        if (err) {
            return _module.render_error(req, res, '500');
        } else if (result) {
            return _module.render(req, res, 'centers/view_centers', {
                title: result.name,
                toolbar: toolbar.render(),
                center: result
            });
        } else if (!result) {
            req.flash('warning', 'Không tìm thấy thông tin trung tâm!');
            res.redirect(`/${__config.admin_prefix}/ilearn/centers`);
        } else {
            return _module.render_error(req, res, '403');
        }
    })
};

_module.update_center = function (req, res) {
    __models.Centers.update({_id: req.params.id}, req.body).exec(function (err) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        } else {
            req.flash('success', 'Cập nhật thông tin trung tâm thành công!');
            res.redirect(`/${__config.admin_prefix}/ilearn/centers/view/${req.params.id}`);
        }
    })
};

_module.delete_center = function (req, res) {
    __models.Centers.update({
        _id: {$in: req.body.ids}
    }, {status: -2}, {
        multi: true
    }).exec(function (err) {
        if (err) {
            __.logger.error(err);
            req.flash('danger', 'Có lỗi xảy ra khi thực hiện xóa thông tin trung tâm!');
            res.sendStatus(200);
        } else {
            req.flash('success', 'Xóa thông tin trung tâm thành công!');
            res.sendStatus(200);
        }
    });
};

module.exports = _module;
