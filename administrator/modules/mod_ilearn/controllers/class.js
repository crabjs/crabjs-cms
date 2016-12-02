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

_module.list_class = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/ilearn/class`},
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
            width: '20%',
            header: 'Tên lớp'
        }, {
            column: 'description',
            width: '20%',
            header: 'Ghi chú'
        }, {
            column: 'customers_id',
            width: '10%',
            header: 'Số học viên'
        }, {
            column: 'created_at',
            width: '15%',
            header: 'Ngày tạo',
            type: 'date-range',
            buttonClass: 'fa fa-calendar',
            condition: {
                type: 'none'
            }
        }, {
            column: 'status',
            width: '15%',
            header: 'Trạng thái',
            type: {
                name: 'select',
                values: {
                    '0': "Chưa học",
                    '1': "Đang học",
                    '2': "Đã học xong"
                }
            }
        }
    ];

    let cond = __.verifyCondition(req.query, {
        name: 'string',
        created_at: 'date',
        description: 'string',
        customers_id: 'size',
        status: 'boolean'
    });

    let filter = __.createFilter(req, res, 'ilearn/class', {order_by: 'created_at', order_type: 'desc'});

    Promise.all([
        __models.Class.count(cond, function (err, count) {
            return count;
        }),
        __models.Class.find(cond).sort(filter.sort).limit(__config.page_size).skip((filter.page - 1) * __config.page_size)
            .exec(function (err, iClass) {
                return iClass;
            })
    ]).then(function (results) {
        _module.render(req, res, 'class/list', {
            title: 'Quản lý lớp học',
            toolbar: toolbar.render(),
            iClass: results[1],
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

module.exports = _module;