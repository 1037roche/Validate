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

	it('check ids', function () {
		[].forEach.call(this.form, function (node) {
			expect(node.id).not.toEqual('');
		});
	});

	it('check repeat id', function () {
		/*
		var form = this.form.sort().filter(function (value, index, array) {
			return (index === 0) || (value !== array[index - 1]);
		});
		console.log(this.form)
		console.log(form)
		*/
	});

	it('cache', function () {
		var self = this.cache;
		[].forEach.call(this.form, function (node) {
			expect(self(node.id)).not.toBeNull();
		});
	});
});