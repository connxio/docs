import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "connxio-api",
    },
    {
      type: "category",
      label: "Code components",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-codecomponents",
          label: "List all code components",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-codecomponents",
          label: "Upsert a code component",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-api-v-3-codecomponents-id",
          label: "Find the newest code component by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "delete-api-v-3-codecomponents-id",
          label: "Delete code component by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "get-api-v-3-codecomponents-id-versions",
          label: "List all code components versions by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-codecomponents-id-deprecate",
          label: "Deprecate a code component by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "put-api-v-3-codecomponents-id-updatename",
          label: "Update code component name by id",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Environment variables",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-environmentvariables",
          label: "List all environment variables",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-environmentvariables",
          label: "Upsert an environment variable",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-api-v-3-environmentvariables-id",
          label: "Find environment variable by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "delete-api-v-3-environmentvariables-id",
          label: "Deletes environment variable by id",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Error",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-error-subscription",
          label: "Lists a page of persisted errors for the current subscription.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-error-interchange-interchange-id",
          label: "Gets the persisted error for one interchange identifier.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-error-integration-integration-id",
          label: "Lists a page of persisted errors for one integration in the current subscription.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-integrations",
          label: "List all action-based integrations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "post-api-v-3-integrations",
          label: "Upsert an action-based integration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "get-api-v-3-integrations-id",
          label: "Find action-based integration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-integrations-id",
          label: "Update an action-based integration by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "delete-api-v-3-integrations-id",
          label: "Delete integration by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "post-api-v-3-integrations-novalidation",
          label: "Upsert an action-based integration without graph validation. If the integration does not validate, it will be set to disabled.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Messages",
      items: [
        {
          type: "doc",
          id: "post-api-v-3-messages-integration-id",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "post-api-v-3-messages-integration-id-batch",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "post-api-v-3-messages-integration-id-eventgrid",
          label: "Sends an Event Grid message to Connxio.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Performance",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-performance-company",
          label: "Lists a page of performance metrics for the current company.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-performance-subscription",
          label: "Lists a page of performance metrics for the current subscription.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-performance-interchange-interchange-id",
          label: "Gets the performance metric for one interchangeId.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-performance-integration-integration-id",
          label: "Lists performance metrics for one integration.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-schemas",
          label: "List metadata for the latest version of all schemas",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-schemas",
          label: "Create a schema or upload a new version",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-api-v-3-schemas-id",
          label: "Find the newest schema by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "delete-api-v-3-schemas-id",
          label: "Delete a schema and all of its versions",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "get-api-v-3-schemas-id-versions",
          label: "List all schema versions by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-schemas-id-versions-schema-version-content",
          label: "Get the JSON content for a schema version",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-schemas-id-deprecate",
          label: "Deprecate a schema version",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Security configurations",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-securityconfigs",
          label: "List all security configurations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "put-api-v-3-securityconfigs",
          label: "Upsert a security configuration",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "get-api-v-3-securityconfigs-id",
          label: "Find security configuration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "delete-api-v-3-securityconfigs-id",
          label: "Deletes security configuration by id",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Subscriptions",
      items: [
        {
          type: "doc",
          id: "get-api-v-3-subscriptions",
          label: "List all subscriptions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "get-api-v-3-subscriptions-current",
          label: "Get current subscription",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
