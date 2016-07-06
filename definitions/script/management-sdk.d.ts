import Q = require("q");
import Promise = Q.Promise;
import { AccessKey, Account, App, CollaboratorMap, Deployment, DeploymentMetrics, Headers, Package, PackageInfo, Session } from "./types";
declare class AccountManager {
    static AppPermission: {
        OWNER: string;
        COLLABORATOR: string;
    };
    static SERVER_URL: string;
    private static API_VERSION;
    private _accessKey;
    private _serverUrl;
    private _customHeaders;
    private _proxy;
    constructor(accessKey: string, customHeaders?: Headers, serverUrl?: string, proxy?: string);
    accessKey: string;
    isAuthenticated(): Promise<boolean>;
    addAccessKey(friendlyName: string, ttl?: number): Promise<AccessKey>;
    getAccessKey(accessKeyName: string): Promise<AccessKey>;
    getAccessKeys(): Promise<AccessKey[]>;
    getSessions(): Promise<Session[]>;
    patchAccessKey(oldName: string, newName?: string, ttl?: number): Promise<AccessKey>;
    removeAccessKey(name: string): Promise<void>;
    removeSession(machineName: string): Promise<void>;
    getAccountInfo(): Promise<Account>;
    getApps(): Promise<App[]>;
    getApp(appName: string): Promise<App>;
    addApp(appName: string): Promise<App>;
    removeApp(appName: string): Promise<void>;
    renameApp(oldAppName: string, newAppName: string): Promise<void>;
    transferApp(appName: string, email: string): Promise<void>;
    getCollaborators(appName: string): Promise<CollaboratorMap>;
    addCollaborator(appName: string, email: string): Promise<void>;
    removeCollaborator(appName: string, email: string): Promise<void>;
    addDeployment(appName: string, deploymentName: string): Promise<Deployment>;
    clearDeploymentHistory(appName: string, deploymentName: string): Promise<void>;
    getDeployments(appName: string): Promise<Deployment[]>;
    getDeployment(appName: string, deploymentName: string): Promise<Deployment>;
    renameDeployment(appName: string, oldDeploymentName: string, newDeploymentName: string): Promise<void>;
    removeDeployment(appName: string, deploymentName: string): Promise<void>;
    getDeploymentMetrics(appName: string, deploymentName: string): Promise<DeploymentMetrics>;
    getDeploymentHistory(appName: string, deploymentName: string): Promise<Package[]>;
    release(appName: string, deploymentName: string, fileOrPath: File | string, targetBinaryVersion: string, updateMetadata: PackageInfo, uploadProgressCallback?: (progress: number) => void): Promise<void>;
    patchRelease(appName: string, deploymentName: string, label: string, updateMetadata: PackageInfo): Promise<void>;
    promote(appName: string, sourceDeploymentName: string, destinationDeploymentName: string, updateMetadata: PackageInfo): Promise<void>;
    rollback(appName: string, deploymentName: string, targetRelease?: string): Promise<void>;
    private get(endpoint, expectResponseBody?);
    private post(endpoint, requestBody, expectResponseBody, contentType?);
    private patch(endpoint, requestBody, expectResponseBody?, contentType?);
    private del(endpoint, expectResponseBody?);
    private makeApiRequest(method, endpoint, requestBody, expectResponseBody, contentType);
    private getErrorMessage(error, response);
    private attachCredentials(request);
}
export = AccountManager;
