"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[5727],{58983:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var s=i(85893),r=i(11151);const t={mdx:{format:"md"},date:"2022-11-15T20:00"},d="1.9.0",o={permalink:"/docs/changelog/1.9.0",source:"@site/changelog/source/1.9.0.md",title:"1.9.0",description:"New Features",date:"2022-11-15T20:00:00.000Z",formattedDate:"November 15, 2022",tags:[],hasTruncateMarker:!0,authors:[],frontMatter:{mdx:{format:"md"},date:"2022-11-15T20:00"},unlisted:!1,prevItem:{title:"1.9.1",permalink:"/docs/changelog/1.9.1"},listPageLink:"/docs/changelog/"},c={authorsImageUrls:[]},l=[{value:"\ud83d\ude80 New Features",id:"rocket-new-features",level:2},{value:"\ud83d\udc1b Bug Fix",id:"bug-bug-fix",level:2},{value:"\ud83d\udc85 Polish",id:"nail_care-polish",level:2},{value:"\ud83d\udcdd Documentation",id:"memo-documentation",level:2}];function a(e){const n={code:"code",em:"em",h2:"h2",li:"li",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"rocket-new-features",children:"\ud83d\ude80 New Features"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Error broker and Customer failure handling"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"added new error-broker engine that handles error persistance and indexing"}),"\n",(0,s.jsxs)(n.li,{children:["added customer facing UI called ",(0,s.jsx)(n.em,{children:"Failures"})," which exposes functionality for resending of failed messages"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Backoff retry"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"enabled previously created functionality for backoff retry and circuit breaker pattern which ties into error brokerage and error persistance"}),"\n",(0,s.jsx)(n.li,{children:"added customer facing UI panel inside integration details page which lets customers configure retry per integration"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Api-key"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"added restrictions to integrations UI that forces customers to upgrade to using api-key on already existing api integrations on save"}),"\n",(0,s.jsx)(n.li,{children:"implemented api-key inside api and ensured verification starting now"}),"\n",(0,s.jsx)(n.li,{children:"added customer facing api-key UI which lets customers limit access to webhook, management and messaging endpoints on the Connxio api by limiting api key access"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Email outbound adapter"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"added new email outbound adapter for customer use. Messaging limits apply."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Discard Endpoint"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"added discard endpoint which lets customers discard integration output when testing"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Data Collection"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["added rule engine sourced from ",(0,s.jsx)(n.em,{children:"outbound rest"})," adapter, used to react to http codes on http communication"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"bug-bug-fix",children:"\ud83d\udc1b Bug Fix"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Audit"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"fixed sorting not using date as date but as string"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Outbound SFTP"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Added retry to "Cannot find WinScp exe. Stopping execution" exceptions'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"nail_care-polish",children:"\ud83d\udc85 Polish"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Code components"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'added automatic suggestion of "next" version number on new code component upload'}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Audit"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"spruced up UI to conform to new standard"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"memo-documentation",children:"\ud83d\udcdd Documentation"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"Changelog"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"added changelog \ud83d\ude09"}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>d});var s=i(67294);const r={},t=s.createContext(r);function d(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);