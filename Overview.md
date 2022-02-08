
# What is ConnXio?

- [What is ConnXio?](#what-is-connxio)
  - [Integration by Configuration](#integration-by-configuration)
  - [Robustness](#robustness)
  - [A tool or a platform](#a-tool-or-a-platform)
- [Why use ConnXio?](#why-use-connxio)
  - [Cost Saving](#cost-saving)
  - [Soft Lock-In](#soft-lock-in)

When we decided to explore the concept of an *integration by configuration* solution we used every ounce of our experience and insight into the integration challenges of our customers, our employees and the business at large to imagine a tool that could help everyone develop more robust integration-solutions faster, smarter and cheaper.  With the advent of ConnXio we've reached that goal, and we are proud to announce our solution to the world.

## Integration by Configuration

Some of you may have heard of iPAAS (integration platform as a service) solutions and products, ConnXio falls squarely into this space as well. We call it *Integration by Configuration* and supply our users with a user friendly, robust and pre-defined interface for creating configurations which in turn corresponds directly to an integration which can be edited and released on the fly.

## Robustness

By using a PAAS solution to perform integration and file transfer, the source systems can outsource not only the actual work but also the demands of logging, resending, stability and performance. By using ConnXio you force your solutions into a pattern which gives your internal systems something to compete with in terms of quality as well as a standard for which to build you own integrations when necessary.

By leveraging distributed cloud and computing principles we made ConnXio faster and more scalable than normal in-house platforms and solutions have the ability to be. We scale our internal systems on demand and always try to have plenty of power left in the tank.

## A tool or a platform

ConnXio can be used both as a tool and a platform. **When used as a tool** it integrates seamlessly into an already established or in progress integration platform as a purveyor of easy to use integration on the fly. In this mode you usually leverage ConnXio where you need to do cookie-cutter integration that is time consuming and often times boring for programmers to deal with. Your core integration flows and large scale advanced transfer needs can also leverage ConnXio as part of the solution or as a last point proxy, but you use the ConnXio tool where appropriate and custom code where not. When used as a tool proxy services between ConnXio and external systems are created when necessary or more efficient for the process at hand. This mode is mostly used by large integration departments and big business customers.

**When used as a platform** ConnXio acts as a complete integration solution that handles all aspects of integration from fetching of messages to mapping, transformations, enrichment, splitting and eventually sending to external or internal systems. There are usually no proxy's used either from the internal systems or to the external systems. This mode is usually used by smaller integration departments or by businesses who want pure integration as a service.

Even though ConnXio works both as a tool and a platform neither of the modes are mutually exclusive and both modes really just require a shift in perception and are detailed here mostly to illuminate the potential of ConnXio.

# Why use ConnXio?

## Cost Saving

ConnXio (CX) is built to decrease costs on boilerplate and semi advanced integration. With a library of adapters and an interchangeable transformation system, its main concern is to help our customers on their way to create faster, more dynamic, stable and secure integrations.

Let us take a look at the different parts and concepts that together create the building blocks of CX and how they help our customers save costs.

**Adapters** are the fundamental building block that facilitates the actual transfer and sending of data from system to system. Creating code to connect to different cloud services like blob and ServiceBus or protocol like SFTP and email is one of the most time consuming and redundant programming challenges that face a lot of software development teams within integration. To mitigate the mind-numbing boredom of tackling this challenge, CX offers adapters that have been built and added to over long periods of time to cover even the strangest edge cases of file transfer. The adapters are also continually developed as times and technology changes and comes with a set of logging options that ensure traceability even on very simple integration scenarios. In terms of cost reduction, the actual implementation cost of these service-connections and the continued development and the traceability and fault handling are essentially eliminated from the customers expenses and put on the product instead.

**Transformations** provide the customer with a way to create small pieces of code or BizTalk mappings++ to perform transformations on data of all types and sizes. The formats with the most built-in support within CX are XML and Json. With these formats the customer can enjoy a plethora ready-made functionality to collect tertiary data to supplement transformations, prettify messages or convert them between formats. This saves costs for our customers by either eliminating the need for actual transformation or making the transformation simpler and a lot easier to manage with versioning and on the fly production environment bug fixing possibilities.

**Traceability** and fault handling is built into CX and is always modified and upgraded to suit our customers need. Because CX’s integration transfer is standardized the days of choosing which integration flows you want to be able to trace is over. All flows configured in CX receive the same fault handling and traceability as the most complex and tweaked solutions. This saves costs by elevating all integration flows to a premium traceability and fault handling level and saves the customer the development cost of doing this for their own flows again and again, possibly with varying results.

## Soft Lock-In

First of all, let’s look at the practical definition of the “Vendor lock-in” from Wikipedia:
> “In economics, vendor lock-in, also known as proprietary lock-in or customer lock-in, makes a customer dependent on a vendor for products and services, unable to use another vendor without substantial switching costs. Lock-in costs that create barriers to market entry may result in antitrust action against a monopoly. “

This effect is especially easy to quantify within cloud computing seeing as cloud providers like Amazon, Microsoft and others create massive eco systems around their platforms, that in some cases are designed specifically to be difficult to escape from. It is also a big factor within software architecture where both programming language, library specific choices and platforms create some sort of vendor lock-in. Some of this can be mitigated with containerization, but since containerization is in and of itself a sort of lock-in, this leaves the customer in a world where lock-in is impossible to escape in some sense and maybe even preferential to a massive ballooning in scope and complexity.

This is obviously a gross oversimplification of the concept, but gives us a thin foundation to build some arguments upon, which is why we will now take a closer look at ConnXio (CX) specifically and what lock-ins our cloud service demands, avoids and mitigates.

CX is a product that acts as a middleman between applications. We offer a service that is mostly stateless (has no long-lived internal data store or database) and which offers highly customizable logging and event connections that use the customers choice of third-party applications or internally built services. From this perspective CX is a lot better equipped to deal with vendor lock-in compared to many other services that internalize these processes.

**First**, CX’s stateless nature lends itself to portability in a way that stateful services cannot. One of the principal concerns when evaluating vendor lock-in is looking at data extraction, which becomes a moot point in CX. The only applicable data is transferred to the customers choice of logging solution and is therefore not even accessible to CX itself, and since the customer chooses the logging solution the lock-in lies with that party rather than CX. All other data used in our product to facilitate the middleman process is hard deleted after 7 days and is only used for internal transportation and configuration.

**Secondly**, the transformations that make up the backbone of CX’s configurable functionality is hosted and available to customers and is either created in C# .net standard 2.0 or in Microsoft’s own Integration account mapping functionality. In the latter instance the vendor lock-in lies with Microsoft’s BizTalk platform and not with CX. In the former scenario the lock-in lies with the C# language and platform only and can be ported to all cloud services that can run either containers or C# code natively.

**Thirdly**, since CX is based upon adapters (pieces of code that are made to retrieve or send data through one or more protocols) the customer does not need to create, generalize and fault handle their own method of protocol handling and transfer. Regarding vendor lock-in this creates less of a lock-in and more of a void that needs to be filled in the event of cancelling the service. Since the adapters are maintained and created by a team over a long period of time with strict security, performance and stability requirements, recreation of this functionality could incur a large cost to the customer unless they specifically change to a service that provides the same level of adapter service.

In conclusion we can see that CX’s nature lends itself quite well to being replaced in comparison to other more orthodox options. CX is a SAS application that is specifically aimed at saving time and money for our customers by eliminating boilerplate development and offering easy to configure and changeable integration. Since this is the paradigm for the products existence, lock-in is also minimized since lock-in at its core is the absence of changeability and configurability.
