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
		createButton: {access: true, link: `/${__config.admin_prefix}/ilearn/class/create`, text: ' Thêm lớp học'},
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
			column: 'center_id',
			width: '17%',
			header: 'Trung tâm'
		}, {
			column: 'description',
			width: '20%',
			header: 'Ghi chú'
		}, {
			column: 'customers_id',
			width: '11%',
			header: 'Số học viên'
		}, {
			column: 'start_date',
			width: '18%',
			header: 'Thời gian học',
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
		__models.Class.find(cond).populate('center_id', 'name')
			.sort(filter.sort).limit(__config.page_size)
			.skip((filter.page - 1) * __config.page_size)
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

_module.view_class = (req, res) => {

	Promise.all([
		__models.Class.findById(req.params.id).populate('center_id', 'name')
			.exec(function (err, iClass) {
				return iClass;
			}),
		__models.Customers.find({class_id: req.params.id}, {
			display_name: 1,
			parent_name: 1,
			status: 1
		}, (err, customers) => {
			return customers;
		})
	]).then(result => {
		let toolbar = new __.Toolbar();
		toolbar.custom({
			backButton: {link: `/${__config.admin_prefix}/ilearn/class`}
		});
		_module.render(req, res, 'class/view', {
			title: result[0].name,
			iClass: result[0],
			customers: result[1],
			toolbar: toolbar.render()
		})
	}).catch(error => {
		__.logger.error(error);
		return _module.render_error(req, res, '500');
	})
};

_module.create_class = (req, res) => {
	if (req.method === 'GET') {
		let toolbar = new __.Toolbar();
		toolbar.custom({
			backButton: {link: `/${__config.admin_prefix}/ilearn/class`},
			saveButton: {access: true}
		});
		__models.Centers.find({status: {$in: [0, 1]}}, {name: 1, status: 1}).exec((err, centers) => {
			_module.render(req, res, 'class/create', {
				title: "Thêm mới lớp học",
				toolbar: toolbar.render(),
				centers: centers
			})
		});
	} else if (req.method === 'POST') {

		if (req.body.start_date && req.body.end_date) {

			let t1 = req.body.start_date.split('/'),
				t2 = req.body.end_date.split('/');

			let start_date = {day: t1[0], month: t1[1], year: t1[2]};
			let end_date = {day: t2[0], month: t2[1], year: t2[2]};

			req.body.start_date = `${start_date.month}/${start_date.day}/${start_date.year}`;
			req.body.end_date = `${end_date.month}/${end_date.day}/${end_date.year}`;
		}

		let newClass = new __models.Class(req.body);
		newClass.save(function (err) {
			if (err) {
				__.logger.error(err);
				req.flash('danger', 'Có lỗi xảy ra!');
			} else {
				req.flash('success', 'Lớp học đã được tạo thành công!');
				res.redirect(`/${__config.admin_prefix}/ilearn/class`);
			}
		});
	} else {
		__.logger.error(error);
		return _module.render_error(req, res, '500');
	}
};

_module.delete_class = function (req, res) {
	__models.Class.remove({_id: {$in: req.body.ids}})
		.exec(function (err) {
			if (err) {
				__.logger.error(err);
				req.flash('danger', 'Có lỗi xảy ra khi xóa thông tin lớp học!');
				res.sendStatus(200);
			} else {
				req.flash('success', 'Xóa thông tin lớp học thành công!');
				res.sendStatus(200);
			}
		})
};

_module.view_attendance = (req, res) => {
	let toolbar = new __.Toolbar();
	toolbar.custom({
		backButton: {link: `/${__config.admin_prefix}/ilearn/class/attendance`}
	});
	__models.Attendance.findById(req.params.id)
		.populate('class_id', 'name')
		.populate('students.customer_id', 'display_name avatar parent_name')
		.exec(function (err, result) {
			_module.render(req, res, 'class/view_attendance', {
				title: 'Xem chi tiết điểm danh',
				attendance: result,
				toolbar: toolbar.render()
			})
		})
};

_module.update_attendance = (req, res) => {
	let class_note = req.body.class_note,
		students = [], status = 0;

	for (let i = 0; i < req.body.customer_id.length; i++) {
		status = req.body.status.indexOf(req.body.customer_id[i]) >= 0 ? 1 : 0;
		students.push({
			customer_id: req.body.customer_id[i],
			note: req.body.note[i],
			status: status
		})
	}
	__models.Attendance.update({_id: req.params.id}, {
		class_note: class_note,
		students: students
	}).exec(function (err) {
		if (err) {
			__.logger.error(err);
			return _module.render_error(req, res, '500');
		} else {
			req.flash('success', 'Cập nhật thông tin điểm danh thành công!');
			res.redirect(`/${__config.admin_prefix}/ilearn/class/attendance/view/${req.params.id}`);
		}
	})
};

_module.create_attendance = (req, res) => {
	if (req.method === 'GET') {
		__models.Class.find({status: 1}, {status: 1, name: 1}, (err, iClass) => {
			let toolbar = new __.Toolbar();
			toolbar.custom({
				backButton: {link: `/${__config.admin_prefix}/ilearn/class`}
			});
			_module.render(req, res, 'class/create_attendance', {
				title: "Tạo điểm danh",
				iClass: iClass,
				toolbar: toolbar.render()
			})
		})
	} else if (req.method === 'POST') {
		let t1 = req.body.date_time.split('/'),
			t2 = {day: t1[0], month: t1[1], year: t1[2]};

		let class_id = req.body.class_id,
			date_time = `${t2.month}/${t2.day}/${t2.year}`,
			class_note = req.body.class_note,
			students = [],
			status = 0;
		for (let i = 0; i < req.body.customer_id.length; i++) {
			status = req.body.status.indexOf(req.body.customer_id[i]) >= 0 ? 1 : 0;
			students.push({
				customer_id: req.body.customer_id[i],
				note: req.body.note[i],
				status: status
			})
		}

		let newAttendance = new __models.Attendance({
			class_id: class_id,
			date_time: date_time,
			class_note: class_note,
			students: students
		});

		newAttendance.save(function (err) {
			if (err) {
				__.logger.error(err);
				req.flash('danger', 'Có lỗi xảy ra khi thực hiện điểm danh.');
			} else {
				req.flash('success', 'Cập nhật thông tin điểm danh  thành công!');
				res.redirect(`/${__config.admin_prefix}/ilearn/class/attendance`);
			}
		});
	}
};

_module.list_attendance = (req, res) => {
	let toolbar = new __.Toolbar();
	toolbar.custom({
		refreshButton: {link: `/${__config.admin_prefix}/ilearn/class/attendance`},
		searchButton: {}
	});

	res.locals.tableColumns = [
		{
			column: '_id',
			width: '1%',
			header: ''
		}, {
			column: 'class_id',
			width: '15%',
			header: 'Tên lớp'
		}, {
			column: 'number_students',
			width: '10%',
			header: 'Số học viên'
		}, {
			column: 'teacher',
			width: '15%',
			header: 'Giảng viên'
		}, {
			column: 'date_time',
			width: '13%',
			header: 'Ngày',
			type: 'date-range',
			buttonClass: 'fa fa-calendar',
			condition: {
				type: 'none'
			}
		}, {
			column: 'class_note',
			width: '18%',
			header: 'Ghi chú'
		}
	];


	let cond = __.verifyCondition(req.query, {
		date_time: 'date',
		teacher: 'string',
		class_note: 'string'
	});

	let filter = __.createFilter(req, res, 'ilearn/class/attendance', {order_by: 'date_time', order_type: 'desc'});

	Promise.all([
		__models.Attendance.count(cond, function (err, count) {
			return count;
		}),
		__models.Attendance.find(cond).populate('class_id', 'name')
			.sort(filter.sort).limit(__config.page_size)
			.skip((filter.page - 1) * __config.page_size)
			.exec(function (err, result) {
				return result;
			})
	]).then(function (results) {
		_module.render(req, res, 'class/list_attendance', {
			title: 'Danh sách điểm danh',
			toolbar: toolbar.render(),
			attendance: results[1],
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

_module.getStudentOfClass = (req, res) => {
	__models.Customers.find({class_id: req.params.class_id}, {
		display_name: 1,
		parent_name: 1,
		avatar: 1
	}, function (err, students) {
		if (err) {
			return res.jsonp({
				status: 500,
				message: "Có lỗi khi truy cập thông tin học viên của lớp học.",
				error: err
			})
		} else {
			return res.jsonp({
				status: 200,
				data: students
			})
		}
	})
};

module.exports = _module;