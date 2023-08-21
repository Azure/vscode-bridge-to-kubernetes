// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import * as sinon from 'sinon';
import { CommandRunner } from '../../clients/CommandRunner';
import { KubectlClient } from '../../clients/KubectlClient';
import { Logger } from '../../logger/Logger';
import { IKubernetesIngress } from '../../models/IKubernetesIngress';
import { AccountContextManager } from '../../models/context/AccountContextManager';
import { IKubernetesService } from '../../models/IKubernetesService';

describe(`KubectlClient Test`, () => {
    let loggerStub, accountContextManagerStub;
    beforeEach(() => {
        sinon.restore();
        loggerStub = sinon.createStubInstance(Logger);
        loggerStub.log.returns(async () => { });
        loggerStub.error.returns(async () => { });
        loggerStub.trace.returns(async () => { });
        accountContextManagerStub = sinon.createStubInstance(AccountContextManager);
    });
    it(`getIngressesAsync when the kubectl command returns a set of various ingresses`, async () => {
        const returnString = `{
            "apiVersion": "v1",
            "items": [
                {
                    "apiVersion": "extensions/v1beta1",
                    "kind": "Ingress",
                    "metadata": {
                        "annotations": {
                            "kubernetes.io/ingress.class": "traefik",
                            "meta.helm.sh/release-name": "bikesharingsampleapp",
                            "meta.helm.sh/release-namespace": "dev"
                        },
                        "creationTimestamp": "2020-05-12T01:02:49Z",
                        "generation": 1,
                        "labels": {
                            "app": "bikesharingweb",
                            "app.kubernetes.io/managed-by": "Helm",
                            "chart": "bikesharingweb-0.1.0",
                            "heritage": "Helm",
                            "release": "bikesharingsampleapp"
                        },
                        "name": "bikesharingweb",
                        "namespace": "dev",
                        "resourceVersion": "1314825",
                        "selfLink": "/apis/extensions/v1beta1/namespaces/dev/ingresses/bikesharingweb",
                        "uid": "8044fe48-4e8c-454b-b8de-553d0988666e"
                    },
                    "spec": {
                        "rules": [
                            {
                                "host": "dev.bikesharingweb.j7l6v4gz8d.eus.mindaro.io",
                                "http": {
                                    "paths": [
                                        {
                                            "backend": {
                                                "serviceName": "bikesharingweb",
                                                "servicePort": "http"
                                            },
                                            "path": "/"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "status": {
                        "loadBalancer": {
                            "ingress": [
                                {
                                    "ip": "13.72.80.227"
                                }
                            ]
                        }
                    }
                },
                {
                    "apiVersion": "extensions/v1beta1",
                    "kind": "Ingress",
                    "metadata": {
                        "annotations": {
                            "kubernetes.io/ingress.class": "traefik",
                            "meta.helm.sh/release-name": "bikesharingsampleapp",
                            "meta.helm.sh/release-namespace": "dev"
                        },
                        "creationTimestamp": "2020-05-12T01:02:49Z",
                        "generation": 1,
                        "labels": {
                            "app": "gateway",
                            "app.kubernetes.io/managed-by": "Helm",
                            "chart": "gateway-0.1.0",
                            "heritage": "Helm",
                            "release": "bikesharingsampleapp"
                        },
                        "name": "gateway",
                        "namespace": "dev",
                        "resourceVersion": "1314824",
                        "selfLink": "/apis/extensions/v1beta1/namespaces/dev/ingresses/gateway",
                        "uid": "0b61f6fa-f6ad-4a01-b1b2-89255bed41ca"
                    },
                    "spec": {
                        "rules": [
                            {
                                "host": "dev.gateway.j7l6v4gz8d.eus.mindaro.io",
                                "http": {
                                    "paths": [
                                        {
                                            "backend": {
                                                "serviceName": "gateway",
                                                "servicePort": "http"
                                            },
                                            "path": "/"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "status": {
                        "loadBalancer": {
                            "ingress": [
                                {
                                    "ip": "13.72.80.227"
                                }
                            ]
                        }
                    }
                }
            ]
        }`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        let ingresses: IKubernetesIngress[];
        ingresses = await kubectlClient.getIngressesAsync(`dev`, `c:/users/alias/.kube/config`, true);

        expect(ingresses.length).to.equal(2);
        expect(ingresses[0].name).to.equal(`bikesharingweb`);
        expect(ingresses[0].namespace).to.equal(`dev`);
        expect(ingresses[0].host).to.equal(`dev.bikesharingweb.j7l6v4gz8d.eus.mindaro.io`);
        expect(ingresses[0].protocol).to.equal(`http`);
        expect(ingresses[1].name).to.equal(`gateway`);
        expect(ingresses[1].namespace).to.equal(`dev`);
        expect(ingresses[1].host).to.equal(`dev.gateway.j7l6v4gz8d.eus.mindaro.io`);
        expect(ingresses[1].protocol).to.equal(`http`);
    });

    it(`getIngressesAsync when the kubectl command returns no ingresses`, async () => {
        const returnString = `{ "items": [] }`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        const ingresses: IKubernetesIngress[] = await kubectlClient.getIngressesAsync(`dev`, `c:/users/alias/.kube/config`, true);

        expect(ingresses.length).to.equal(0);
    });

    it(`getServicesAsync when the kubectl command returns a set of various services`, async () => {
        const returnString = `{
                        "items": [
                            {
                                "metadata": {
                                    "name": "bikes",
                                    "namespace": "dev"
                                },
                                "spec": {
                                    "selector": {
                                        "app": "bikes",
                                        "release": "bikesharing"
                                    }
                                }
                            },
                            {
                                "metadata": {
                                    "name": "routingmanager-service",
                                    "namespace": "dev"
                                },
                                "spec": {
                                    "selector": {
                                        "app": "routingmanager-service",
                                        "release": "routingmanager"
                                    }
                                }
                            },
                            {
                                "metadata": {
                                    "name": "bikesharingweb",
                                    "namespace": "dev"
                                },
                                "spec": {
                                    "selector": {
                                        "app": "bikesharingweb",
                                        "release": "bikesharing"
                                    }
                                }
                            },
                            {
                                "metadata": {
                                    "labels": {
                                        "routing.visualstudio.io/generated": "true"
                                    },
                                    "name": "bikesharingwebclone",
                                    "namespace": "dev"
                                },
                                "spec": {
                                    "selector": {
                                        "app": "bikesharingwebclone",
                                        "release": "bikesharing"
                                    }
                                }
                            }
                        ]
                    }`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        const services: IKubernetesService[] = await kubectlClient.getServicesAsync();

        expect(services.length).to.equal(2);
        expect(services[0].name).to.equal(`bikes`);
        expect(services[0].namespace).to.equal(`dev`);
        expect(services[0].selector[`app`]).to.equal(`bikes`);
        expect(services[0].selector[`release`]).to.equal(`bikesharing`);
        expect(services[1].name).to.equal(`bikesharingweb`);
        expect(services[1].namespace).to.equal(`dev`);
        expect(services[1].selector[`app`]).to.equal(`bikesharingweb`);
        expect(services[1].selector[`release`]).to.equal(`bikesharing`);
    });

    it(`getServicesAsync when the kubectl command returns no services`, async () => {
        const returnString = `{ "items": [] }`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        const services: IKubernetesService[] = await kubectlClient.getServicesAsync();

        expect(services.length).to.equal(0);
    });

    it(`getNamespacesAsync when the kubectl command returns a set of various namespaces`, async () => {
        const returnString = `default kube-node-lease voting-app`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        const namespaces: string[] = await kubectlClient.getNamespacesAsync(`c:/users/alias/.kube/config`);

        expect(namespaces.length).to.equal(3);
        expect(namespaces[0]).to.equal(`default`);
        expect(namespaces[1]).to.equal(`kube-node-lease`);
        expect(namespaces[2]).to.equal(`voting-app`);
    });
    it(`getServicesAsync when the kubectl command returns services in system namespaces`, async () => {
        const returnString = `{
            "items": [
                {
                    "metadata": {
                        "name": "azds-webhook-service",
                        "namespace": "azds"
                    },
                    "spec": {
                        "selector": {
                            "component": "azds-injector-webhook",
                            "service": "azds-webhook-service"
                        }
                    }
                },
                {
                    "metadata": {
                        "name": "kube-public-service",
                        "namespace": "kube-public"
                    }
                },
                {
                    "metadata": {
                        "name": "bikes",
                        "namespace": "dev"
                    },
                    "spec": {
                        "selector": {
                            "app": "bikes",
                            "release": "bikesharing"
                        }
                    }
                },
                {
                    "metadata": {
                        "name": "kube-dns",
                        "namespace": "kube-system"
                    },
                    "spec": {
                        "selector": {
                            "k8s-app": "kube-dns"
                        }
                    }
                }
            ]
        }`;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.returns(returnString);
        const kubectlClient = new KubectlClient(`my/path/kubectl.exe`, commandRunnerStub, accountContextManagerStub, loggerStub);
        const services: IKubernetesService[] = await kubectlClient.getServicesAsync();

        // Validate that the services in system namespaces have been filtered out properly.
        expect(services.length).to.equal(1);
        expect(services[0].name).to.equal(`bikes`);
        expect(services[0].namespace).to.equal(`dev`);
        expect(services[0].selector[`app`]).to.equal(`bikes`);
        expect(services[0].selector[`release`]).to.equal(`bikesharing`);
    });
});