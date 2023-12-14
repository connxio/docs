"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[4734],{1460:(e,t,n)=>{n.d(t,{Z:()=>b});var a=n(7294),s=n(6905),i=n(8862),r=n(7524),l=n(9960),o=n(5999),c=n(6550),m=n(8596);function d(e){const{pathname:t}=(0,c.TH)();return(0,a.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,m.Mg)(e.permalink,t))}(e,t)))),[e,t])}const u={sidebar:"sidebar_re4s",sidebarItemTitle:"sidebarItemTitle_pO2u",sidebarItemList:"sidebarItemList_Yudw",sidebarItem:"sidebarItem__DBe",sidebarItemLink:"sidebarItemLink_mo7H",sidebarItemLinkActive:"sidebarItemLinkActive_I1ZP"};var g=n(5893);function h(e){let{sidebar:t}=e;const n=d(t.items);return(0,g.jsx)("aside",{className:"col col--3",children:(0,g.jsxs)("nav",{className:(0,s.Z)(u.sidebar,"thin-scrollbar"),"aria-label":(0,o.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,g.jsx)("div",{className:(0,s.Z)(u.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,g.jsx)("ul",{className:(0,s.Z)(u.sidebarItemList,"clean-list"),children:n.map((e=>(0,g.jsx)("li",{className:u.sidebarItem,children:(0,g.jsx)(l.Z,{isNavLink:!0,to:e.permalink,className:u.sidebarItemLink,activeClassName:u.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var v=n(3102);function x(e){let{sidebar:t}=e;const n=d(t.items);return(0,g.jsx)("ul",{className:"menu__list",children:n.map((e=>(0,g.jsx)("li",{className:"menu__list-item",children:(0,g.jsx)(l.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function p(e){return(0,g.jsx)(v.Zo,{component:x,props:e})}function f(e){let{sidebar:t}=e;const n=(0,r.i)();return t?.items.length?"mobile"===n?(0,g.jsx)(p,{sidebar:t}):(0,g.jsx)(h,{sidebar:t}):null}function b(e){const{sidebar:t,toc:n,children:a,...r}=e,l=t&&t.items.length>0;return(0,g.jsx)(i.Z,{...r,children:(0,g.jsx)("div",{className:"container margin-vert--lg",children:(0,g.jsxs)("div",{className:"row",children:[(0,g.jsx)(f,{sidebar:t}),(0,g.jsx)("main",{className:(0,s.Z)("col",{"col--7":l,"col--9 col--offset-1":!l}),itemScope:!0,itemType:"https://schema.org/Blog",children:a}),n&&(0,g.jsx)("div",{className:"col col--2",children:n})]})})})}},5289:(e,t,n)=>{n.d(t,{Z:()=>r});n(7294);var a=n(4996),s=n(9460),i=n(5893);function r(e){let{children:t,className:n}=e;const{frontMatter:r,assets:l,metadata:{description:o}}=(0,s.C)(),{withBaseUrl:c}=(0,a.C)(),m=l.image??r.image,d=r.keywords??[];return(0,i.jsxs)("article",{className:n,itemProp:"blogPost",itemScope:!0,itemType:"https://schema.org/BlogPosting",children:[o&&(0,i.jsx)("meta",{itemProp:"description",content:o}),m&&(0,i.jsx)("link",{itemProp:"image",href:c(m,{absolute:!0})}),d.length>0&&(0,i.jsx)("meta",{itemProp:"keywords",content:d.join(",")}),t]})}},9714:(e,t,n)=>{n.d(t,{Z:()=>o});n(7294);var a=n(6905),s=n(8780),i=n(9460),r=n(2459),l=n(5893);function o(e){let{children:t,className:n}=e;const{isBlogPostPage:o}=(0,i.C)();return(0,l.jsx)("div",{id:o?s.blogPostContainerID:void 0,className:(0,a.Z)("markdown",n),itemProp:"articleBody",children:(0,l.jsx)(r.Z,{children:t})})}},7624:(e,t,n)=>{n.d(t,{Z:()=>u});n(7294);var a=n(6905),s=n(5999),i=n(8824),r=n(9460);const l={container:"container_mt6G"};var o=n(5893);function c(e){let{readingTime:t}=e;const n=function(){const{selectMessage:e}=(0,i.c)();return t=>{const n=Math.ceil(t);return e(n,(0,s.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:n}))}}();return(0,o.jsx)(o.Fragment,{children:n(t)})}function m(e){let{date:t,formattedDate:n}=e;return(0,o.jsx)("time",{dateTime:t,itemProp:"datePublished",children:n})}function d(){return(0,o.jsx)(o.Fragment,{children:" \xb7 "})}function u(e){let{className:t}=e;const{metadata:n}=(0,r.C)(),{date:s,formattedDate:i,readingTime:u}=n;return(0,o.jsxs)("div",{className:(0,a.Z)(l.container,"margin-vert--md",t),children:[(0,o.jsx)(m,{date:s,formattedDate:i}),void 0!==u&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{}),(0,o.jsx)(c,{readingTime:u})]})]})}},988:(e,t,n)=>{n.d(t,{Z:()=>o});n(7294);var a=n(6905),s=n(9960),i=n(9460);const r={title:"title_f1Hy"};var l=n(5893);function o(e){let{className:t}=e;const{metadata:n,isBlogPostPage:o}=(0,i.C)(),{permalink:c,title:m}=n,d=o?"h1":"h2";return(0,l.jsx)(d,{className:(0,a.Z)(r.title,t),itemProp:"headline",children:o?m:(0,l.jsx)(s.Z,{itemProp:"url",to:c,children:m})})}},2244:(e,t,n)=>{n.d(t,{Z:()=>r});n(7294);var a=n(6905),s=n(9960),i=n(5893);function r(e){const{permalink:t,title:n,subLabel:r,isNext:l}=e;return(0,i.jsxs)(s.Z,{className:(0,a.Z)("pagination-nav__link",l?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[r&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:r}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}},9407:(e,t,n)=>{n.d(t,{Z:()=>c});n(7294);var a=n(6905),s=n(3743);const i={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var r=n(5893);const l="table-of-contents__link toc-highlight",o="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,r.jsx)("div",{className:(0,a.Z)(i.tableOfContents,"thin-scrollbar",t),children:(0,r.jsx)(s.Z,{...n,linkClassName:l,linkActiveClassName:o})})}},3743:(e,t,n)=>{n.d(t,{Z:()=>v});var a=n(7294),s=n(6668);function i(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...s}=e;n>=0?t[n].children.push(s):a.push(s)})),a}function r(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=r({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function l(e){const t=e.getBoundingClientRect();return t.top===t.bottom?l(e.parentNode):t}function o(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>l(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(l(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function c(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,s.L)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function m(e){const t=(0,a.useRef)(void 0),n=c();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:s,minHeadingLevel:i,maxHeadingLevel:r}=e;function l(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),l=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let s=t;s<=n;s+=1)a.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:i,maxHeadingLevel:r}),c=o(l,{anchorTopOffset:n.current}),m=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(s),e.classList.add(s),t.current=e):e.classList.remove(s)}(e,e===m)}))}return document.addEventListener("scroll",l),document.addEventListener("resize",l),l(),()=>{document.removeEventListener("scroll",l),document.removeEventListener("resize",l)}}),[e,n])}var d=n(9960),u=n(5893);function g(e){let{toc:t,className:n,linkClassName:a,isChild:s}=e;return t.length?(0,u.jsx)("ul",{className:s?void 0:n,children:t.map((e=>(0,u.jsxs)("li",{children:[(0,u.jsx)(d.Z,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,u.jsx)(g,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const h=a.memo(g);function v(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:c,maxHeadingLevel:d,...g}=e;const v=(0,s.L)(),x=c??v.tableOfContents.minHeadingLevel,p=d??v.tableOfContents.maxHeadingLevel,f=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return(0,a.useMemo)((()=>r({toc:i(t),minHeadingLevel:n,maxHeadingLevel:s})),[t,n,s])}({toc:t,minHeadingLevel:x,maxHeadingLevel:p});return m((0,a.useMemo)((()=>{if(l&&o)return{linkClassName:l,linkActiveClassName:o,minHeadingLevel:x,maxHeadingLevel:p}}),[l,o,x,p])),(0,u.jsx)(h,{toc:f,className:n,linkClassName:l,...g})}},9460:(e,t,n)=>{n.d(t,{C:()=>o,n:()=>l});var a=n(7294),s=n(902),i=n(5893);const r=a.createContext(null);function l(e){let{children:t,content:n,isBlogPostPage:s=!1}=e;const l=function(e){let{content:t,isBlogPostPage:n}=e;return(0,a.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:n})),[t,n])}({content:n,isBlogPostPage:s});return(0,i.jsx)(r.Provider,{value:l,children:t})}function o(){const e=(0,a.useContext)(r);if(null===e)throw new s.i6("BlogPostProvider");return e}},8824:(e,t,n)=>{n.d(t,{c:()=>c});var a=n(7294),s=n(2263);const i=["zero","one","two","few","many","other"];function r(e){return i.filter((t=>e.includes(t)))}const l={locale:"en",pluralForms:r(["one","other"]),select:e=>1===e?"one":"other"};function o(){const{i18n:{currentLocale:e}}=(0,s.Z)();return(0,a.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:r(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),l}}),[e])}function c(){const e=o();return{selectMessage:(t,n)=>function(e,t,n){const a=e.split("|");if(1===a.length)return a[0];a.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${a.length}: ${e}`);const s=n.select(t),i=n.pluralForms.indexOf(s);return a[Math.min(i,a.length-1)]}(n,t,e)}}},1851:(e,t,n)=>{n.d(t,{Z:()=>L});var a=n(7294),s=n(9460),i=n(988),r=n(7624),l=n(6010),o=n(9960);const c={image:"image_oRbT"};var m=n(5893);function d(e){let{author:t,className:n}=e;const{name:a,url:s,imageURL:i}=t;return(0,m.jsx)("div",{className:(0,l.Z)("avatar margin-bottom--sm",n),children:i&&(0,m.jsx)(o.Z,{className:"avatar__photo-link avatar__photo",href:s,children:(0,m.jsx)("img",{className:c.image,src:i,alt:a,onError:e=>{e.currentTarget.src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" fill="none" stroke="%2325c2a0" stroke-width="30" version="1.1"><circle cx="300" cy="230" r="115"/><path stroke-linecap="butt" d="M106.81863443903,481.4 a205,205 1 0,1 386.36273112194,0"/></svg>'}})})})}function u(e){let{expanded:t,...n}=e;return t?(0,m.jsx)("svg",{viewBox:"0 0 1024 1024",width:"20",height:"20",fill:"currentColor",...n,children:(0,m.jsx)("path",{d:"M783.915092 1009.031953l-271.898251-277.615587-271.930737 277.550617a49.214558 49.214558 0 0 1-70.752018 0 51.780862 51.780862 0 0 1 0-72.246322l307.274261-313.706262a49.279528 49.279528 0 0 1 70.784503 0l307.33923 313.706262a51.975771 51.975771 0 0 1 0 72.311292 49.409467 49.409467 0 0 1-70.816988 0z m-307.306745-608.05155L169.269117 87.274141A51.975771 51.975771 0 0 1 169.269117 14.96285a49.409467 49.409467 0 0 1 70.816987 0l271.930737 277.615586L783.850122 14.96285a49.409467 49.409467 0 0 1 70.816988 0 51.975771 51.975771 0 0 1 0 72.311291l-307.33923 313.706262a49.376982 49.376982 0 0 1-70.719533 0z"})}):(0,m.jsx)("svg",{viewBox:"0 0 1024 1024",width:"20",height:"20",fill:"currentColor",...n,children:(0,m.jsx)("path",{d:"M476.612887 1009.12034L169.240699 695.380437a51.981345 51.981345 0 0 1 0-72.319045 49.382277 49.382277 0 0 1 70.824582 0l271.959897 277.645356 271.862433-277.645356a49.382277 49.382277 0 0 1 70.824582 0 51.981345 51.981345 0 0 1 0 72.319045l-307.307212 313.739903a49.447254 49.447254 0 0 1-70.792094 0z m307.274724-608.116755L511.99269 123.455693l-271.959897 277.645357a49.382277 49.382277 0 0 1-70.824582 0 51.981345 51.981345 0 0 1 0-72.319045L476.580399 15.042102a49.382277 49.382277 0 0 1 70.727117 0l307.372188 313.739903a51.981345 51.981345 0 0 1 0 72.319045 49.414766 49.414766 0 0 1-70.824582 0z"})})}const g={authorCol:"authorCol_mDBc",imageOnlyAuthorRow:"imageOnlyAuthorRow_WiD6",imageOnlyAuthorCol:"imageOnlyAuthorCol_uiac",toggleButton:"toggleButton_WvRg",toggleButtonIconExpanded:"toggleButtonIconExpanded_ERxv"};function h(e){let{className:t}=e;const{metadata:{authors:n},assets:i}=(0,s.C)(),[r,o]=(0,a.useState)(!1);if(0===n.length)return null;const c=n.slice(0,r?n.length:10);return(0,m.jsxs)("div",{className:(0,l.Z)("margin-top--md margin-bottom--sm",g.imageOnlyAuthorRow,t),children:[c.map(((e,t)=>(0,m.jsx)("div",{className:g.imageOnlyAuthorCol,children:(0,m.jsx)(d,{author:{...e,imageURL:i.authorsImageUrls[t]??e.imageURL}})},t))),n.length>10&&(0,m.jsx)("button",{className:(0,l.Z)("clean-btn",g.toggleButton),type:"button",onClick:()=>o((e=>!e)),"aria-label":"expand",children:(0,m.jsx)(u,{expanded:r})})]})}const v={changelogItemTitleList:"changelogItemTitleList_sueG"};function x(){const{isBlogPostPage:e}=(0,s.C)();return(0,m.jsx)(i.Z,{className:e?void 0:v.changelogItemTitleList})}function p(){return(0,m.jsxs)("header",{children:[(0,m.jsx)(x,{}),(0,m.jsx)(r.Z,{}),(0,m.jsx)(h,{})]})}var f=n(5289),b=n(9714);const j={changelogItemContainer:"changelogItemContainer_jeDt"};function L(e){let{children:t}=e;return(0,m.jsxs)(f.Z,{className:j.changelogItemContainer,children:[(0,m.jsx)(p,{}),(0,m.jsx)(b.Z,{children:t})]})}},1885:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});n(7294);var a=n(6010),s=n(5999),i=n(9960),r=n(1944),l=n(5281),o=n(9460),c=n(5893);function m(){const{assets:e,metadata:t}=(0,o.C)(),{title:n,description:a,date:s,tags:i,authors:l,frontMatter:m}=t,{keywords:d}=m,u=e.image??m.image;return(0,c.jsxs)(r.d,{title:n,description:a,keywords:d,image:u,children:[(0,c.jsx)("meta",{property:"og:type",content:"article"}),(0,c.jsx)("meta",{property:"article:published_time",content:s}),l.some((e=>e.url))&&(0,c.jsx)("meta",{property:"article:author",content:l.map((e=>e.url)).filter(Boolean).join(",")}),i.length>0&&(0,c.jsx)("meta",{property:"article:tag",content:i.map((e=>e.label)).join(",")})]})}var d=n(1460),u=n(1851),g=n(2244);function h(e){const{nextItem:t,prevItem:n}=e;return(0,c.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.I)({id:"theme.changelog.post.paginator.navAriaLabel",message:"Changelog item navigation",description:"The ARIA label for the changelog pagination"}),children:[n&&(0,c.jsx)(g.Z,{...n,subLabel:(0,c.jsx)(s.Z,{id:"theme.changelog.post.paginator.newerRelease",description:"The changelog button label to navigate to the newer release",children:"Newer release"})}),t&&(0,c.jsx)(g.Z,{...t,subLabel:(0,c.jsx)(s.Z,{id:"theme.changelog.post.paginator.olderRelease",description:"The changelog button label to navigate to the older release",children:"Older release"}),isNext:!0})]})}var v=n(9407);function x(){const{metadata:e}=(0,o.C)(),{listPageLink:t}=e;return(0,c.jsx)(i.Z,{to:t,children:(0,c.jsx)(s.Z,{id:"changelog.backLink",children:"\u2190 Back to index page"})})}function p(e){let{sidebar:t,children:n}=e;const{metadata:a,toc:s}=(0,o.C)(),{nextItem:i,prevItem:r,frontMatter:l}=a,{hide_table_of_contents:m,toc_min_heading_level:g,toc_max_heading_level:p}=l;return(0,c.jsxs)(d.Z,{sidebar:t,toc:!m&&s.length>0?(0,c.jsx)(v.Z,{toc:s,minHeadingLevel:g,maxHeadingLevel:p}):void 0,children:[(0,c.jsx)(x,{}),(0,c.jsx)(u.Z,{children:n}),(i||r)&&(0,c.jsx)(h,{nextItem:i,prevItem:r})]})}function f(e){const t=e.content;return(0,c.jsx)(o.n,{content:e.content,isBlogPostPage:!0,children:(0,c.jsxs)(r.FG,{className:(0,a.Z)(l.k.wrapper.blogPages,l.k.page.blogPostPage),children:[(0,c.jsx)(m,{}),(0,c.jsx)(p,{sidebar:e.sidebar,children:(0,c.jsx)(t,{})})]})})}}}]);