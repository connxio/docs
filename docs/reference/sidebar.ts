import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reference/connxio-api",
    },
    {
      type: "category",
      label: "Error",
      items: [
        {
          type: "doc",
          id: "reference/get-api-v-3-error-subscription",
          label: "Lists a page of persisted errors for the current subscription.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-error-interchange-interchange-id",
          label: "Gets the persisted error for one interchange identifier.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-error-integration-integration-id",
          label: "Lists a page of persisted errors for one integration in the current subscription.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Messages",
      items: [
        {
          type: "doc",
          id: "reference/post-api-v-3-messages-integration-id",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/post-api-v-3-messages-integration-id-batch",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/post-api-v-3-messages-integration-id-eventgrid",
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
          id: "reference/get-api-v-3-performance-company",
          label: "Lists a page of performance metrics for the current company.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-performance-subscription",
          label: "Lists a page of performance metrics for the current subscription.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-performance-interchange-interchange-id",
          label: "Gets the performance metric for one interchangeId.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-performance-integration-integration-id",
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
          id: "reference/get-api-v-3-schemas",
          label: "List metadata for the latest version of all schemas",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-3-schemas",
          label: "Create a schema or upload a new version",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-schemas-id",
          label: "Find the newest schema by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/delete-api-v-3-schemas-id",
          label: "Delete a schema and all of its versions",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-schemas-id-versions",
          label: "List all schema versions by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/get-api-v-3-schemas-id-versions-schema-version-content",
          label: "Get the JSON content for a schema version",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/put-api-v-3-schemas-id-deprecate",
          label: "Deprecate a schema version",
          className: "api-method put",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
