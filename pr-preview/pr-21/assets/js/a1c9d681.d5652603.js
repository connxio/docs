"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[8581],{60328:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var r=i(85893),t=i(11151);const s={mdx:{format:"md"},date:"2022-12-06T20:00"},d="1.9.1",l={permalink:"/docs/changelog/1.9.1",source:"@site/changelog/source/1.9.1.md",title:"1.9.1",description:"New Features",date:"2022-12-06T20:00:00.000Z",formattedDate:"December 6, 2022",tags:[],hasTruncateMarker:!0,authors:[],frontMatter:{mdx:{format:"md"},date:"2022-12-06T20:00"},unlisted:!1,prevItem:{title:"1.9.2",permalink:"/docs/changelog/1.9.2"},nextItem:{title:"1.9.0",permalink:"/docs/changelog/1.9.0"},listPageLink:"/docs/changelog/"},a={authorsImageUrls:[]},c=[{value:"\ud83d\ude80 New Features",id:"rocket-new-features",level:2},{value:"\ud83d\udc1b Bug Fix",id:"bug-bug-fix",level:2},{value:"\ud83d\udc85 Polish",id:"nail_care-polish",level:2}];function o(e){const n={code:"code",em:"em",h2:"h2",li:"li",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"rocket-new-features",children:"\ud83d\ude80 New Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Api-key (Hotfix: 08.12.22)"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"enabled Api Key for management api"}),"\n",(0,r.jsx)(n.li,{children:"work to make Api Keys opt-in has started"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Variable replacement for sender and receiver"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"you can now use variable replacement functionality for sender and receiver fields"}),"\n",(0,r.jsxs)(n.li,{children:["added ",(0,r.jsx)(n.em,{children:"fallback"})," keyword error pipe to handle fallback on required properties like sender and receiver"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Two-factor login"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"you can now enable MFA authentication on the user settings page. This is disabled by default. Email is used for code retrieval. App is considered for implementation."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Service bus queue adapter"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"added new queue adapter type to service bus adapter"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Storage queue adapter"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"added new queue adapter type to Azure Storage adapter"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"bug-bug-fix",children:"\ud83d\udc1b Bug Fix"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Hotfix (30.11.22): SFTP retry"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:'fixed "WinScp not found" error on outbound Sftp adapter for Sftp and Ftp'}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Hotfix (08.12.22): Fixed API not accepting query requests"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Api did not accept request after deployment. This was caused by a mismatch of model packages withing the NuGet tree."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Hotfix (08.12.22): Fixed outbound REST not adding headers on binary file"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:'Api did not add headers when "Handle As Binary File" was checked for integration. Also added the "application/octet-stream" header when sending as binary.'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"nail_care-polish",children:"\ud83d\udc85 Polish"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Added new transformation interface to Ack functionality"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Ack functionality now uses the new mapping specification"}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>d});var r=i(67294);const t={},s=r.createContext(t);function d(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);