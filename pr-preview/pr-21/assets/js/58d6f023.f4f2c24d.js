"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[2689],{82344:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=i(85893),s=i(11151);const o={title:"Configuration",sidebar_position:2,pagination_prev:null},r="Creating Integrations",a={id:"integrations/configuration",title:"Configuration",description:"Before reading this page please read the core concepts page where we explain a lot of the concepts essential to understanding Connxio. This page describes the integration creation process and design in Connxio.",source:"@site/../docs/integrations/configuration.md",sourceDirName:"integrations",slug:"/integrations/configuration",permalink:"/docs/integrations/configuration",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Configuration",sidebar_position:2,pagination_prev:null},sidebar:"connxioSidebar",next:{title:"Introduction",permalink:"/docs/integrations/adapters"}},l={},c=[{value:"Starting out",id:"starting-out",level:2},{value:"Configuring main options",id:"configuring-main-options",level:2},{value:"Logging",id:"logging",level:2},{value:"Sub integrations",id:"sub-integrations",level:2},{value:"Structure",id:"structure",level:2}];function d(e){const n={a:"a",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"creating-integrations",children:"Creating Integrations"}),"\n",(0,t.jsxs)(n.p,{children:["Before reading this page please read the ",(0,t.jsx)(n.a,{href:"/getting-started/core-concepts",children:"core concepts page"})," where we explain a lot of the concepts essential to understanding Connxio. This page describes the integration creation process and design in Connxio."]}),"\n",(0,t.jsx)(n.h2,{id:"starting-out",children:"Starting out"}),"\n",(0,t.jsxs)(n.p,{children:["To start creating integrations you need to navigate to the ",(0,t.jsx)(n.strong,{children:"Integrations"})," entry in the Main Navigation like so:"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Main%20menu%20integrations.png?sv=2020-08-04&st=2021-11-22T11%3A47%3A28Z&se=2040-11-23T11%3A47%3A00Z&sr=b&sp=r&sig=NkET%2FNnvgfdmAqdiOANvzYtvMFfhUe1zro05lotxXs4%3D",alt:"img"})}),"\n",(0,t.jsxs)(n.p,{children:["A list of all available integrations in your subscription pops up. You can search for integrations in the top left. To add a new integration click the ",(0,t.jsx)(n.strong,{children:"Add Integration"})," button:"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Integration%20list%20add%20new.png?sv=2020-08-04&st=2021-11-22T11%3A51%3A17Z&se=2040-11-23T11%3A51%3A00Z&sr=b&sp=r&sig=g8HvLY7odjlBj5uutoMUboHO8%2F%2F2IcZuPloK2P9KadM%3D",alt:"img"})}),"\n",(0,t.jsx)(n.p,{children:"The creation window for integrations is displayed. This is the interface that holds all configuration related to integrations and where you will spend most of your time in Connxio. The complete interface looks like this when you first enter it, we will explain each section in turn further down this page:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Integrations%20new%20empty%20page.png?sv=2020-08-04&st=2021-11-22T11%3A54%3A36Z&se=2040-11-23T11%3A54%3A00Z&sr=b&sp=r&sig=evjRTSMz52m66jrjBWoOxJGbWTr%2Bvq%2BSM318xEA4O4U%3D",alt:"img"})}),"\n",(0,t.jsx)(n.h2,{id:"configuring-main-options",children:"Configuring main options"}),"\n",(0,t.jsx)(n.p,{children:'The main options of the integration configurations describes what type of integration the configuration represents and basic information related to the messages it will handle. The following properties are regarded as "main options":'}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Integration%20main%20options.png?sv=2020-08-04&st=2022-04-06T12%3A19%3A08Z&se=2040-04-07T12%3A19%3A00Z&sr=b&sp=r&sig=2NnJpet7I42hFImaRIlEdWqDcK8D9Z3fbRVxcSAJpUY%3D",alt:"img"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Transaction type"}),': Describes the transaction the integration represents. This is typically something like "Invoice" or "User".']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Description"}),": Describes the integration in required detail. Should make it easier to recognize the integration when searching."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Sender"}),': Represents the system sending the message or data. A typical example is the name of the system or it\'s function like "Visma" or "AccountingSystem".']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Receiver"}),": Represents the system receiving the message or data."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Message Inbound format"}),': Defines the inbound format of the message. This is typically "xml", "json", "csv", etc. It\'s important to be precise here as Connxio will use this property to name files when logging or handling data. We recommend using lowercase but all casing will work.']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Message Inbound Encoding"}),": Defines the encoding of the message. It's ",(0,t.jsx)(n.em,{children:"very"})," important to be exact when specifying encoding or the message could en up garbled. If this field is invalid or missing utf-8 encoding is used by default. Please see ",(0,t.jsx)(n.a,{href:"/integrations/encoding",children:"encoding"})," for more information"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Remove Bom"}),': BOM or "byte order mark" is explained ',(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Byte_order_mark",children:"here"}),". Switch this on if you want Connxio to remove BOM from all message that enter the Connxio pipeline in this integration."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Handle file as binary"}),": This will enable you to send binaries, such as pdf documents and pictures. Note that when sending binaries split/batch and transformations are not supported."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"logging",children:"Logging"}),"\n",(0,t.jsxs)(n.p,{children:["Logging is described on the ",(0,t.jsx)(n.a,{href:"/integrations/logging",children:"Logging page"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"sub-integrations",children:"Sub integrations"}),"\n",(0,t.jsx)(n.p,{children:'A sub integration is a logical unit that represents the transformation and outbound adapter of an instance of a message. You can have multiple sub integrations within a single integration configuration but each and every one of them will use the same inbound adapter. This means that you can copy a file to multiple receivers by simply adding another sub integration at any time. You add more sub integrations by clicking the "+" symbol under the last sub integration box.'}),"\n",(0,t.jsxs)(n.p,{children:["The sub integration contains the following configuration (refer to the picture under the ",(0,t.jsx)(n.a,{href:"#starting-out",children:"Starting out"})," section for a visual aid):"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Sub integration name"}),": This field lets you name your sub integrations to keep track of what sub integration does what."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Outbound format"}),': Defines the outbound format of the message. This is typically "xml", "json", "csv", etc. It\'s important to be precise here as Connxio will use this property to name files when logging or handling data. We recommend using lowercase but all casing will work.']}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"structure",children:"Structure"}),"\n",(0,t.jsx)(n.p,{children:"A sub integration is structured as a pipeline. This mirrors the pipeline in Connxio itself and includes the engines as boxes the user can interact with. The following boxes are present:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Inbound Connection"}),': This box is technically outside the sub integration but is the catalyst for all sub integrations in the integration. It represents the inbound adapter and fetching/receiving of data to the Connxio pipeline. You can only configure a single inbound connection on an integration configuration. The inbound section under "Adapters" explains how all the different adapters work.']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Split/Batch"}),": Represents the act of splitting or batching messages. This is explained on the ",(0,t.jsx)(n.a,{href:"/integrations/transformation/splitting",children:"splitting"})," and ",(0,t.jsx)(n.a,{href:"/integrations/transformation/batching",children:"batching"})," pages respectively."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Transformations"}),': This is a list of different transformations that are performed in the order they are depicted within the shape. The boxes representing each transformation can be moved by "clicking and dragging" each shape to the desired position. All transformations are described under the "Transformation" section.']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Outbound Connections"}),': This box represents the delivery of messages to receivers. You can have multiple outbound adapters configured within this box. Each outbound adapter delivers a copy of the message received from the "Transformations" step. The order of the outbound adapters does not matter as the delivery is handled in parallel and not sequentially. You can read about all outbound adapters in the Adapters -> Outbound section of the documentation.']}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>r});var t=i(67294);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);