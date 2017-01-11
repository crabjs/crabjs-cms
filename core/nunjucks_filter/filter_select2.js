/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

module.exports = function (env) {
	env.addFilter('filter_select', (source, selected, key, value, defaultVal) => {
		let html = '';
		if (selected) {
			source.forEach(function (item) {
				if (item[key].toString() == selected[key]) {
					html += `<option selected value="${selected[key]}">${selected[value]}</option>`
				} else {
					html += `<option value="${item[key]}">${item[value]}</option>`
				}
			});
		} else {
			source.forEach(function (item) {
				html += `<option value="${item[key]}">${item[value]}</option>`
			});
			html += `<option selected value="0">${defaultVal}</option>`
		}
		return env.getFilter('safe')(html);
	});

	env.addFilter('filter_select2', function (source, selected, key, value) {
		let results = '';
		for (let i in source) {
			if (source.hasOwnProperty(i) && selected && selected.length) {
				for (let j in selected) {
					if (selected.hasOwnProperty(j) && source[i][key] && selected[j][key] && source[i][key].toString().trim() == selected[j][key].toString().trim()) {
						results +=` <option selected value="${selected[j][key]}">${selected[j][value]}</option>`;
					} else {
						results +=` <option value="${source[i][key]}">${source[i][value]}</option>`;
					}
				}
			} else {
				results +=`<option value="${source[i][key]}">${source[i][value]}</option>`;
			}
		}
		return env.getFilter('safe')(results);
	})
};