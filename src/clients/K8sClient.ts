
import * as k8s from '@kubernetes/client-node';
export class K8sClient {
    public readonly k8sApi: k8s.CoreV1Api;
    public constructor() {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    }
}