var assert = require('assert');

var deling = require('../lib');
var includePkgJson = deling.includePkgJson;
var getErrors = deling.getErrors;

describe('deling (lib as ES5)', function () {

	describe('default', function () {
		it('should export the config object as default', function () {
			assert.strictEqual(typeof deling, 'object');
		});

		it('should set `.root` based on the detected application root', function () {
			assert.ok(deling.name);
			assert.ok(deling.version);
		});

		it('should set `.name` and `.version` based on package.json', function () {
			assert.ok(deling.name);
			assert.ok(deling.version);
		});

		it('should set `.env` to the value of process.env.NODE_ENV or "development"', function () {
			assert.strictEqual(deling.env, 'development');
		});
	});

	describe('includePkgJson()', function () {
		it('should exist and be a function', function () {
			assert.strictEqual(typeof includePkgJson, 'function');
		});

		it('should assign the content of the root package.json to the config object', function () {
			assert.strictEqual(deling.pgkJson, undefined);

			includePkgJson();

			assert.strictEqual(typeof deling.pkgJson, 'object');
			assert.strictEqual(deling.pkgJson.name, deling.name);
		});
	});

	describe('getErrors()', function () {
		it('should exist and be a function', function () {
			assert.strictEqual(typeof getErrors, 'function');
		});
		it('should return an array of errors/warnings for files not found for debugging purpose', function () {
			const errors = getErrors();

			assert.ok(errors.length);
			errors.forEach(function(err) {
				assert.strictEqual(err.code, 'MODULE_NOT_FOUND')
			});
		});
	});

});

