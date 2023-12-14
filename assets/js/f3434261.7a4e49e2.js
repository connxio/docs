"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[8094],{6204:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=n(5893),s=n(1151);const r={sidebar_position:5},o="Data Collection",a={id:"integrations/transformation/data-collection",title:"Data Collection",description:"Connxio supports various forms of orchestration most prominent among them is enrichment and this is fueled by data collection. Data collection refers to the act of getting data over HTTP as a transformations tep. This enables customers to collect data from all resources that support HTTP and use them within transformations, variable replacements and url generation. This page describes how to use and configure data collection.",source:"@site/../docs/integrations/transformation/data-collection.md",sourceDirName:"integrations/transformation",slug:"/integrations/transformation/data-collection",permalink:"/docs/integrations/transformation/data-collection",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"connxioSidebar",previous:{title:"Splitting",permalink:"/docs/integrations/transformation/splitting"},next:{title:"Format Conversion",permalink:"/docs/integrations/transformation/format-conversion"}},l={},d=[{value:"Limitations and External demands",id:"limitations-and-external-demands",level:2},{value:"Data size",id:"data-size",level:3},{value:"Traffic",id:"traffic",level:3},{value:"Extending Logging",id:"extending-logging",level:2},{value:"Availability",id:"availability",level:3},{value:"How to add data collection",id:"how-to-add-data-collection",level:2},{value:"Retry",id:"retry",level:2},{value:"Advanced error handling",id:"advanced-error-handling",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"data-collection",children:"Data Collection"}),"\n",(0,i.jsxs)(t.p,{children:["Connxio supports various forms of ",(0,i.jsx)(t.a,{href:"/getting-started/core-concepts",children:"orchestration"})," most prominent among them is enrichment and this is fueled by ",(0,i.jsx)(t.em,{children:"data collection"}),". Data collection refers to the act of getting data over HTTP as a transformations tep. This enables customers to collect data from all resources that support HTTP and use them within transformations, ",(0,i.jsx)(t.a,{href:"/connxio-portal/variables/variable-replacement",children:"variable replacements"})," and url generation. This page describes how to use and configure data collection."]}),"\n",(0,i.jsx)(t.h2,{id:"limitations-and-external-demands",children:"Limitations and External demands"}),"\n",(0,i.jsx)(t.p,{children:"There are a few things to consider when using data collection, some pertain to the constraints on the process in Connxio internally but there are even more demands put on the external endpoints and resources that provide data. The following should always be considered and reviewed:"}),"\n",(0,i.jsx)(t.h3,{id:"data-size",children:"Data size"}),"\n",(0,i.jsxs)(t.p,{children:["Be careful about how much data your endpoints or resources return. We spawn unending amounts of transformation sessions, but we have some hard limits on the amount of time a processes involving transformations are allowed to live. Currently this is 10 minutes, which is an eternity in a programming sense, if you have slow endpoints returning very large resources this will cause significant delays on processing and will in most cases make the whole process fail, either because of the time limit or resources provided by the session itself. As such we recommend keeping all data collection ",(0,i.jsx)(t.strong,{children:"below 1 MB"})," in size and under 100 KB for best performance."]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"Using proxy services that deliver trimmed data could be a good way to increase performance and decrease load."}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"traffic",children:"Traffic"}),"\n",(0,i.jsxs)(t.p,{children:["Data collection is performed ",(0,i.jsx)(t.em,{children:"every time"})," an integration pipeline fires. This can generate a large amount of traffic. Be sure to test you endpoints and resources for the expected amount of traffic. Since Connxio processes transformations in parallel thousands upon thousands of requests can be fired at the same time at peak load. Connxio uses a staggering algorithm to stop endpoints from crashing under heavy load, but this is no guarantee that the integration will perform as expected."]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"Ensure that your endpoint or resource can handle the load"}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"extending-logging",children:"Extending Logging"}),"\n",(0,i.jsxs)(t.p,{children:["Connxio will add an ",(0,i.jsx)(t.code,{children:"InterchangeId"})," header to the intake request to facilitate for continued transactional logging on the sender side if applicable."]}),"\n",(0,i.jsx)(t.h3,{id:"availability",children:"Availability"}),"\n",(0,i.jsxs)(t.p,{children:["We provide ",(0,i.jsx)(t.a,{href:"#how-to-add-data-collection",children:"variables"})," for making data collection more robust, but by default if the http call fails the pipeline will be suspended. Please ensure that you have high uptime on your services."]}),"\n",(0,i.jsx)(t.h2,{id:"how-to-add-data-collection",children:"How to add data collection"}),"\n",(0,i.jsx)(t.p,{children:'Add the "Data Collection" shape from the "Transformations" menu:'}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Data%20collection%20menu.png?sv=2020-04-08&st=2021-10-25T12%3A19%3A49Z&se=2040-10-26T12%3A19%3A00Z&sr=b&sp=r&sig=F1XwWeQevA0D7DSJ%2B%2FTdiPsFfRJcroLiXaAj%2BIxBH5M%3D",alt:"img"})}),"\n",(0,i.jsx)(t.p,{children:"Add the necessary fields to your data collection. See below for an example:"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Data%20collection%20main%20config%20screen.png?sv=2020-04-08&st=2021-10-25T12%3A50%3A59Z&se=2040-10-26T12%3A50%3A00Z&sr=b&sp=r&sig=p9OxPueX6cSQoz3Rb01iV37wg23iGIRetvt6Tdbaa5I%3D",alt:"img"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Method"}),": The verb to use for HTTP communication."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"REST Url"}),": The endpoint to get the data from. This could be an API, data store or similar REST service."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Security Configuration"}),": Select your security configuration from the list. See ",(0,i.jsx)(t.a,{href:"/connxio-portal/security-configurations",children:"here"})," for more information."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Variable name"}),": The name used for the variable through Connxio. USe this name if you want to target the variable in a ",(0,i.jsx)(t.a,{href:"/integrations/transformation/code-components",children:"code component"})," or ",(0,i.jsx)(t.a,{href:"/connxio-portal/variables/variable-replacement",children:"variable replacement"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Use Content As Request Body"}),": The current version of the content at the time of the data collection is sent to the collection endpoint as the body of the request. Default value is empty body."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Use Response As Content"}),": The current content is replaced by the body returned by the data collection endpoint, this happens regardless of what is returned."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Headers"}),": Add any custom header you might need. This can include custom Authorization if needed."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Current Message Content Type"}),": The current content type of the message. Use this only if the content type of the message at this stage is different from the message format defined for the configuration. Used for ",(0,i.jsx)(t.a,{href:"/connxio-portal/variables/variable-replacement",children:"variable replacement"})," only."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Continue on 404"}),": Turning this on means the data collection will continue if it cant find the resource its looking for. Be careful since this might make other transformations like code components fail."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Stop on empty"}),": Stops if data is empty and ",(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/List_of_HTTP_status_codes",children:"status code"})," is positive."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"retry",children:"Retry"}),"\n",(0,i.jsxs)(t.p,{children:["Data collection is currently using the backoff retry described on the ",(0,i.jsx)(t.a,{href:"/integrations/retry",children:"Retry"})," page."]}),"\n",(0,i.jsx)(t.h2,{id:"advanced-error-handling",children:"Advanced error handling"}),"\n",(0,i.jsxs)(t.p,{children:["By default, all failed requests will be retried according to the ",(0,i.jsx)(t.a,{href:"#retry",children:"retry"})," pattern. If the request is still not successful, the transaction will be logged as an error and terminated. Advanced error handling allows you to create rules for handling specific unsuccessful status codes beyond the standard pattern."]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:'For legacy integration support (integrations created using DataCollection before Advanced Error Handling was integrated) there is a toggleable "Continue on 404".'}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/AdvancedErrorHandling%20-%20DC.png?sv=2021-04-10&st=2022-10-21T08%3A26%3A31Z&se=2040-10-22T08%3A26%3A00Z&sr=b&sp=r&sig=XM30B3bCKRSWsyEC1DcGSZyTFAUCR%2BxKbOzrxuVW%2FhA%3D",alt:"img"})}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Input\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),(0,i.jsx)(t.th,{children:"Type\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}),(0,i.jsx)(t.th,{children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Status codes"}),(0,i.jsx)(t.td,{children:"int , -"}),(0,i.jsx)(t.td,{children:"A comma-separated list of status codes on which the rule should act. A range of status codes can be defined by using '-', for instance, 401-408 will represent all status codes from and including 401 to and including 408."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Action"}),(0,i.jsxs)(t.td,{children:["Terminate,",(0,i.jsx)("br",{})," Continue"]}),(0,i.jsx)(t.td,{children:'"Terminate" stops the transaction, while "Continue" continues the transaction, logging it as error unless something else is defined in the "Custom status" field'})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Custom status"}),(0,i.jsx)(t.td,{children:"string"}),(0,i.jsx)(t.td,{children:'By default all transactions will be logged as "Error". This property overrides the default status.'})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Retry"}),(0,i.jsxs)(t.td,{children:["true,",(0,i.jsx)("br",{}),"false"]}),(0,i.jsxs)(t.td,{children:["If disabled, no retry attempts will be made and the Rule Action will trigger immediately. If enabled, the default ",(0,i.jsx)(t.a,{href:"#retry",children:"retry"})," pattern will run before the Rule Action triggers."]})]})]})]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>o});var i=n(7294);const s={},r=i.createContext(s);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);