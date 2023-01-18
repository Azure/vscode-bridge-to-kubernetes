# Change Log

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
