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
          id: "reference/code-components-get",
          label: "List all code components",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/code-components-put",
          label: "Upsert a code component",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/code-components-get-2",
          label: "Find the newest code component by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/code-components-delete",
          label: "Delete code component by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/code-components-get-versions",
          label: "List all code components versions by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/code-components-deprecate",
          label: "Deprecate a code component by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/code-components-update-name",
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
          id: "reference/environment-variables-get-all-for-company",
          label: "List all environment variables",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/environment-variables-put",
          label: "Upsert an environment variable",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/environment-variables-get",
          label: "Find environment variable by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/environment-variables-delete",
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
          id: "reference/integrations-get-all",
          label: "List all integrations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/integrations-post",
          label: "Upsert an integration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/integrations-get",
          label: "Find integration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/integrations-put",
          label: "Update integration by id",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/integrations-delete",
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
          id: "reference/messages-post",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/messages-post-2",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/messages-post-3",
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
          id: "reference/security-configs-get-all",
          label: "List all security configurations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/security-configs-put",
          label: "Upsert a security configuration",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/security-configs-get",
          label: "Find security configuration by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/security-configs-delete",
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
          id: "reference/subscriptions-get",
          label: "List all subscriptions",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
