import { assert, expect } from 'chai';
import * as versionUtility  from '../../utility/VersionUtility';

suite(`Expected CLI Test`, () => {
  test(`should return expectedCLIVersion`, async () => {

    const packageJsonContent = JSON.parse(`{
      "extensionMetadata": {
        "expectedCLIVersion": "1.0.20220816.2"
      }
    }`);
    const expectedCLIVersion: string = await versionUtility.VersionUtility.getExpectedCliVersionAsync(packageJsonContent);

    expect(expectedCLIVersion).to.equal(`1.0.20220816.2`);
  });
});
