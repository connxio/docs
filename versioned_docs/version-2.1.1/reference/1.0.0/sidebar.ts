import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reference/1.0.0/connxio-api",
    },
    {
      type: "category",
      label: "Integration",
      items: [
        {
          type: "doc",
          id: "reference/1.0.0/get-api-v-1-management-integration",
          label: "Gets a list of integration configurations for the subscription",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-management-integration",
          label: "Creates or updates an integration configuration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/get-api-v-1-management-integration-id",
          label: "Gets the integration configuration corresponding to the configCorrelationId",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/1.0.0/delete-api-v-1-management-integration-id-subscription-subscription-id",
          label: "Deletes the integration configuration corresponding to the configCorrelationId",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Message",
      items: [
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-message",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-message-new-batch",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-message-new",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-eventgrid",
          label: "Sends an Event Grid message to Connxio. Use query parameters for metadata and the full content body for the Event Grid message.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Resend",
      items: [
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-resend-archeo",
          label: "Resend a resendable Archeo Logstep",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/post-api-v-1-resend-archeo-restart",
          label: "Resend any Archeo Logstep from the begynning of the trasaction",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Subscription",
      items: [
        {
          type: "doc",
          id: "reference/1.0.0/get-api-v-1-management-subscription",
          label: "Returns the list of subscriptions for a company",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
