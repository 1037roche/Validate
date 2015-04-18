var test = false;
describe('id', function() { 'use strict';

	beforeEach(function () {
		if (window.__html__ && !test) {
			test = true;
			document.body.innerHTML = window.__html__['test/id/index.html'];
		}

		this.validate = require('validate')();
		this.cache = require('cache');
		this.form = document.querySelectorAll('[data-constraint]');
	});

	it('empty', function () {
		[].forEach.call(this.form, function (node) {
			expect(node.id).not.toEqual('');
		});
	});

	it('cache', function () {
		var self = this.cache;
		[].forEach.call(this.form, function (node) {
			expect(self(node.id)).not.toBeNull();
		});
	});
});