import { expect } from 'chai';
import * as versionUtility from '../../utility/VersionUtility';
import { describe, it } from 'mocha';
describe(`Expected CLI Tests`, () => {
  it(`should return expectedCLIVersion`, async () => {
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    expect(expectedCLIVersion).to.equal(`1.0.20220816.2`);
  });
  it('should return null as expectedCLIVersion when BRIDGE_BUILD_PATH is set', async () => {
    let env = process.env;
    env.BRIDGE_BUILD_PATH = 'somepath';
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    expect(expectedCLIVersion).to.be.null;
  });
  it('should return BRIDGE_CLI_VERSION as expectedCLIVersion when BRIDGE_CLI_VERSION is set', async () => {
    let env = process.env;
    env.BRIDGE_BUILD_PATH = null;
    env.BRIDGE_CLI_VERSION = '1.0.20220816.X';
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    expect(expectedCLIVersion).to.equal('1.0.20220816.X');
  });
});