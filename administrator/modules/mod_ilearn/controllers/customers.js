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
	_module = new __viewRender('backend', module_name),
	formidable = require('formidable');

_module.list_customers = function (req, res) {

	let toolbar = new __.Toolbar();
	toolbar.custom({
		refreshButton: {link: `/${__config.admin_prefix}/ilearn/customers`},
		createButton: {access: true, link: `/${__config.admin_prefix}/ilearn/customers/create`, text: ' Thêm học viên'},
		searchButton: {},
		deleteButton: {access: true}
	});

	res.locals.tableColumns = [
		{
			column: '_id',
			width: '1%',
			header: ''
		}, {
			column: 'display_name',
			width: '20%',
			header: 'Họ tên'
		}, {
			column: 'gender',
			width: '12%',
			header: 'Giới tính',
			type: {
				name: 'select',
				values: {
					MALE: 'Nam',
					FEMALE: 'Nữ'
				}
			}
		}, {
			column: 'phone_number',
			width: '15%',
			header: "Điện thoại"
		}, {
			column: 'class_id.name',
			width: '12%',
			header: 'Tên lớp học'
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
			width: '13%',
			header: 'Trạng thái',
			type: {
				name: 'select',
				values: {
					'-2': "Đang học thử",
					'0': "Chưa học",
					'1': "Đang học",
					'2': "Đã học xong"
				}
			}
		}
	];

	let cond = __.verifyCondition(req.query, {
		display_name: 'string',
		created_at: 'date',
		gender: 'boolean',
		phone_number: 'string',
		'class_id.name': 'string',
		customers_id: 'size',
		status: 'boolean'
	});

	let filter = __.createFilter(req, res, 'ilearn/customers', {order_by: 'created_at', order_type: 'desc'});

	Promise.all([
		__models.Customers.count(cond, function (err, count) {
			return count;
		}),
		__models.Customers.find(cond)
			.populate('class_id', 'name')
			.sort(filter.sort)
			.limit(__config.page_size)
			.skip((filter.page - 1) * __config.page_size)
			.exec(function (err, iClass) {
				return iClass;
			})
	]).then(function (results) {
		_module.render(req, res, 'customers/list', {
			title: 'Quản lý học viên',
			toolbar: toolbar.render(),
			customers: results[1],
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

_module.create = function (req, res) {
	if (req.method === 'GET') {
		__models.Class.find({status: {$in: [0, 1]}}, {status: 1, name: 1}, function (err, iClass) {
			_module.render(req, res, 'customers/create_profile', {
				title: 'Tạo mới thông tin học viên',
				iClass: iClass
			})
		});
	} else if (req.method === 'POST') {
		let form = new formidable.IncomingForm();
		form.uploadDir = require('path').resolve(__base, 'public', 'uploads', 'images');

		form.parse(req, function (err, fields, files) {
			if (err) {
				return _module.render_error(req, res, '500');
			}
			req.body = fields || {};

			let file = files['avatar_user'];
			let file_type = file.name.split('.').pop();
			let new_file_name = __.randomText(12) + '_' + new Date().getTime() + '.' + file_type;
			let file_path = require('path').join(form.uploadDir, new_file_name);

			require('fs').rename(file.path, file_path);

			req.body.avatar = '/uploads/images/' + new_file_name;

			if (req.body.class_id == 0) {
				delete req.body.class_id
			}

			let newCustomer = new __models.Customers(req.body);
			newCustomer.save(function (err) {
				if (err) {
					__.logger.error(err);
					req.flash('danger', 'Có lỗi xảy ra khi tạo thông tin khách hàng!');
				} else {
					req.flash('success', 'Thông tin khách hàng đã được tạo thành công!');
					res.redirect(`/${__config.admin_prefix}/ilearn/customers`);
				}
			});
		});
	} else {
		return _module.render_error(req, res, '500');
	}
};

_module.api_view_customer = (req, res) => {
	__models.Customers.findById(req.params.id, (err, result) => {
		if (err) {
			return res.jsonp({
				status: 500,
				message: "Có lỗi khi lấy thông tin học viên.",
				error: err
			})
		} else {
			return res.jsonp({
				status: 200,
				data: result
			})
		}
	})
};

_module.view_customer = function (req, res) {
	__models.Customers.findOne({_id: req.params.id}, function (err, result) {
		if (err) {
			return _module.render_error(req, res, '500');
		} else if (result) {
			__models.Class.find({status: {$ne: -1}}, {name: 1, status: 1}, function (error, class_list) {
				return _module.render(req, res, 'customers/view_profile', {
					title: result.display_name,
					profile: result,
					class_list: class_list
				})
			});
		} else if (!result) {
			req.flash('warning', 'Không tìm thấy thông tin trung tâm!');
			res.redirect(`/${__config.admin_prefix}/ilearn/centers`);
		} else {
			return _module.render_error(req, res, '403');
		}
	});
};

_module.delete_customers = function (req, res) {
	__models.Customers.remove({_id: {$in: req.body.ids}})
		.exec(function (err) {
			if (err) {
				__.logger.error(err);
				req.flash('danger', 'Có lỗi kiểm tra!');
				res.sendStatus(200);
			} else {
				req.flash('success', 'Xóa thông tin học viên thành công!');
				res.sendStatus(200);
			}
		})
};

_module.update_customer = function (req, res) {
	let form = new formidable.IncomingForm();
	form.uploadDir = require('path').resolve(__base, 'public', 'uploads', 'images');

	form.parse(req, function (err, fields, files) {
		if (err) {
			return _module.render_error(req, res, '500');
		}
		req.body = fields || {};

		let file = files['avatar_user'];
		let file_type = file.name.split('.').pop();
		let new_file_name = __.randomText(12) + '_' + new Date().getTime() + '.' + file_type;
		let file_path = require('path').join(form.uploadDir, new_file_name);

		require('fs').rename(file.path, file_path);

		req.body.avatar = '/uploads/images/' + new_file_name;

		if (req.body.class_id == 0) {
			delete req.body.class_id
		}

		__models.Customers.update({_id: req.params.id}, req.body).exec(function (err) {
			if (err) {
				__.logger.error(err);
				return _module.render_error(req, res, '500');
			} else {
				req.flash('success', 'Cập nhật thông tin học viên thành công!');
				res.redirect(`/${__config.admin_prefix}/ilearn/customers/view/${req.params.id}`);
			}
		})
	});
};

module.exports = _module;