import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reference/connxio-api",
    },
    {
      type: "category",
      label: "Code components",
      items: [
        {
          type: "doc",
          id: "reference/get-api-v-2-codecomponents",
          label: "List all code components",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-codecomponents",
          label: "Upsert a code component",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/get-api-v-2-codecomponents-id",
          label: "Find the newest code component by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/delete-api-v-2-codecomponents-id",
          label: "Delete code component by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/get-api-v-2-codecomponents-id-versions",
          label: "List all code components versions by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-codecomponents-id-deprecate",
          label: "Deprecate a code component by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-codecomponents-id-updatename",
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
          id: "reference/get-api-v-2-environmentvariables",
          label: "List all environment variables",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-environmentvariables",
          label: "Upsert an environment variable",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/get-api-v-2-environmentvariables-id",
          label: "Find environment variable by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/delete-api-v-2-environmentvariables-id",
          label: "Deletes environment variable by id",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations",
      items: [
        {
          type: "doc",
          id: "reference/get-api-v-2-integrations",
          label: "List all integrations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/post-api-v-2-integrations",
          label: "Upsert an integration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/get-api-v-2-integrations-id",
          label: "Find integration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-integrations-id",
          label: "Update integration by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/delete-api-v-2-integrations-id",
          label: "Delete integration by id",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Messages",
      items: [
        {
          type: "doc",
          id: "reference/post-api-v-2-messages-integration-id",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/post-api-v-2-messages-integration-id-batch",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/post-api-v-2-messages-integration-id-eventgrid",
          label: "Sends an Event Grid message to Connxio.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Security configurations",
      items: [
        {
          type: "doc",
          id: "reference/get-api-v-2-securityconfigs",
          label: "List all security configurations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-2-securityconfigs",
          label: "Upsert a security configuration",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/get-api-v-2-securityconfigs-id",
          label: "Find security configuration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/delete-api-v-2-securityconfigs-id",
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
          id: "reference/get-api-v-2-subscriptions",
          label: "List all subscriptions",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
