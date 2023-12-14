"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[4384],{667:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var s=t(5893),i=t(1151);const o={},r="Email",a={id:"integrations/adapters/outbound/email",title:"Email",description:"Connxio lets customers send messages from the Connxio pipeline by configuring connections to email accounts. We currently support the SMTP protocol. This page details limitations of said protocol and how to configure and connect to an email account.",source:"@site/../docs/integrations/adapters/outbound/email.md",sourceDirName:"integrations/adapters/outbound",slug:"/integrations/adapters/outbound/email",permalink:"/docs/integrations/adapters/outbound/email",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"connxioSidebar",previous:{title:"Discard",permalink:"/docs/integrations/adapters/outbound/discard"},next:{title:"REST",permalink:"/docs/integrations/adapters/outbound/rest"}},c={},l=[{value:"Configuring the Email adapter",id:"configuring-the-email-adapter",level:2},{value:"Retry",id:"retry",level:2}];function d(e){const n={a:"a",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"email",children:"Email"}),"\n",(0,s.jsx)(n.p,{children:"Connxio lets customers send messages from the Connxio pipeline by configuring connections to email accounts. We currently support the SMTP protocol. This page details limitations of said protocol and how to configure and connect to an email account."}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)("summary",{children:"Limitations"}),(0,s.jsxs)("p",{children:[(0,s.jsx)(n.p,{children:"There are some limitations to our Outbound Email Adapter, these include:"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"It is not possible to send more or less the same content to more than 500 recipients within 24 hours."}),"\n",(0,s.jsx)(n.li,{children:"It is not possible to send more or less the same content to more than 2,500 recipients within 30 days."}),"\n",(0,s.jsx)(n.li,{children:"It is not possible to send email to more than 500 recipients within 24 hours."}),"\n",(0,s.jsx)(n.li,{children:"It is not possible to send email to more than 2,500 recipients within 30 days."}),"\n"]}),(0,s.jsx)(n.p,{children:"In addition to this SMTP allows the use of SSL and TLS. Of the two protocols, we recommend using TLS since this is the newer, more secure choice."})]})]}),"\n",(0,s.jsx)(n.h2,{id:"configuring-the-email-adapter",children:"Configuring the Email adapter"}),"\n",(0,s.jsx)(n.p,{children:'To configure Connxio to start processing your email messages select the Email option in "Outbound Connection" shape:'}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Azure%20storage%20menu.png?sv=2020-04-08&st=2021-10-27T11%3A56%3A53Z&se=2040-10-28T12%3A56%3A00Z&sr=b&sp=r&sig=S%2FltUS0elTLePVt5Aq536uNkr7Pa9XcY8ovTFJLUhmc%3D",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:"A new window pops up. Add data as seen below:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Email%20config.PNG?sv=2020-04-08&st=2021-11-03T09%3A18%3A05Z&se=2040-11-04T09%3A18%3A00Z&sr=b&sp=r&sig=EBWhGmnlgHWBK8tH5JmkqcRVkU7rlR9B9XrD0tDKEro%3D",alt:"img"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Email Security Configuration"}),": Reference to the ",(0,s.jsx)(n.a,{href:"/connxio-portal/security-configurations",children:"Security Configuration"})," that contains the relevant connection properties."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Receiver Addresses"}),": The email addresses that the Connxio message will be sent to."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Subject"}),": The password for the email address."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Outbound Filename Pattern"}),": The server that hosts the email account."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Send Attachments"}),": When turned on the Connxio message will be sent as an attachment. Both this and Send Message Body can be active at the same time."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Send Message Body"}),": When turned on the Connxio will be sent as a message body. Both this and Send Attachments can be active at the same time."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Use SSL"}),": Most hosts require SSL. Turn this on to make Connxio contact the host with SSL enabled."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Duplicate Detection"}),": Terminate the message if the exact same has been processed any time within the last five days. Connxio does not guarantee that no duplicates will be sent."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"retry",children:"Retry"}),"\n",(0,s.jsxs)(n.p,{children:["Retry on all outbound adapters is currently handled by the linear retry described on the ",(0,s.jsx)(n.a,{href:"/integrations/retry",children:"Retry page"}),". This may change in the future as we are looking into enabling back-off retry."]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>r});var s=t(7294);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);