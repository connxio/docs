"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[4603],{4429:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var i=n(5893),s=n(1151);const o={sidebar_position:4},a="Splitting",r={id:"integrations/transformation/splitting",title:"Splitting",description:"Connxio gives customers the ability to split messages into smaller units. We do this by running the content through a Code Component that defines how the file should be split and then sends the smaller units through the pipeline as new messages. This page describes how to utilize the splitting functionality.",source:"@site/../docs/integrations/transformation/splitting.md",sourceDirName:"integrations/transformation",slug:"/integrations/transformation/splitting",permalink:"/integrations/transformation/splitting",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"connxioSidebar",previous:{title:"Batching",permalink:"/integrations/transformation/batching"},next:{title:"Data Collection",permalink:"/integrations/transformation/data-collection"}},l={},c=[{value:"Limitations",id:"limitations",level:2},{value:"Testing and best practices",id:"testing-and-best-practices",level:2},{value:"Creating splitting code components",id:"creating-splitting-code-components",level:2},{value:"Retry",id:"retry",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"splitting",children:"Splitting"}),"\n",(0,i.jsxs)(t.p,{children:["Connxio gives customers the ability to split messages into smaller units. We do this by running the content through a ",(0,i.jsx)(t.a,{href:"/integrations/transformation/code-components",children:"Code Component"})," that defines how the file should be split and then sends the smaller units through the pipeline as new messages. This page describes how to utilize the splitting functionality."]}),"\n",(0,i.jsx)(t.h2,{id:"limitations",children:"Limitations"}),"\n",(0,i.jsxs)(t.p,{children:["There are very few limits to splitting the only one being that we support files up to ",(0,i.jsx)(t.code,{children:"100mb"})," only. However, you can split files into any amount of messages, and process them in any shape or form in further transformations. After the splitting is run all files will be handled as a unique message inside Connxio which means they will generate separate ",(0,i.jsx)(t.a,{href:"/integrations/logging",children:"logs"}),", ",(0,i.jsx)(t.a,{href:"/reference/resending-api",children:"resend-events"})," and errors."]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"Splitting can generate enormous amounts of traffic. Be sure that you test your receiving systems thoroughly before you send production level loads."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"testing-and-best-practices",children:"Testing and best practices"}),"\n",(0,i.jsx)(t.p,{children:"Splitting requires special care when testing since it can generate millions of messages in a short amount of time. Connxio has a heavily tuned splitting algorithm that utilizes parallelization to generate messages in a rate of about 4000 per second at full capacity. This means that we recommend the following test pipeline:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Test you integration with a single file that splits into 2 messages."}),"\n",(0,i.jsx)(t.li,{children:"Add 2 files with 200 messages."}),"\n",(0,i.jsx)(t.li,{children:"Test 2 files with progressively larger loads (we recommend multiplying by 10 at a time) until you reach production level."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["Obviously you can ignore steps that are unrealistic for production level load, ie. if you are estimating a load of 10 messages a day you can go straight to testing with production load levels. We do ask that you test for ",(0,i.jsx)(t.strong,{children:"peak load traffic"})," multiplied by 2. This adds stability for unexpected scenario's as well a prepares the receiving system for future load.",(0,i.jsx)(t.br,{}),"\n","The reason for this recommended testing pipeline is that testing generates traffic which is payable, and we do not want our customers to incur costs for failed test runs caused by non-tested code and bad setup."]}),"\n",(0,i.jsx)(t.h2,{id:"creating-splitting-code-components",children:"Creating splitting code components"}),"\n",(0,i.jsxs)(t.p,{children:["When implementing splitting into your integration the first step is to create the code that splits your message into smaller components. This is done in more or less the same way as ",(0,i.jsx)(t.a,{href:"/integrations/transformation/code-components",children:"map code components"})," but with a few key differences."]}),"\n",(0,i.jsx)(t.p,{children:"Firstly you need to create the splitting code itself, see the code components page for a simple rundown of the process, but instead of using the boiler plate described there for maps you use the for splitting detailed below:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-csharp",children:"public class MyFirstSplitter : IConnXioSplit\n{\n    public IEnumerable<TransformationContext> Split(TransformationContext transformationContext)\n    {\n        // Create object from byte array\n        MyInboundMessageType inboundMessage = JsonConvert.DeserializeObject<MyInboundMessageType>(transformationContext.Content);\n\n        //Create list that holds new messages\n        List<TransformationContext> outboundTransformationContexts = new List<TransformationContext>();\n\n        //Add elements to list\n        foreach (var city in inboundMessage.Cities)\n        {\n            var outboundMessage = new MyOutboundMessageType\n            {\n                CityName = city.CityName,\n                Comment = city.Comment,\n                Id = inboundMessage.Id\n            };\n\n            outboundTransformationContexts.Add(new TransformationContext\n            {\n                Content = JsonConvert.SerializeObject(outboundMessage),\n                MetaData = transformationContext.MetaData.Copy()\n            });\n        }\n\n        //Return new messages as list\n        return outboundTransformationContexts;\n    }\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Upload the component"})," by using the methods described on the ",(0,i.jsx)(t.a,{href:"/integrations/transformation/code-components",children:"code components page"}),". Remember to choose the ",(0,i.jsx)(t.em,{children:"splitting"})," type."]}),"\n",(0,i.jsx)(t.h2,{id:"retry",children:"Retry"}),"\n",(0,i.jsxs)(t.p,{children:["Splitting has multiple retry patterns that differ based on which step of the splitting process that fails. If the process fails on transient errors before running the splitting code component the system puts the original messages back in queue and tries again 10 times. If the failure is happens after running the splitting code the algorithm tries to send the message to the next pipeline step multiple times with increasing delay until the message is scheduled for retry through the ",(0,i.jsx)(t.a,{href:"/integrations/retry",children:"disaster pipeline"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"REtry can end up causing delays in the delivery of splitted message units. If you experience problems like this, your logging provider should have received warnings about the fault, if not please contact your representative."})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>a});var i=n(7294);const s={},o=i.createContext(s);function a(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);