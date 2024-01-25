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
          id: "reference/1.0.0/integration-get-all",
          label: "Gets a list of integration configurations for the subscription",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/1.0.0/integration-post",
          label: "Creates or updates an integration configuration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/integration-get",
          label: "Gets the integration configuration corresponding to the configCorrelationId",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reference/1.0.0/integration-delete",
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
          id: "reference/1.0.0/message-post",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/message-post-2",
          label: "Sends a batch of messages to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/message-post-3",
          label: "Sends a single message to Connxio",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/message-post-4",
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
          id: "reference/1.0.0/resend-archeo",
          label: "Resend a resendable Archeo Logstep",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reference/1.0.0/resend-archeo-restart",
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
          id: "reference/1.0.0/subscription-get",
          label: "Returns the list of subscriptions for a company",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
