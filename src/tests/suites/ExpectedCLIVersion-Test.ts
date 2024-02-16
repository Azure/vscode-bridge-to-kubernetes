import { describe, it } from 'mocha';
import * as versionUtility from '../../utility/VersionUtility';
describe(`Expected CLI Tests`, () => {
  it(`should return expectedCLIVersion`, async () => {
    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);
    import('chai')
      .then(chai => chai.expect(expectedCLIVersion).to.equal(`1.0.20220816.2`))
      .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
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
    import('chai')
      .then(chai => chai.expect(expectedCLIVersion).to.be.null)
      .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
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
    import('chai')
      .then(chai => chai.expect(expectedCLIVersion).to.equal('1.0.20220816.X'))
      .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
  });
});