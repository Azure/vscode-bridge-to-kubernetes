# Change Log

## [2.0.120240111]
- Updating to latest B2K CLI version. Please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202401091)
- [Addressing module not found error](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/85)
- [Bump Axios and Xml2js dependencies for dependant bot alerts](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/87)
- [Remove the unused telemetry events](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/83)

## [2.0.120231128]
- Updating to latest B2K CLI version. Please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202311273)
- [Update deprecated packages](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/64)
- [Update support debugging with multi container pods](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/71)
- [Added Unit tests to increase the code coverage](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/73)
- [Remove the logged telemetry events which aren't used much](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/74)
- [Support for downloading arm/arm64 binaries, Update minimum kubectl version to 1.27.3](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/76)
- [Updated the unit tests for expected kubectl minimum version](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/78)

## [2.0.120230817]
- Updating to latest B2k CLI version majorly for remediating security vulnerability for CBL mariner. Please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202308112)
- [Remove deprecated packages request and vscode-test](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/60)
- [Add support for Code coverage checks](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/62)
- [Enabe codecov and build badges for visibility](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/63)
Thank you @Eneuman,@Tatsinnit, @BartNetJS and @cxznmhdcxz for great contributions.

## [2.0.120231004]
- Updating to latest B2K CLI version. Please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202309272)
- [Update publish workflow to use updated nodejs](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/67)
- [Update deprecated packages](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/68)
- [Update support doc with correct links](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/69)
- [Change to service.name to show correct ingress url's](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/72)

## [2.0.120230716]
- Updating to latest B2k CLI version majorly for dotnet 7.0 upgrade. Please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202307061)
## [2.0.120230525]
- Updating to latest B2K CLI version - please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202305251)
- Fix the link appearing out of place in VS Code marketplace changes , PR link [here](https://github.com/Azure/vscode-bridge-to-kubernetes/pull/48)
## [2.0.120230418]
- Updating to latest B2K CLI version - please refer for release notes [here](https://github.com/Azure/Bridge-To-Kubernetes/blob/main/CHANGELOG.md#10202304181)

Thank you @Eneuman,@gambtho,@Tatsinnit, @Vidya2606, @maksimr, and dgarberj for great contributions.
## [2.0.120230327]
- Address [Remove BouncyCastle Nuget package since .NET 6 can handle this internally](https://github.com/Azure/Bridge-To-Kubernetes/pull/183)
- Address [Remove minimatch and replace it with internal .NET package](https://github.com/Azure/Bridge-To-Kubernetes/pull/184)
- Address [Restore job failure fix](https://github.com/Azure/Bridge-To-Kubernetes/pull/203)
- Address [Introduce new telemetry data for FailureReason excluding PII data](https://github.com/Azure/Bridge-To-Kubernetes/pull/208)
- Address [Disable probes feature](https://github.com/Azure/Bridge-To-Kubernetes/pull/164)
- Address [Support nodeport services for bridge](https://github.com/Azure/Bridge-To-Kubernetes/pull/206)
- Other minor dependant bot fixes

Thank you @elenavillamil, @hsubramanianaks and @Eneuman for contributions.

## [2.0.120230310]

* CLI version update that includes:
  - Minor bug fixes
  - Address [issue around named port environment variables not being created](https://github.com/Azure/Bridge-To-Kubernetes/issues/165) 
  - Address [migrating from netwonsoft to stj](https://github.com/Azure/Bridge-To-Kubernetes/issues/134)
  - Address [fix to AddhostFileEntry tuple](https://github.com/Azure/Bridge-To-Kubernetes/issues/135)
  - Address [JSon serialization issue](https://github.com/Azure/Bridge-To-Kubernetes/issues/55)
  - Address [headless service not getting forwarded all the time](https://github.com/Azure/Bridge-To-Kubernetes/issues/167)

Thank you to everyone who contributed and particular thank you to community contributions from @Eneuman and @Strayfe!

## [2.0.120230216]

* CLI version update that address [issue](https://github.com/Azure/Bridge-To-Kubernetes/issues/162), [issue 89](https://github.com/Azure/Bridge-To-Kubernetes/issues/89) and [issue 56](https://github.com/Azure/Bridge-To-Kubernetes/issues/56)
* Complete refactor of BinaryUtility
* Added redact funct for logging information under [Fix/readact creds from logging](https://github.com/Azure/vscode-bridge-to-kubernetes/commit/73bc3d8218c47eacadadc23d59a5f442346ef28e)

Thank you to everyone who contributed.

## [2.0.120230124]

* CLI version update that provides: Devhost agent port change for compatibility with GRPC unofficial port [PR for details](https://github.com/Azure/Bridge-To-Kubernetes/pull/129) and JSon serialization changes [STJ changes](https://github.com/Azure/Bridge-To-Kubernetes/pull/124).

Thank you everyone and special thanks to the community contributions Bridge CLI received!
 
## [2.0.120230118]

* dotnet 6 upgrade changes - minimum required dotnet version is 6.0.11 and downloads it when latest extension is used. 
* NOTE: Going back to previous version of extension requires manual action by user to download the dotnet 3.1.6 and replace it in downloaded location. Extension would not download because 6.0.11 is higher than 3.1.6. 

Thanks @pkoelbl, Joyer and team for testing effort, @GatoonJin, @Tatsinnit, @elenavillamil for collobarations, @daniv-msft and everyone else involved in this effort.

## [2.0.120230112]

* Abandonded due to publishing error please refer to `2.0.120230118` 

## [1.0.120221201]
* Prod Fix - Correcting B2K CLI version from previous release from 1.0.20221116.4 to 1.0.20221116.4

Thanks everyone.

## [1.0.120221116]
Updating B2K CLI version for following fixes:
* Bug fixes for managed identity when using useKubernetesServiceEnvironmentVariables [PR1](https://github.com/Azure/Bridge-To-Kubernetes/pull/88),[PR2](https://github.com/Azure/Bridge-To-Kubernetes/pull/93)
* Bug fixes for headless services when using useKubernetesServiceEnvironmentVariables [PR](https://github.com/Azure/Bridge-To-Kubernetes/pull/78)

Thanks @hsubramanianaks and @Tatsinnit for collaborations to make this changes happen.

## [1.0.120221031]

* Bug fix for Pod name issue when debugged via k8s extension.
* Refactor binaries utility and manager ts files, making v2 as default version always.

Thanks @Tatsinnit, @Vidya2606, @daniv-msft, @hsubramanianaks for contributions and collaborations.

## [1.0.120220915]

* First release with code moved to the decentralised github repo.
* Fixes `1:n` release issue and now expectedCLIversion is hooked to a well known version.

Thanks @gambtho, @daniv-msft, @hsubramanianaks, @elenavillamil, @lolodi for collaborations.
