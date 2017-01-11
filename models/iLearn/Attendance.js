/**
 * Created by Hai on 29-Dec-16.
 */
"use strict";

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let Attendance = new Schema({
	class_id: {type: Schema.Types.ObjectId, ref: 'Class'},
	date_time: {type: Schema.Types.Date, default: ''},
	class_note: {type: String, default: ''},
	teacher: {type: String, default: ''},
	admin: {type: String, default: 'ILEARN'}, // người điểm danh
	students: [{
		_id: false,
		customer_id: {type: Schema.Types.ObjectId, ref: 'Customers'},
		note: {type: String, default: ''},
		status: {type: Number, default: 0}
	}]
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: 'attendance'
});

module.exports = mongoose.model('Attendance', Attendance);
