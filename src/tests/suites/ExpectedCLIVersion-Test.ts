import * as assert from 'assert';
import * as versionUtility from '../../utility/VersionUtility';
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
  test('should return null as expectedCLIVersion when BRIDGE_BUILD_PATH is set', async () => {
    let env = process.env;
    env.BRIDGE_BUILD_PATH = 'somepath';
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    assert.strictEqual(expectedCLIVersion, null);
  });
  test('should return BRIDGE_CLI_VERSION as expectedCLIVersion when BRIDGE_CLI_VERSION is set', async () => {
    let env = process.env;
    env.BRIDGE_BUILD_PATH = null;
    env.BRIDGE_CLI_VERSION = '1.0.20220816.X';
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    assert.strictEqual(expectedCLIVersion, '1.0.20220816.X');
  });
});