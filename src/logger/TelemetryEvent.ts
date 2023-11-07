// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

export enum TelemetryEvent {
    AccountContextManager_GetKubeconfigPathError = "account-context-manager-get-kubeconfig-path-error",
    Activation = "activation",
    BinariesUtility_CheckIfBinaryExistsError = "binaries-utility-check-if-binary-exists-error",
    BinariesUtility_CleanUpBeforeDownloadError = "binaries-utility-cleanup-before-download-error",
    BinariesUtility_CleanUpBeforeDownloadSuccess = "binaries-utility-cleanup-before-download-success",
    BinariesUtility_CopyKubectlToBridgeFolderError = "binaries-utility-copy-kubectl-to-bridge-folder-error",
    BinariesUtility_CopyKubectlToBridgeFolderSuccess = "binaries-utility-copy-kubectl-to-bridge-folder-success",
    BinariesUtility_DeleteLegacyBridgeDownloadDirectoryError = "binaries-utility-delete-legacy-bridge-download-directory-error",
    BinariesUtility_DeleteLegacyBridgeDownloadDirectorySuccess = "binaries-utility-delete-legacy-bridge-download-directory-success",
    BinariesUtility_DownloadError = "binaries-utility-download-error",
    BinariesUtility_DownloadStart = "binaries-utility-download-start",
    BinariesUtility_DownloadSuccess = "binaries-utility-download-success",
    BinariesUtility_EnsureBinariesError = "binaries-utility-ensure-binaries-error",
    BinariesUtility_EnsureBinariesPathError = "binaries-utility-ensure-binaries-path-error",
    BinariesUtility_EnsureBinariesSuccess = "binaries-utility-ensure-binaries-success",
    BinariesUtility_EnsureCliError = "binaries-utility-ensure-cli-error",
    BinariesUtility_EnsureCliSuccess = "binaries-utility-ensure-cli-success",
    BinariesUtility_FileDownloaderVersionError = "binaries-utility-file-downloader-version-error",
    BinariesUtility_OverallDownloadStatus = "binaries-utility-overall-download-status",
    BinariesUtility_TryGetBinariesError = "binaries-utility-try-get-binaries-error",
    BinariesUtility_TryGetBinariesSuccess = "binaries-utility-try-get-binaries-success",
    BinariesUtility_Version = "binaries-utility-version-v2",
    BinariesVersionClient_GetCachedBinariesDownloadInfoError = "binaries-version-client-get-cached-binaries-download-info-error",
    BinariesVersionClient_GetCachedBinariesDownloadInfoSuccess = "binaries-version-client-get-cached-binaries-download-info-success",
    BinariesVersionClient_GetDownloadInfoError = "binaries-version-client-get-download-info-error",
    BinariesVersionClient_GetDownloadInfoStatus = "binaries-version-client-get-download-info-status",
    BinariesVersionClient_GetDownloadInfoSuccess = "binaries-version-client-get-download-info-success",
    BridgeClient_CheckCredentialsError = "cli-client-check-credentials-error",
    BridgeClient_CheckCredentialsSuccess = "cli-client-check-credentials-success",
    BridgeClient_CleanLocalConnectError = "cli-client-clean-local-connect-error",
    BridgeClient_CleanLocalConnectSuccess = "cli-client-clean-local-connect-success",
    BridgeClient_ConnectError = "cli-client-connect-error",
    BridgeClient_ConnectSuccess = "cli-client-connect-success",
    BridgeClient_GetVersionError = "cli-client-get-version-error",
    BridgeClient_GetVersionSuccess = "cli-client-get-version-success",
    BridgeClient_PrepConnectError = "cli-client-prep-connect-error",
    BridgeClient_PrepConnectSuccess = "cli-client-prep-connect-success",
    BridgeClient_RefreshCredentialsError = "cli-client-refresh-credentials-error",
    BridgeClient_RefreshCredentialsOutputError = "cli-client-refresh-credentials-output-error",
    BridgeClient_RefreshCredentialsSuccess = "cli-client-refresh-credentials-success",
    CliVersionsClient_GetDownloadInfoError = "cli-versions-client-get-download-info-error",
    CliVersionsClient_GetDownloadInfoStatus = "cli-version-client-get-download-info-status",
    CliVersionsClient_GetDownloadInfoSuccess = "cli-versions-client-get-download-info-success",
    ConfigureCommandError = "configure-command-error",
    ConfigureCommandTriggered = "configure-command-triggered",
    Connect_DebugConfigApplied = "connect-debug-config-applied",
    Connect_DebugSessionStarted = "connect-debug-session-started",
    Connect_DebugSessionTerminated = "connect-debug-session-terminated",
    Connect_DisconnectError = "connect-disconnect-error",
    Connect_DisconnectSuccessful = "connect-disconnect-successful",
    Connect_EnsureConfigurationPresentCancelled = "connect-ensure-configuration-present-cancelled",
    Connect_EnsureConfigurationPresentError = "connect-ensure-configuration-present-error",
    Connect_EnsureConfigurationPresentSuccess = "connect-ensure-configuration-present-success",
    Connect_Error = "connect-error",
    Connect_ServiceList = "connect-service-list",
    Connect_StartConnect = "connect-start-connect",
    Connect_StatusBarMenuConnectError = "connect-status-bar-menu-connect-error",
    Connect_StatusBarMenuConnectSuccess = "connect-status-bar-menu-connect-success",
    Connect_TerminalLaunched = "connect-terminal-launched",
    Connect_UnsupportedExtensionKindError = "connect-unsupported-extension-kind-error",
    Connect_UnsupportedOperatingSystemError = "connect-unsupported-operating-system-error",
    Connect_ValidateNonDevSpacesCluster = "connect-validate-non-dev-spaces-cluster",
    Connect_WizardError = "connect-wizard-error",
    Connect_WizardStart = "connect-wizard-start",
    Connect_WizardStop = "connect-wizard-stop",
    Connect_WrongKubeconfigContextTargetedModalClosed = "connect-wrong-kubeconfig-context-targeted-modal-closed",
    ConnectInitializationError = "connect-initialization-error",
    ConnectInitializationSuccess = "connect-initialization-success",
    ConnectPreLaunchTaskSkipped = "connect-pre-launch-task-skipped",
    ConnectServiceTaskTerminal_Error = "connect-service-task-terminal-error",
    ConnectServiceTaskTerminal_StartConnect = "connect-service-task-terminal-start-connect",
    DebugLocalTunnel_CommandPaletteSelected = "debug-local-tunnel-command-palette-selected",
    DebugLocalTunnel_DeploymentSelected = "debug-local-tunnel-deployment-selected",
    DebugLocalTunnel_JobSelected = "debug-local-tunnel-job-selected",
    DebugLocalTunnel_PodSelected = "debug-local-tunnel-pod-selected",
    DebugLocalTunnel_ServiceSelected = "debug-local-tunnel-service-selected",
    DebugLocalTunnel_SessionStarted = "debug-local-tunnel-session-started",
    DebugLocalTunnel_UnknownNodeSelected = "debug-local-tunnel-unknown-node-selected",
    DebugLocalTunnel_UnknownResourceSelected = "debug-local-tunnel-unknown-resource-selected",
    DebugResolveConfigurationError = "debug-resolve-configuration-error",
    DebugStartSuccess = "debug-start-success",
    DebugTerminate = "debug-terminate",
    DotNetClient_GetVersionError = "dotnet-client-get-version-error",
    DotNetClient_GetVersionSuccess = "dotnet-client-get-version-success",
    DownloadCliBannerClosed = "download-cli-banner-closed",
    InitializationError = "initialization-error",
    InitializationSuccess = "initialization-success",
    KubeConfigCredentialsManager_CheckCredentialsPerf = "kubeconfig-credentials-manager-check-credentials-perf",
    KubeConfigCredentialsManager_RefreshCredentialsError = "kubeconfig-credentials-manager-refresh-credentials-error",
    KubeConfigCredentialsManager_RefreshCredentialsNecessary = "kubeconfig-credentials-manager-refresh-credentials-necessary",
    KubeConfigCredentialsManager_RefreshCredentialsPerf = "kubeconfig-credentials-manager-refresh-credentials-perf",
    KubeConfigCredentialsManager_RefreshCredentialsSuccess = "kubeconfig-credentials-manager-refresh-credentials-success",
    KubectlClient_AllFqdnsRetrievalError = "kubectl-client-all-fqdns-retrieval-error",
    KubectlClient_CommandError = "kubectl-client-command-error",
    KubectlClient_CommandSuccess = "kubectl-client-command-success",
    KubectlClient_CurrentContextRetrievalError = "kubectl-client-current-context-retrieval-error",
    KubectlClient_GetNamespacesError = "kubectl-client-get-namespaces-error",
    KubectlClient_GetVersionError = "kubectl-client-get-version-error",
    KubectlClient_GetVersionSuccess = "kubectl-client-get-version-success",
    KubectlClient_GetPodNameError = "kubectl-client-get-pod-name-error",
    KubectlClient_GetContainerListError = "kubectl-client-get-container-list-error",
    KubernetesPanelCustomizer_ApiUnavailableError = "kubernetes-panel-customizer-api-unavailable-error",
    KubernetesPanelCustomizer_SupportedFqdnEvaluation = "kubernetes-panel-customizer-supported-fqdn-evaluation",
    RemoteDevelopment_LearnMoreClicked = "remote-development-learn-more-clicked",
    StatusBar_MenuOpened = "status-bar-menu-opened",
    StatusBar_ValidatePrerequisitesError = "status-bar-validate-prerequisities-error",
    UnexpectedError = "unexpected-error",
    UnsupportedTargetResourceType = "unsupported-target-resource-type",
    UseKubernetesServiceEnvironmentVariables_PromptDisabled = "use-kubernetes-service-environment-variables-prompt-disabled",
    UseKubernetesServiceEnvironmentVariables_PromptShown = "use-kubernetes-service-environment-variables-prompt-shown",
    UseKubernetesServiceEnvironmentVariablesPrompt_LearnMoreClicked = "use-kubernetes-service-environment-variables-prompt-learn-more-clicked"
}