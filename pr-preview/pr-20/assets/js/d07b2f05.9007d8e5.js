"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[1291],{8388:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>h});var t=s(5893),i=s(1151),o=s(9965),a=s(4996);const r={sidebar_position:5},l="Resending",c={id:"connxio-portal/connxio-resending",title:"Resending",description:"Connxio will catch and persist all failures that occur in any integration flow. The purpose of this is to allow customers to be able to either resend these messages (if e.g. the receiver system experienced an outage), or delete the messages if resending is not appropriate.",source:"@site/../docs/connxio-portal/connxio-resending.mdx",sourceDirName:"connxio-portal",slug:"/connxio-portal/connxio-resending",permalink:"/docs/connxio-portal/connxio-resending",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"connxioSidebar",previous:{title:"Testing",permalink:"/docs/connxio-portal/testing"},next:{title:"Environment Variables",permalink:"/docs/connxio-portal/variables/environment-variables"}},d={},h=[{value:"Resending and deleting messages",id:"resending-and-deleting-messages",level:2}];function g(e){const n={admonition:"admonition",h1:"h1",h2:"h2",img:"img",p:"p",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"resending",children:"Resending"}),"\n",(0,t.jsx)(n.p,{children:"Connxio will catch and persist all failures that occur in any integration flow. The purpose of this is to allow customers to be able to either resend these messages (if e.g. the receiver system experienced an outage), or delete the messages if resending is not appropriate."}),"\n",(0,t.jsxs)(n.p,{children:["When a failure has occurred it can be viewed in the Failures page in the Connxio Portal, which you can find by clicking the ",(0,t.jsx)(n.strong,{children:"Failures"})," link in the main navigation menu."]}),"\n",(0,t.jsx)(n.p,{children:"This page shows all integrations where failures have occurred. To view the specific failures, click the integration to open a new page where all failures can be viewed individually."}),"\n",(0,t.jsx)(n.p,{children:"On this page you view the failures and when, why and where they failed. You can also click a failure to view additional details and see the message content."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{alt:"Failure details",src:s(3266).Z+"#light-only",width:"1224",height:"765"}),(0,t.jsx)(n.img,{alt:"Failure details",src:s(825).Z+"#dark-only",width:"1224",height:"765"})]}),"\n",(0,t.jsx)(n.h2,{id:"resending-and-deleting-messages",children:"Resending and deleting messages"}),"\n",(0,t.jsx)(n.p,{children:"There are two options for resending or deleting messages. The process for each of them is the same."}),"\n",(0,t.jsx)(n.p,{children:'You can use the "Select all messages" toggle to select all failed messages and resend them. If you only want to resend a specific subset of all failures, you can use the built-in search tool to scope down the result list to only those messages. You are able to filter messages by time, failure message, sender, receiver and failure origin.'}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{alt:"Start resend job",src:s(6189).Z+"#light-only",width:"1224",height:"765"}),(0,t.jsx)(n.img,{alt:"Start resend job",src:s(1951).Z+"#dark-only",width:"1224",height:"765"})]}),"\n",(0,t.jsx)(n.p,{children:"When you have either selected all messages, or a subset of messages you can select to either Delete or Retry the messages. When you start a new job for either of those, a new card will appear on the page where you can track the status of the operation."}),"\n","\n","\n",(0,t.jsx)("div",{style:{maxWidth:"400px"},children:(0,t.jsx)(o.Z,{alt:"Active resend job",sources:{light:(0,a.Z)("/img/docs/active-job-light.webp"),dark:(0,a.Z)("/img/docs/active-job-dark.webp#dark-only")}})}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"You can only have one active resending job per integration at any one time."})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(g,{...e})}):g(e)}},825:(e,n,s)=>{s.d(n,{Z:()=>t});const t=s.p+"assets/images/failure-details-dark-501b23c23f138f0ec864e6c777a59037.webp"},3266:(e,n,s)=>{s.d(n,{Z:()=>t});const t=s.p+"assets/images/failure-details-light-d6d9c63218d326320c31fcfd593c0858.webp"},1951:(e,n,s)=>{s.d(n,{Z:()=>t});const t=s.p+"assets/images/start-resending-dark-5fc9afaf9f367e171c4288ee295a37ca.webp"},6189:(e,n,s)=>{s.d(n,{Z:()=>t});const t=s.p+"assets/images/start-resending-light-c7e42eb275555e69927e7622d9393269.webp"},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var t=s(7294);const i={},o=t.createContext(i);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);