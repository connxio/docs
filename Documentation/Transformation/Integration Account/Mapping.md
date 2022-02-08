# Integration Account Mapping

Integration account mapping is built upon [Azure Integration Account](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-create-integration-account?tabs=azure-portal) and uses the [maps feature](https://docs.microsoft.com/en-us/azure/templates/microsoft.logic/integrationaccounts/maps?tabs=bicep). This is specialized enterprise functionality that requires in-depth knowledge of advanced BizTalk features. We do not recommend using this feature unless you have said knowledge and experience.

## Limitations

There are pretty stringent limitations on Integration Account features. We do not recommend using this transformation type for high traffic integrations (ie. traffic above 100 messages per day), since high traffic causes delays and failures towards the service itself. We are, on the other hand, interested in working together with our customers to create good integrations, so if you feel the need to run high traffic integrations through this feature please contact your ConnXio representative.

## Creating an integration account mapping

This process is a lot more involved that other types of transformations. First of all you need to contact us to plan and upload your mapping file. When this is done we will return with an Id that you can use to activate the mapping in the transformation shape of the configuration interface.
