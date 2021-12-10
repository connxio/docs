# Management Api

The Management Api for ConnXio (CX) gives customers access to their subscriptions and company context programmatically. Using the endpoints provided by said Api will let you perform CRUD operations on integrations. By incorporating calls to the Management Api in CI/CD pipelines you can curate your transformations and integrations from within your own version control or DevOps system. The Api is hosted next to the Messaging Api and the swagger is found here: <https://cmh-prod-api-wa.azurewebsites.net/index.html> This page explains the technical details around the Api and contains examples of how to call and authorize towards it.

## Integration contract

Most of the complexity within the Management Api is connected to building the integration contract (also called model). This section will explain gotchas when programmatically creating the contract and details the contracts themselves.

The following is the base contract for an integration. Refer to the swagger for the Api for more information about required fields and to test the Api with your requests.

```csharp
public class IntegrationPostRequest
{
    public int PollingIntervalInSeconds { get; set; } = 60;
    public bool StopOnEncodingError { get; set; }
    public bool RemoveBom { get; set; }
    [Required]
    public string MessageInboundEncoding { get; set; }
    [Required]
    public string MessageInboundFormat { get; set; }
    [Required]
    public string Receiver { get; set; }
    [Required]
    public string Sender { get; set; }
    /// <summary>
    /// Not implemented
    /// </summary>
    public RetryOptions RetryOptions { get; set; }
    public List<LoggingWebhookConfig> LoggingWebhooks { get; set; }
    [Required]
    public string TransactionType { get; set; }
    [Required]
    public Guid SubscriptionId { get; set; }
    [Required]
    public string CompanyId { get; set; }
    [Required, MinLength(1)]
    public List<SubIntegrationViewModel> SubIntegrations { get; set; }
    [Required]
    public AdapterConnectionPropertiesViewModel InboundConnection { get; set; }
    [Required, MinLength(3)]
    public string Description { get; set; }
    [Required]
    public Guid ConfigCorrelationId { get; set; }
    /// <summary>
    /// In development
    /// </summary>
    public List<ResendWebhookConfig> ResendWebhooks { get; set; }
    public bool Enabled { get; set; }
}
```

The following contracts represent sub objects of the integration:

```csharp
public class SubIntegrationViewModel
{
    [Required]
    public Guid SubIntegrationId { get; set; }
    [Required, MinLength(3)]
    public string SubintegrationName { get; set; }
    /// <summary>
    /// Not implemented
    /// </summary>
    public string Receiver { get; set; }
    public SubintegrationLoggingConfigOverride LoggingWebhookOverrides { get; set; }
    public List<TransformationActionViewModel> Transformations { get; set; }
    public bool PassThrough { get; set; }
    [Required, MinLength(1)]
    public List<AdapterConnectionPropertiesViewModel> OutboundConnections { get; set; }
    [Required]
    public string MessageOutboundFormat { get; set; }
    [Required]
    public string MessageOutboundEncoding { get; set; }
    public bool Enabled { get; set; }
}
```

```csharp
public class TransformationActionViewModel
{
    [Required]
    public string TransformationType { get; set; }
    [Required]
    public string TransformationName { get; set; }
    [Required]
    public string Properties { get; set; }
}
```

```csharp
public class AdapterConnectionPropertiesViewModel
{
    [Required]
    public string AdapterType { get; set; }
    public string AdapterId { get; set; }
    public string AdapterName { get; set; }
    [Required]
    public string ConnectionProperties { get; set; }
    public AckOptionsViewModel AckOptions { get; set; }
}
```

```csharp
public class AckOptionsViewModel
{
    [Required]
    public bool SendAck { get; set; }
    [Required]
    public string AdapterType { get; set; }
    [Required]
    public string ConnectionProperties { get; set; }
    public string TransformationSasUri { get; set; }
    //public string TransformationId { get; set; }
    //public string TransformationVersion { get; set; }
    //public string AckOutboundFormat { get; set; }
    public bool SendNegativeAck { get; set; }
}
```

The following models are used for the `ConnectionProperties` property on the `AdapterConnectionPropertiesViewModel`. We deserialize the string into the classes. This is done to support a single model for multiple adapter use cases. To add ConnEction Properties you simply create a json corresponding to the contracts below and serialize it into string. An example of a complete request can be found [here](#a-complete-request-example).

```csharp
public class AzureStorageConnectionPropertiesParty
{
    public string StorageConnectionString { get; set; }
    public string StorageConnectionStringSecretNameAndVersion { get; set; }
    public string ContainerName { get; set; }
    public string Type { get; set; }
    public string Directory { get; set; }
    public int? BatchSize { get; set; }
    public string OutboundFilenamePattern { get; set; }
    public int? FilePickLimit { get; set; }
    public string FilePickSortType { get; set; }
}
```

```csharp
public class EmailConnectionPropertiesParty
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string PasswordSecretNameAndVersion { get; set; }
    public string Host { get; set; }
    public string HostType { get; set; }
    public string Port { get; set; }
    public bool SendAttachments { get; set; }
    public bool SendMessageBody { get; set; }
    public bool DeleteMessages { get; set; }
    public bool UseSsl { get; set; }
    public int? FilePickLimit { get; set; }
    public string FilePickSortType { get; set; }
}
```

```csharp
public class EventGridConnectionPropertiesParty
{
    public string EventGridStorageAccountConnectionString { get; set; }
    public string EventGridStorageAccountConnectionStringSecretNameAndVersion { get; set; }
    public string EventGridBlobContainerNameList { get; set; }
}
```

```csharp
public class RestConnectionPropertiesParty
{
    public string EndpointURL { get; set; }
    public string HTTPVerb { get; set; }
    public string AuthorizationHeaderType { get; set; }
    public string ApimSubscriptionKey { get; set; }
    public string ApimSubscriptionKeySecretNameAndVersion { get; set; }
    public string OAuthUrl { get; set; }
    public string OAuthBody { get; set; }
    public string OAuthClientId { get; set; }
    public string OAuthClientSecret { get; set; }
    public string OAuthClientSecretSecretNameAndVersion { get; set; }
    public Dictionary<string, string> Headers { get; set; }
    public string OAuthGrantType { get; set; }
    public string OAuthUserName { get; set; }
    public string OAuthPwd { get; set; }
    public string OAuthResource { get; set; }
    public string OAuthScope { get; set; }
    public string BasicAuthenticationUserName { get; set; }
    public string BasicAuthenticationPassword { get; set; }
    public string BasicAuthenticationPasswordSecretNameAndVersion { get; set; }
    public string NewInternalMessageCorrelationId { get; set; }
    public bool NewInternalMessagePreserveInterchangeId { get; set; }
    public bool UseFallBackOnRequestFailed { get; set; }
    public bool FallBackOnThreeHoundred { get; set; }
    public bool FallBackOnFourHoundred { get; set; }
    public bool FallBackOnFiveHoundred { get; set; }
    public RestConnectionPropertiesParty RestConnectionPropertiesSecondary { get; set; }
    public bool UseStaticIp { get; set; }
}
```

```csharp
public class ServiceBusConnectionPropertiesParty
{
    public string TopicConnectionString { get; set; }
    public string TopicConnectionStringSecretNameAndVersion { get; set; }
    public string TopicName { get; set; }
    public string SubscriptionName { get; set; }
    public bool UsePureMessageSending { get; set; }
    public int? FilePickLimit { get; set; }
}
```

```csharp
public class SftpConnectionPropertiesParty
{
    public string Url { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public string PasswordSecretName { get; set; }
    public string PasswordSecretVersion { get; set; }
    public string Directory { get; set; }
    public string CopyMoveFolder { get; set; }
    public string FileMask { get; set; }
    public int? BatchSize { get; set; }
    public int? ConcurrentSftpInstances { get; set; }
    public bool LockOnFolder { get; set; }
    public bool PerformDuplicateDetection { get; set; }
    public bool TerminateOnDuplicateDetection { get; set; }
    public string OutboundFilenamePattern { get; set; }
    public bool UseStaticIp { get; set; }
    public int? FilePickLimit { get; set; }
    public string FilePickSortType { get; set; }
    public string SshHostKeyFingerprint { get; set; }
}
```

### A complete request example

We have included a complete example of an integration request. The example is relevant for both GET and POST actions.

```json
{
    "configCorrelationId": "dd1890bf-0394-460b-930b-1a3bdc5eb24e",
    "description": "asdasdasdasdasd",
    "inboundConnection": {
        "adapterType": "Api",
        "adapterId": null,
        "adapterName": null,
        "connectionProperties": "null",
        "ackOptions": null
    },
    "subIntegrations": [
        {
            "subIntegrationId": "66f8d203-dac8-4283-afae-57df595151e6",
            "subintegrationName": "asd",
            "sender": "",
            "receiver": "",
            "loggingWebhookOverrides": null,
            "transformations": [],
            "passThrough": false,
            "outboundConnections": [
                {
                    "adapterType": "REST",
                    "adapterId": "7809431a-ce84-47f2-b055-627d7d296ca8",
                    "adapterName": "google.com",
                    "connectionProperties": "{\"endpointURL\":\"google.com\",\"httpVerb\":\"POST\",\"webhookConnectionId\":\"\",\"authorizationHeaderType\":\"none\",\"apimSubscriptionKey\":{\"decryptedValue\":null,\"name\":null,\"version\":null},\"oAuthUrl\":null,\"oAuthBody\":null,\"oAuthClientId\":null,\"oAuthClientSecret\":null,\"headers\":{},\"oAuthGrantType\":null,\"oAuthUserName\":null,\"oAuthPwd\":{\"decryptedValue\":null,\"name\":null,\"version\":null},\"oAuthResource\":null,\"oAuthScope\":null,\"basicAuthenticationUserName\":null,\"basicAuthenticationPassword\":{\"decryptedValue\":null,\"name\":null,\"version\":null},\"newInternalMessageCorrelationId\":\"\",\"newInternalMessagePreserveInterchangeId\":false,\"useFallBackOnRequestFailed\":false,\"fallBackOnThreeHoundred\":false,\"fallBackOnFourHoundred\":false,\"fallBackOnFiveHoundred\":false,\"restConnectionPropertiesSecondary\":{\"endpointURL\":\"\",\"httpVerb\":\"\",\"webhookConnectionId\":null,\"authorizationHeaderType\":null,\"apimSubscriptionKey\":{\"decryptedValue\":null,\"name\":null,\"version\":null},\"oAuthUrl\":null,\"oAuthBody\":null,\"oAuthClientId\":null,\"oAuthClientSecret\":null,\"headers\":null,\"oAuthGrantType\":null,\"oAuthUserName\":null,\"oAuthPwd\":null,\"oAuthResource\":null,\"oAuthScope\":null,\"basicAuthenticationUserName\":null,\"basicAuthenticationPassword\":null,\"newInternalMessageCorrelationId\":null,\"newInternalMessagePreserveInterchangeId\":false,\"useFallBackOnRequestFailed\":false,\"fallBackOnThreeHoundred\":false,\"fallBackOnFourHoundred\":false,\"fallBackOnFiveHoundred\":false,\"restConnectionPropertiesSecondary\":null,\"useStaticIp\":false},\"useStaticIp\":false}"
                }
            ],
            "messageOutboundFormat": "asd",
            "messageOutboundEncoding": "utf-8",
            "internalProperties": null,
            "enabled": true
        }
    ],
    "companyName": "Kjetil",
    "companyId": "176746ff-72cb-46a0-89bc-4984b10a4d41",
    "subscriptionName": "KjetilDemo",
    "subscriptionId": "49f74a13-82fe-7da0-92be-8fab946cbddc",
    "transactionType": "Test",
    "loggingWebhooks": [],
    "resendWebhooks": [
        {
            "usePureMessageSending": false,
            "contract": 0,
            "endpointURL": null,
            "httpVerb": null,
            "webhookConnectionId": "",
            "adapterType": 8,
            "queryString": "",
            "maxRetries": 5,
            "timeout": 300,
            "authorizationHeaderKey": null,
            "type": 0,
            "enabled": false
        }
    ],
    "internalLoggingOptions": {
        "logLevel": 2,
        "logMessageContent": true,
        "logMetaData": true
    },
    "internalResendOptions": null,
    "retryOptions": null,
    "sender": "new",
    "receiver": "asd",
    "messageInboundFormat": "xml",
    "messageInboundEncoding": "utf-8",
    "removeBom": false,
    "internalProperties": null,
    "stopOnEncodingError": false,
    "pollingIntervalInSeconds": 60,
    "lastExecutionTimeStampUtc": "0001-01-01T00:00:00",
    "enabled": false,
    "id": "559d6c0b-6f38-4f0a-92c5-4ce64eec4de0",
    "correlationId": null,
    "apimSubscription": null,
    "eTag": "\"40098dab-0000-0d00-0000-61b096e90000\"",
    "cosmosEntityName": "MessageHub.Models.Integration.IntegrationConfig",
    "createdBy": null,
    "updatedBy": null,
    "createdAtUtc": null,
    "updatedAtUtc": null,
    "deletedAtUtc": null,
    "deletedBy": null
}
```
