"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[3085],{18152:(e,n,t)=>{t.r(n),t.d(n,{default:()=>H});var o=t(67294),s=t(72389),c=t(36905),a=t(66412),l=t(35281),i=t(37016);const r={codeBlockContainer:"codeBlockContainer_Ckt0"};var d=t(85893);function u(e){let{as:n,...t}=e;const o=(0,a.p)(),s=(0,i.QC)(o);return(0,d.jsx)(n,{...t,style:s,className:(0,c.Z)(t.className,r.codeBlockContainer,l.k.common.codeBlock)})}const m={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function p(e){let{children:n,className:t}=e;return(0,d.jsx)(u,{as:"pre",tabIndex:0,className:(0,c.Z)(m.codeBlockStandalone,"thin-scrollbar",t),children:(0,d.jsx)("code",{className:m.codeBlockLines,children:n})})}var g=t(86668),h=t(85448),x=t(14965);const b={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function f(e){let{line:n,classNames:t,showLineNumbers:o,getLineProps:s,getTokenProps:a}=e;1===n.length&&"\n"===n[0].content&&(n[0].content="");const l=s({line:n,className:(0,c.Z)(t,o&&b.codeLine)}),i=n.map(((e,n)=>(0,d.jsx)("span",{...a({token:e,key:n})},n)));return(0,d.jsxs)("span",{...l,children:[o?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{className:b.codeLineNumber}),(0,d.jsx)("span",{className:b.codeLineContent,children:i})]}):i,(0,d.jsx)("br",{})]})}var k=t(10195),j=t(95999);function N(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function C(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const v={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function B(e){let{code:n,className:t}=e;const[s,a]=(0,o.useState)(!1),l=(0,o.useRef)(void 0),i=(0,o.useCallback)((()=>{(0,k.default)(n),a(!0),l.current=window.setTimeout((()=>{a(!1)}),1e3)}),[n]);return(0,o.useEffect)((()=>()=>window.clearTimeout(l.current)),[]),(0,d.jsx)("button",{type:"button","aria-label":s?(0,j.translate)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,j.translate)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,j.translate)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,c.Z)("clean-btn",t,v.copyButton,s&&v.copyButtonCopied),onClick:i,children:(0,d.jsxs)("span",{className:v.copyButtonIcons,"aria-hidden":"true",children:[(0,d.jsx)(N,{className:v.copyButtonIcon}),(0,d.jsx)(C,{className:v.copyButtonSuccessIcon})]})})}function y(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const L={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function _(e){let{className:n,onClick:t,isEnabled:o}=e;const s=(0,j.translate)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,d.jsx)("button",{type:"button",onClick:t,className:(0,c.Z)("clean-btn",n,o&&L.wordWrapButtonEnabled),"aria-label":s,title:s,children:(0,d.jsx)(y,{className:L.wordWrapButtonIcon,"aria-hidden":"true"})})}function w(e){let{children:n,className:t="",metastring:o,title:s,showLineNumbers:l,language:r}=e;const{prism:{defaultLanguage:p,magicComments:b}}=(0,g.L)(),k=function(e){return e?.toLowerCase()}(r??(0,i.Vo)(t)??p),j=(0,a.p)(),N=(0,h.F)(),C=(0,i.bc)(o)||s,{lineClassNames:v,code:y}=(0,i.nZ)(n,{metastring:o,language:k,magicComments:b}),L=l??(0,i.nt)(o);return(0,d.jsxs)(u,{as:"div",className:(0,c.Z)(t,k&&!t.includes(`language-${k}`)&&`language-${k}`),children:[C&&(0,d.jsx)("div",{className:m.codeBlockTitle,children:C}),(0,d.jsxs)("div",{className:m.codeBlockContent,children:[(0,d.jsx)(x.Highlight,{theme:j,code:y,language:k??"text",children:e=>{let{className:n,style:t,tokens:o,getLineProps:s,getTokenProps:a}=e;return(0,d.jsx)("pre",{tabIndex:0,ref:N.codeBlockRef,className:(0,c.Z)(n,m.codeBlock,"thin-scrollbar"),style:t,children:(0,d.jsx)("code",{className:(0,c.Z)(m.codeBlockLines,L&&m.codeBlockLinesWithNumbering),children:o.map(((e,n)=>(0,d.jsx)(f,{line:e,getLineProps:s,getTokenProps:a,classNames:v[n],showLineNumbers:L},n)))})})}}),(0,d.jsxs)("div",{className:m.buttonGroup,children:[(N.isEnabled||N.isCodeScrollable)&&(0,d.jsx)(_,{className:m.codeButton,onClick:()=>N.toggle(),isEnabled:N.isEnabled}),(0,d.jsx)(B,{className:m.codeButton,code:y})]})]})]})}function H(e){let{children:n,...t}=e;const c=(0,s.default)(),a=function(e){return o.Children.toArray(e).some((e=>(0,o.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(n),l="string"==typeof a?w:p;return(0,d.jsx)(l,{...t,children:a},String(c))}},14247:(e,n,t)=>{t.r(n),t.d(n,{default:()=>m});t(67294);var o=t(36905),s=t(10833),c=t(35281),a=t(62770),l=t(92104),i=t(39407),r=t(17158);const d={mdxPageWrapper:"mdxPageWrapper_j9I6"};var u=t(85893);function m(e){const{content:n}=e,{metadata:{title:t,description:m,frontMatter:p,unlisted:g},assets:h}=n,{keywords:x,wrapperClassName:b,hide_table_of_contents:f}=p,k=h.image??p.image;return(0,u.jsx)(s.FG,{className:(0,o.Z)(b??c.k.wrapper.mdxPages,c.k.page.mdxPage),children:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(s.d,{title:t,description:m,keywords:x,image:k}),(0,u.jsx)("main",{className:"container container--fluid margin-vert--lg",children:(0,u.jsxs)("div",{className:(0,o.Z)("row",d.mdxPageWrapper),children:[(0,u.jsxs)("div",{className:(0,o.Z)("col",!f&&"col--8"),children:[g&&(0,u.jsx)(r.default,{}),(0,u.jsx)("article",{children:(0,u.jsx)(l.Z,{children:(0,u.jsx)(n,{})})})]}),!f&&n.toc.length>0&&(0,u.jsx)("div",{className:"col col--2",children:(0,u.jsx)(i.Z,{toc:n.toc,minHeadingLevel:p.toc_min_heading_level,maxHeadingLevel:p.toc_max_heading_level})})]})})]})})}},39407:(e,n,t)=>{t.d(n,{Z:()=>r});t(67294);var o=t(36905),s=t(38011);const c={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"};var a=t(85893);const l="table-of-contents__link toc-highlight",i="table-of-contents__link--active";function r(e){let{className:n,...t}=e;return(0,a.jsx)("div",{className:(0,o.Z)(c.tableOfContents,"thin-scrollbar",n),children:(0,a.jsx)(s.Z,{...t,linkClassName:l,linkActiveClassName:i})})}},38011:(e,n,t)=>{t.d(n,{Z:()=>u});var o=t(67294),s=t(86668),c=t(39665),a=t(96841),l=t(33692),i=t(85893);function r(e){let{toc:n,className:t,linkClassName:o,isChild:s}=e;return n.length?(0,i.jsx)("ul",{className:s?void 0:t,children:n.map((e=>(0,i.jsxs)("li",{children:[(0,i.jsx)(l.default,{to:`#${e.id}`,className:o??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,i.jsx)(r,{isChild:!0,toc:e.children,className:t,linkClassName:o})]},e.id)))}):null}const d=o.memo(r);function u(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:r,minHeadingLevel:u,maxHeadingLevel:m,...p}=e;const g=(0,s.L)(),h=u??g.tableOfContents.minHeadingLevel,x=m??g.tableOfContents.maxHeadingLevel,b=(0,c.b)({toc:n,minHeadingLevel:h,maxHeadingLevel:x}),f=(0,o.useMemo)((()=>{if(l&&r)return{linkClassName:l,linkActiveClassName:r,minHeadingLevel:h,maxHeadingLevel:x}}),[l,r,h,x]);return(0,a.S)(f),(0,i.jsx)(d,{toc:b,className:t,linkClassName:l,...p})}},17158:(e,n,t)=>{t.r(n),t.d(n,{default:()=>r});t(67294);var o=t(36905),s=t(35835),c=t(35281),a=t(92775),l=t(85893);function i(e){let{className:n}=e;return(0,l.jsx)(a.Z,{type:"caution",title:(0,l.jsx)(s.cI,{}),className:(0,o.Z)(n,c.k.common.unlistedBanner),children:(0,l.jsx)(s.eU,{})})}function r(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.T$,{}),(0,l.jsx)(i,{...e})]})}},35835:(e,n,t)=>{t.d(n,{T$:()=>i,cI:()=>a,eU:()=>l});t(67294);var o=t(95999),s=t(35742),c=t(85893);function a(){return(0,c.jsx)(o.default,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,c.jsx)(o.default,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function i(){return(0,c.jsx)(s.Z,{children:(0,c.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}},10195:(e,n,t)=>{function o(e,n){let{target:t=document.body}=void 0===n?{}:n;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const o=document.createElement("textarea"),s=document.activeElement;o.value=e,o.setAttribute("readonly",""),o.style.contain="strict",o.style.position="absolute",o.style.left="-9999px",o.style.fontSize="12pt";const c=document.getSelection(),a=c.rangeCount>0&&c.getRangeAt(0);t.append(o),o.select(),o.selectionStart=0,o.selectionEnd=e.length;let l=!1;try{l=document.execCommand("copy")}catch{}return o.remove(),a&&(c.removeAllRanges(),c.addRange(a)),s&&s.focus(),l}t.r(n),t.d(n,{default:()=>o})}}]);