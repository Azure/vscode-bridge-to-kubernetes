import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';


export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd'
	});

	const testsRoot = path.resolve(__dirname, '..');

	const result = await glob('**/**-Test.js', { cwd: testsRoot });

	result.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

	return new Promise((resolve, reject) => {
		mocha.run(failures => {
			if (failures > 0) {
				console.log(`${failures} tests failed.`);
				reject(new Error(`${failures} tests failed.`));
			} else {
				console.log('All tests passed.');
				resolve();
			}
		});
	});
}