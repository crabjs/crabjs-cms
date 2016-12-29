/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 * Created by Hai on 11/14/2016.
 */

"use strict";

let express = require('express'),
	router = express.Router();

let centers = require('./controllers/centers'),
	iClass = require('./controllers/class'),
	customers = require('./controllers/customers');

/**
 * Centers router
 */
router.route('/ilearn/centers')
	.get(__.isAllow('ILEARN_list_center'), centers.list_centers)
	.delete(__.isAllow('ILEARN_delete_center'), centers.delete_center);

router.route('/ilearn/centers/create')
	.get(__.isAllow('ILEARN_create_center'), centers.create_centers)
	.post(__.isAllow('ILEARN_create_center'), centers.center_created);

router.route('/ilearn/centers/view/:id')
	.get(__.validObjectId(), __.isAllow('ILEARN_view_center'), centers.view_center)
	.post(__.validObjectId(), __.isAllow('ILEARN_update_center'), centers.update_center);

/**
 * Class router
 */

router.route('/ilearn/class')
	.get(__.isAllow('ILEARN_list_class'), iClass.list_class)
	.delete(__.isAllow('ILEARN_delete_class'), iClass.delete_class);

router.route('/ilearn/class/view/:id')
	.get(__.validObjectId(), __.isAllow('ILEARN_view_class'), iClass.view_class);

router.route('/ilearn/class/create')
	.get(__.isAllow('ILEARN_create_class'), iClass.create_class)
	.post(__.isAllow('ILEARN_create_class'), iClass.create_class);

// Attendance
router.route('/ilearn/class/attendance/create')
	.get(__.isAllow('ILEARN_attendance_create'), iClass.create_attendance)
	.post(__.isAllow('ILEARN_attendance_create'), iClass.create_attendance);
router.route('/ilearn/class/attendance')
	.get(__.isAllow('ILEARN_list_attendance'), iClass.list_attendance);

router.route('/ilearn/class/attendance/view/:id')
	.get(__.validObjectId(), __.isAllow('ILEARN_view_attendance'), iClass.view_attendance)
	.post(__.validObjectId(), __.isAllow('ILEARN_update_attendance'), iClass.update_attendance);

router.route('/ilearn/class/:class_id/students')
	.post(__.isAllow('ILEARN_attendance_create'), iClass.getStudentOfClass);
/**
 * Customers router
 */

router.route('/ilearn/customers')
	.get(__.isAllow('ILEARN_list_customer'), customers.list_customers)
	.delete(__.isAllow('ILEARN_delete_customer'), customers.delete_customers);
router.route('/ilearn/customers/create')
	.get(__.isAllow('ILEARN_create_customer'), customers.create)
	.post(__.isAllow('ILEARN_create_customer'), customers.create);

router.route('/ilearn/customers/view/:id')
	.get(__.validObjectId(), __.isAllow('ILEARN_view_customer'), customers.view_customer)
	.post(__.validObjectId(), __.isAllow('ILEARN_update_customer'), customers.update_customer);

// API
router.route('/api/ilearn/customers/view/:id')
	.post(__.validObjectId(), __.isAllow('ILEARN_view_customer'), customers.api_view_customer);

module.exports = router;