"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[8577],{6646:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var s=r(5893),n=r(1151);const i={sidebar_position:20},a="Retry",o={id:"integrations/retry",title:"Retry",description:"Connxio uses multiple layers of retry to ensure the highest possible robustness. We currently use three types of retry:",source:"@site/../docs/integrations/retry.md",sourceDirName:"integrations",slug:"/integrations/retry",permalink:"/docs/integrations/retry",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20},sidebar:"connxioSidebar",previous:{title:"Metadata",permalink:"/docs/integrations/metadata"},next:{title:"Introduction",permalink:"/docs/connxio-portal"}},l={},h=[{value:"Endpoint retry",id:"endpoint-retry",level:2},{value:"Engine retry",id:"engine-retry",level:2},{value:"Linear retry",id:"linear-retry",level:3},{value:"Backoff retry",id:"backoff-retry",level:3},{value:"Catastrophic failure retry",id:"catastrophic-failure-retry",level:2}];function d(e){const t={a:"a",br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"retry",children:"Retry"}),"\n",(0,s.jsx)(t.p,{children:"Connxio uses multiple layers of retry to ensure the highest possible robustness. We currently use three types of retry:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsx)(t.li,{children:"Endpoint retry"}),"\n",(0,s.jsx)(t.li,{children:"Engine retry"}),"\n",(0,s.jsx)(t.li,{children:"Catastrophic failure retry"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"endpoint-retry",children:"Endpoint retry"}),"\n",(0,s.jsxs)(t.p,{children:["All adapters use retry logic to compensate for protocol instability on delivery and pickup of messages. Thus endpoint retry refers to the instant retry mechanisms used when the instability of the protocol or the receivers themselves are unreachable or experiencing some kind of transient failure. The nature of the retry varies by protocol and will be described in the specific articles per adapter, however all the adapters do have some similarities imposed by external limitations, such as the number of retries which varies by protocol but is kept within a time-range of 1 minute to conform to the transient nature of Connxio's scaling architecture.",(0,s.jsx)(t.br,{}),"\n","In short endpoint retry is triggered instantly when a request fails, and has a number of retries that stagger inside an interval of 1 minute or less."]}),"\n",(0,s.jsx)(t.h2,{id:"engine-retry",children:"Engine retry"}),"\n",(0,s.jsxs)(t.p,{children:["Even though the adapters themselves retry instantly when a request fails prolonged failure will cause the message itself to fail after the grace period offered by the ",(0,s.jsx)(t.a,{href:"#endpoint-retry",children:"endpoint retry"}),". To handle these kind of failures Connxio has two different strategies for engine retry, both based on ",(0,s.jsx)(t.a,{href:"https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing",children:"Service Bus"})," functionality. We call these strategies ",(0,s.jsx)(t.em,{children:"linear"})," and ",(0,s.jsx)(t.em,{children:"backoff"})," retry."]}),"\n",(0,s.jsx)(t.h3,{id:"linear-retry",children:"Linear retry"}),"\n",(0,s.jsxs)(t.p,{children:["Linear retry uses Service Bus' abandon message functionality to leverage internal retry mechanisms and retry the message a set number of times in a linear fashion. Every retry attempt also triggers the ",(0,s.jsx)(t.a,{href:"#endpoint-retry",children:"endpoint retry"}),", this means that the total number of retries are calculated thusly; (linear engine retry * endpoint retry) = total number of retries before failure.",(0,s.jsx)(t.br,{}),"\n","Every engine uses an optimal number of retries based on the kind of operation attempted and the nature of the engine itself. That said, no engine retries more than 10 times or less than 3 while configured to use linear retry. See the individual engines documentation for specific information about what number and kind of retry is used for that engine."]}),"\n",(0,s.jsx)(t.h3,{id:"backoff-retry",children:"Backoff retry"}),"\n",(0,s.jsxs)(t.p,{children:["Backoff retry uses the ",(0,s.jsx)(t.a,{href:"https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sequencing",children:"message scheduling"})," feature of Service Bus to stagger retries in a way that causes less load on external endpoints during peak traffic. In essence the backoff retry functionality keeps track of failures, and based upon customer configured or default variables, it delays traffic to more evenly distribute messages and external calls. The variables are listed in the table below with a description of their functionality and the default value if not set within the integration:"]}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Variable"}),(0,s.jsx)(t.th,{children:"Value"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"MaxNumberOfRetries"}),(0,s.jsx)(t.td,{children:"5"}),(0,s.jsx)(t.td,{children:"The max number of retries. When the maximum number of retries are reached the message is stopped and marked for potential manual retry."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"FailureCountIntervalMinutes"}),(0,s.jsx)(t.td,{children:"3"}),(0,s.jsxs)(t.td,{children:["With each failure that causes the engine to terminate the message processing the ",(0,s.jsx)(t.em,{children:"MaxErrorsPerInterval"})," is incremented. This property control the reset time of ",(0,s.jsx)(t.em,{children:"MaxErrorsPerInterval"}),". This causes Connxio to count errors within the set interval and start delaying messages if ",(0,s.jsx)(t.em,{children:"MaxErrorsPerInterval"})," is hit within the interval set by this property. E.g. if this property is set to 3, the engine will count errors for 3 minutes and if ",(0,s.jsx)(t.em,{children:"MaxErrorsPerInterval"})," is set to 5 it will start delaying if we hit 5 error counts within those 3 minutes, if not we reset the count and do it all again."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"MaxErrorsPerInterval"}),(0,s.jsx)(t.td,{children:"1000"}),(0,s.jsxs)(t.td,{children:["This is the max count of errors that can occur within the set ",(0,s.jsx)(t.em,{children:"FailureCountIntervalMinutes"}),". When the threshold set here is hit the engine will start to delay messages in hopes of reducing the load on the external service."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"ReQueueMinDelaySeconds"}),(0,s.jsx)(t.td,{children:"10"}),(0,s.jsx)(t.td,{children:"When a message is delayed it is re-scheduled on the Service Bus within the interval of ReQueueMaxDelaySeconds and this property. Meaning that if this property is set to 10 seconds and ReQueueMaxDelaySeconds is set to 60 seconds, failed messages will be re-scheduled for processing 10-60 seconds from the time of scheduling. Messages are queued randomly within the interval until all slots are used then the process repeats if necessary."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"ReQueueMaxDelaySeconds"}),(0,s.jsx)(t.td,{children:"60"}),(0,s.jsx)(t.td,{children:"When a message is delayed it is re-scheduled on the Service Bus within the interval of ReQueueMinDelaySeconds and this property. Meaning that if this property is set to 60 seconds and ReQueueMinDelaySeconds is set to 10 seconds, failed messages will be re-scheduled for processing 10-60 seconds from the time of scheduling. Messages are queued randomly within the interval until all slots are used then the process repeats if necessary."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"MaxDelayActions"}),(0,s.jsx)(t.td,{children:"5"}),(0,s.jsxs)(t.td,{children:["The max number of delay actions. A delay action happens when the MaxErrorsPerInterval ceiling is reached within the FailureCountIntervalMinutes. The delay action is similar to a retry as it uses the same re-queue window and mechanism for re-scheduling, but unlike retry a delay action does not perform any work on the message and stops the message from being processed at all. This enables us to temporarily ",(0,s.jsx)(t.a,{href:"https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker",children:"circuit break"})," the flow of messages to relieve stressed receiver services. When the maximum number of delay actions are reached the message is stopped and marked for potential manual retry."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Enabled"}),(0,s.jsx)(t.td,{children:"NA"}),(0,s.jsx)(t.td,{children:"Enables the retry as specified by the integration. Default values are used if disabled."})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"catastrophic-failure-retry",children:"Catastrophic failure retry"}),"\n",(0,s.jsx)(t.p,{children:"When Connxio picks messages from a location or receives messages through its API, we do out outmost to ensure that the message is delivered and never lost within the Connxio engine. Catastrophic failure retry queues messages that experience connectivity loss to internal or external services or protocols on a Service Bus that is hosted in another data center. It is then reinserted into the original flow either automatically, or if the failure is persistent, manually after the fault is fixed."})]})}function c(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>o,a:()=>a});var s=r(7294);const n={},i=s.createContext(n);function a(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);