import assert from 'assert';
import deling, { includePkgJson, getErrors } from '../src';

describe('deling', () => {

	describe('default', () => {
		it('should export the config object as default', () => {
			assert.strictEqual(typeof deling, 'object');
		});

		it('should set `.root` based on the detected application root', () => {
			assert.ok(deling.name);
			assert.ok(deling.version);
		});

		it('should set `.name` and `.version` based on package.json', () => {
			assert.ok(deling.name);
			assert.ok(deling.version);
		});

		it('should set `.env` to the value of process.env.NODE_ENV or "development"', () => {
			assert.strictEqual(deling.env, 'development');
		});
	});

	describe('includePkgJson()', () => {
		it('should exist and be a function', () => {
			assert.strictEqual(typeof includePkgJson, 'function');
		});

		it('should assign the content of the root package.json to the config object', () => {
			assert.strictEqual(deling.pgkJson, undefined);

			includePkgJson();

			assert.strictEqual(typeof deling.pkgJson, 'object');
			assert.strictEqual(deling.pkgJson.name, deling.name);
		});
	});

	describe('getErrors()', () => {
		it('should exist and be a function', () => {
			assert.strictEqual(typeof getErrors, 'function');
		});
		it('should return an array of errors/warnings for files not found for debugging purpose', () => {
			const errors = getErrors();

			assert.ok(errors.length);
			errors.forEach((err) => {
				assert.strictEqual(err.code, 'MODULE_NOT_FOUND')
			});
		});
	});

});
