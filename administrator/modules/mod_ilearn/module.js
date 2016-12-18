/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 * Created by Hai on 11/17/2016.
 */

"use strict";

module.exports = function (module) {

    module.centers = {
        group: "ILearn",
        title: "Quản lý trung tâm",
        author: 'Hai',
        version: '0.0.1',
        description: "Quản lý, giám sát thông tin các trung tâm, địa điểm học tập",
        backend_menu: {
            title: "Quản lý trung tâm",
            icon: 'fa fa-university',
            menu: [
                {
                    title: "Danh sách trung tâm",
                    link: `/${__config.admin_prefix}/ilearn/centers`,
                    ref: 'ILEARN_list_center'
                }, {
                    title: "Thêm mới",
                    link: `/${__config.admin_prefix}/ilearn/centers/create`,
                    ref: 'ILEARN_create_center'
                }
            ]
        }, roles: [
            {
                name: 'ILEARN_list_center',
                title: "Xem danh sách các trung tâm"
            }, {
                name: 'ILEARN_create_center',
                title: 'Thêm mới thông tin trung tâm'
            }, {
                name: 'ILEARN_view_center',
                title: "Xem thông tin chi tiết của trung tâm"
            }, {
                name: 'ILEARN_update_center',
                title: "Cập nhật thông tin trung tâm"
            }, {
                name: 'ILEARN_delete_center',
                title: "Xóa thông tin trung tâm"
            }
        ]
    };

    module.class = {
        group: "ILearn",
        title: "Quản lý lớp học",
        author: 'Hai',
        version: '0.0.1',
        description: "Quản lý thông tin lớp học",
        backend_menu: {
            title: "Quản lý lớp học",
            icon: 'fa fa-gg',
            menu: [
                {
                    title: "Danh sách lớp học",
                    link: `/${__config.admin_prefix}/ilearn/class`,
                    ref: 'ILEARN_list_class'
                }, {
                    title: "Thêm mới",
                    link: `/${__config.admin_prefix}/ilearn/class/create`,
                    ref: "ILEARN_create_class"
                }
            ]
        }, roles: [
            {
                name: 'ILEARN_list_class',
                title: "Xem danh sách lớp học"
            }, {
                name: 'ILEARN_create_class',
                title: "Thêm mới thông tin lớp học"
            }, {
                name: 'ILEARN_view_class',
                title: "Xem thông tin lớp học"
            },  {
                name: 'ILEARN_delete_class',
                title: "Xóa thông tin lớp học"
            }
        ]
    };

    // module.ilearn_staff = {
    //     group: "ILearn",
    //     title: "Quản lý nhân viên",
    //     author: 'Hai',
    //     version: '0.0.1',
    //     description: "Quản lý thông tin và hoạt động"
    // };

    module.customer = {
        group: "ILearn",
        title: "Quản lý học học viên",
        author: 'Hai',
        version: '0.0.1',
        description: "Quản lý thông tin khách hàng",
        backend_menu: {
            title: "Quản lý học viên",
            icon: 'fa fa-users',
            menu: [
                {
                    title: "Danh sách học viên",
                    link: `/${__config.admin_prefix}/ilearn/customers`,
                    ref: 'ILEARN_list_customer'
                }, {
                    title: "Thêm mới",
                    link: `/${__config.admin_prefix}/ilearn/customers/create`,
                    ref: 'ILEARN_create_customer'
                }
            ]
        }, roles: [
            {
                name: 'ILEARN_list_customer',
                title: "Xem tất cả học viên"
            }, {
                name: 'ILEARN_create_customer',
                title: "Nhập thông tin học viên"
            }, {
                name: 'ILEARN_delete_customer',
                title: "Xóa thông tin học viên"
            }, {
                name: 'ILEARN_update_customer',
                title: "Cập nhật thông tin học viên"
            }, {
                name: 'ILEARN_view_customer',
                title: "Xem thông tin học viên"
            }
        ]
    };

    // Todo: Điểm danh
    module.attendance = {};

    return module;
};