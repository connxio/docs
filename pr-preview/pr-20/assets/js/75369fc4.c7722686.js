"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[7504],{1670:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>g,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=t(5893),o=t(1151);const s={sidebar_position:2,title:"Get all integrations"},r="Get all integrations",a={id:"reference/integrations/get-all-integrations",title:"Get all integrations",description:"Use this endpoint to get a list of all integration configurations associated with the company. It provides an overview of the existing integrations, allowing users to view integration details and configurations.",source:"@site/../docs/reference/integrations/get-all-integrations.md",sourceDirName:"reference/integrations",slug:"/reference/integrations/get-all-integrations",permalink:"/docs/reference/integrations/get-all-integrations",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Get all integrations"},sidebar:"connxioSidebar",previous:{title:"Introduction",permalink:"/docs/reference/integrations"},next:{title:"Get a single integration",permalink:"/docs/reference/integrations/get-single-integration"}},c={},l=[{value:"<strong>Example request</strong>",id:"example-request",level:3}];function d(n){const e={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"get-all-integrations",children:"Get all integrations"}),"\n",(0,i.jsx)(e.p,{children:"Use this endpoint to get a list of all integration configurations associated with the company. It provides an overview of the existing integrations, allowing users to view integration details and configurations."}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"URL:"})," ",(0,i.jsx)(e.code,{children:"https://api.connxio.no/integrations"})]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"Method:"})," ",(0,i.jsx)("span",{class:"method get",children:"GET"})]}),"\n",(0,i.jsx)(e.h3,{id:"example-request",children:(0,i.jsx)(e.strong,{children:"Example request"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-json",children:'// GET https://api.connxio.no/integrations\n\n// RESPONSE\n// 200 OK\n[\n    {\n        "id": "55203f92-6349-42d5-bd72-96094a7e4b25",\n        "name": "Integration1",\n        "description": "The first integration",\n        "sender": "sender",\n        "receiver": "receiver",\n        "companyId": "46f669ca-9770-490b-8183-34f88a6f2f0b",\n        "companyName": "Company1",\n        "subscriptionId": "c6c18345-65c3-46fb-af2f-30d223b08cc0",\n        "subscriptionName": "Subscription1",\n        "inboundConnection" {\n            ...\n        },\n        "subintegrations: [\n            ...\n        ]\n        ...\n    }\n]\n\n'})})]})}function g(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>a,a:()=>r});var i=t(7294);const o={},s=i.createContext(o);function r(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:r(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);