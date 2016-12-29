/**
 * Created by Hai on 29-Dec-16.
 */

"use strict";

module.exports = function (env) {
	env.addFilter('number_attendance', function (student_status) {
		 return `${student_status.filter(student => student.status == 1).length}/${student_status.length}`;
	})
};