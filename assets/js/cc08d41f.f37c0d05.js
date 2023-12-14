"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[3347],{8273:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>h});var i=s(5893),t=s(1151),o=s(9965),a=s(4996);const r={sidebar_position:2},c="API Keys",l={id:"connxio-portal/apikeys",title:"API Keys",description:"By using API Keys, users can securely authenticate their requests to the Connxio REST API and ensure the appropriate level of access and functionality based on the assigned scopes.",source:"@site/../docs/connxio-portal/apikeys.mdx",sourceDirName:"connxio-portal",slug:"/connxio-portal/apikeys",permalink:"/docs/connxio-portal/apikeys",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"connxioSidebar",previous:{title:"Introduction",permalink:"/docs/connxio-portal"},next:{title:"Security Configurations",permalink:"/docs/connxio-portal/security-configurations"}},d={},h=[{value:"Creating an API Key",id:"creating-an-api-key",level:2},{value:"Using API Keys",id:"using-api-keys",level:2},{value:"Scopes",id:"scopes",level:2},{value:"Disabling API Keys",id:"disabling-api-keys",level:2}];function p(e){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"api-keys",children:"API Keys"}),"\n",(0,i.jsx)(n.p,{children:"By using API Keys, users can securely authenticate their requests to the Connxio REST API and ensure the appropriate level of access and functionality based on the assigned scopes."}),"\n",(0,i.jsx)(n.p,{children:"Please note that the Connxio API Key is associated with the subscription level, and its usage is subject to the permissions and access control defined within the associated subscription."}),"\n",(0,i.jsx)(n.h2,{id:"creating-an-api-key",children:"Creating an API Key"}),"\n",(0,i.jsx)(n.p,{children:"To create an API Key in Connxio, users need to navigate to the API Keys settings within the Connxio Portal. From there, they can generate an API Key and associate it with a specific subscription. During the creation process, users must set a scope for the API Key to define the level of access it grants."}),"\n","\n","\n",(0,i.jsx)("div",{style:{maxWidth:"800px"},children:(0,i.jsx)(o.Z,{alt:"How to create an API key",sources:{light:(0,a.Z)("/img/docs/create-apikey-light.webp"),dark:(0,a.Z)("/img/docs/create-apikey-dark.webp")}})}),"\n",(0,i.jsx)(n.h2,{id:"using-api-keys",children:"Using API Keys"}),"\n",(0,i.jsxs)(n.p,{children:["When making API requests, users need to include the necessary headers as described on the ",(0,i.jsx)(n.a,{href:"/reference/authentication",children:"authentication page"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"scopes",children:"Scopes"}),"\n",(0,i.jsx)(n.p,{children:"API Keys in Connxio support different scopes that determine the specific functionalities and endpoints they can access. The following scopes are available:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Messaging"}),": Grants access to the ",(0,i.jsx)(n.a,{href:"/reference/messages",children:"Messaging API"}),", enabling users to use the messaging endpoints for message submission and retrieval."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Management"}),": Provides access to the ",(0,i.jsx)(n.a,{href:"/reference/integrations",children:"Integrations"})," and ",(0,i.jsx)(n.a,{href:"/reference/subscriptions",children:"Subscriptions API"}),", allowing users to perform CRUD operations on integrations and manage subscription-related functionalities."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Webhook"}),": Allows bypassing the Oauth2.0 requirement when authenticating webhook requests. Please note that the use of the webhook scope is not recommended, and it's advisable to use other authentication methods whenever possible."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Users can assign multiple scopes to a single API Key if required. However, the recommended approach is to use separate API Keys for each specific scope."}),"\n",(0,i.jsx)(n.h2,{id:"disabling-api-keys",children:"Disabling API Keys"}),"\n",(0,i.jsx)(n.p,{children:"API Keys can be disabled at any time from the Connxio Portal. This allows administrators to revoke access and enhance security if needed."})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(7294);const t={},o=i.createContext(t);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);