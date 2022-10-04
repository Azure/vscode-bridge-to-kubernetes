import * as assert from 'assert';
import * as versionUtility  from '../../utility/VersionUtility';

suite(`Expected CLI Test`, () => {
  test(`should return expectedCLIVersion`, async () => {

    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);

    assert.strictEqual(expectedCLIVersion, `1.0.20220816.2`);
  });
});
