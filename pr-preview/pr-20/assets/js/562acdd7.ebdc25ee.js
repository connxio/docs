"use strict";(self.webpackChunkconnxio_docs=self.webpackChunkconnxio_docs||[]).push([[9794],{3627:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var i=n(5893),s=n(1151),o=n(9965),r=n(4996);const a={},l="FTP and SFTP",c={id:"integrations/adapters/inbound/sftp",title:"FTP and SFTP",description:"Connxio lets customers provide messages to the Connxio pipeline by supplying files via SFTP (there are very few differences between FTP and SFTP while configuring Connxio, when we write SFTP we mean both FTP and SFTP unless otherwise specified). This page details limitations of the SFTP protocol and how to configure and connect to a SFTP server.",source:"@site/../docs/integrations/adapters/inbound/sftp.md",sourceDirName:"integrations/adapters/inbound",slug:"/integrations/adapters/inbound/sftp",permalink:"/integrations/adapters/inbound/sftp",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"connxioSidebar",previous:{title:"Azure Service Bus",permalink:"/integrations/adapters/inbound/service-bus"},next:{title:"ACK",permalink:"/integrations/adapters/outbound/acknowledgment"}},h={},d=[{value:"Configuring the FTP and SFTP adapters",id:"configuring-the-ftp-and-sftp-adapters",level:2},{value:"Leasing",id:"leasing",level:2},{value:"Retry",id:"retry",level:2}];function u(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"ftp-and-sftp",children:"FTP and SFTP"}),"\n",(0,i.jsx)(t.p,{children:"Connxio lets customers provide messages to the Connxio pipeline by supplying files via SFTP (there are very few differences between FTP and SFTP while configuring Connxio, when we write SFTP we mean both FTP and SFTP unless otherwise specified). This page details limitations of the SFTP protocol and how to configure and connect to a SFTP server."}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Limitations"}),(0,i.jsxs)("p",{children:[(0,i.jsx)(t.p,{children:"There are several limitations inherent to the SFTP protocol. First and foremost SFTP servers are notoriously bad at handling connections, this mens that Connxio has to handle constant connection interruptions. Another limitation is traffic. SFTP has large problems with handling a lot of connections at the same time and will, in many circumstances, shut down completely when overwhelmed. All this culminates in a very unstable server connection which we handle in every way possible. We have used an enormous amount of resources to make our SFTP adapter as stable as possible since we know our customers have legacy systems that demands this protocol. We always recommend that you use other, more stable protocols if possible, but if you need to pick up SFTP files at some point we are very proud of our adapter, and it does represent the best possible solution for picking files from SFTP."}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),(0,i.jsx)(t.p,{children:"To handle these limitations in the best way possible for each individual server we have multiple advanced options that will be described below which tunes the connections such that you can use the setup that works best for you."})]})]}),"\n",(0,i.jsx)(t.h2,{id:"configuring-the-ftp-and-sftp-adapters",children:"Configuring the FTP and SFTP adapters"}),"\n",(0,i.jsx)(t.p,{children:'To configure Connxio to start processing your FTP/SFTP messages select the FTP or SFTP option in "Inbound Connection" shape:'}),"\n","\n","\n",(0,i.jsx)("div",{style:{maxWidth:"400px"},children:(0,i.jsx)(o.Z,{alt:"Configuring inbound connection",sources:{light:(0,r.Z)("/img/docs/inbound-connection-light.webp"),dark:(0,r.Z)("/img/docs/inbound-connection-dark.webp#dark-only")}})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(t.p,{children:"The following properties are used to configure the adapter:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Polling Interval in Seconds"}),":Polling"," interval dictates when files are picked from the SFTP account. The minimum interval allowed at this time is 60 seconds. You can specify intervals by typing in seconds."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"SFTP Security Configuration"}),": Reference to the ",(0,i.jsx)(t.a,{href:"/connxio-portal/security-configurations",children:"Security Configuration"})," that contains the relevant connection properties."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Directory"}),": he directory to pickup files in. Files will be deleted after pickup unless CopyMoveFolder is set."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"CopyMoveFolder"}),": Specifies a folder to move files to after pickup and disables deletion of files on pickup if set. This is mainly used to keep track of picked up files and can also be used to facilitate separate flows and other integrations."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"File Mask"}),": Specifies a search patter for files. This uses the WinScp syntax, read more about it in ",(0,i.jsx)(t.a,{href:"https://winscp.net/eng/docs/file_mask",children:"the documentation there"}),". All files not matching the set pattern will be ignored."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Concurrent SFTP Connections"}),": Limitations the number of concurrent connections to the FTP/SFTP server. This does not effect the connection count on Batch Size. But will prevent the connection from being re-established on the timer while the previous connection is active. Ie. if Connxio polling interval triggers (set to 60 seconds) and there are 10 000 files on the server. Cx will start picking files but will not finish before the polling interval triggers again. If this property is set to 1 the next connection will be blocked until the former operation finishes."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"File Pick Rate"}),": The number of files to be picked from the catalog per adapter run. If this option is set to 2 and polling interval is set to 1 min. The adapter will pick 2 files/min."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"File Pick Sorting Method"}),": The Sorting method specifies how the adapter sorts the files in the directory when picking them. Be aware that on text, numbers must be padded with zeroes on two digits or more."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Use Recursive Folder Handling"}),": Files will be picked from all sub folders in the current directory. Files inside the top level will be picked as well. Default behavior with this option turned off is that the engine ignores folders entirely and picks files only."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Add Blacklist Match"}),": Press this button to add a match field to the blacklist. Each field can contain a single regex which will be matched against the entire file path on the server in the order written. If you are looking for a file called file.xml the path could look something like this: ",(0,i.jsx)(t.code,{children:"/Temp/cmh/testenvironment/files/Inbound/file.xml"}),". A valid regex to exclude could be ",(0,i.jsx)(t.code,{children:"files"})," which would exclude all paths that have the file string in it. We follow the C# rules for regex. Blacklisting runs before file pick rate is calculated."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Batch Size"}),": The number of files per batch. If set to 100 and 400 msgs are dropped on server, 4 connections with 100 files will be created when Connxio starts processing messages. Be aware that SFTP and FTP are usually severely limited on resources so the batch size should be set to a high number depending on how many files there are at peak load. 1000 is usually a good starting number, ",(0,i.jsx)(t.em,{children:"decrease"})," this number to speed up the picking process."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Use Static Ip"}),": Forces Connxio to run SFTP traffic on static Ip. This uses a separately hosted functionality that limits parallelization and can effect performance on high traffic scenarios."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Lock On Folder"}),": Decides if a connection should lock on folder in SFTP server or the whole server (false means that the lock is applied on the whole server). If you have multiple inbound configs on one server this ",(0,i.jsx)(t.strong,{children:"must"})," be enabled."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Perform Duplicate Detection"}),": Turns on duplicate detection. This does not give a guarantee for no duplicates but detects duplicates on inbound pickup only. The detection works by MD5 hashing the file contents and creating a unique id with the generated hash combined with the name of the file. This is not 100% foolproof but should work in 99% of cases. The detection is costly and should only be turned on if absolutely necessary. Be aware that addition costs may be incurred by turning this on depending on your price plan."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Terminate On Duplicate Detection"}),": If the duplicate detection system finds a duplicate this parameter decides if the message should be sent through the system, or terminated. If the file is terminated it's moved to a sub-folder called ",(0,i.jsx)(t.em,{children:"duplicates"})," on the same area where the file was picked up from."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"leasing",children:"Leasing"}),"\n",(0,i.jsxs)(t.p,{children:["The (S)ftp inbound adapter uses leasing to ensure that only one process is picking from the server at any one time. This prevents deadlocks and race conditions towards files on the SFTP area. By default the leasing is set to the ",(0,i.jsx)(t.em,{children:"polling interval"}),", which means that the thread processing the SFTP files is the sole worker for the same duration as the interval between polling. This is usually very effective as you ensure that only one process contacts the resource for every time you poll against it."]}),"\n",(0,i.jsxs)(t.p,{children:["If you have a server with a lot of messages arriving continually however, this can cause problems. This is because you probably want the process from Connxio to poll every minute to pick up files as fast as possible, but since new files are arriving constantly you cant guarantee that the process will finish before the minute mark which causes a new process to be created after the leasing has run out. This in turn causes multiple processes from Connxio to process the same files at the same time. This doesn't cause duplicates but ",(0,i.jsx)(t.em,{children:"can"})," cause race condition where already picked files are processed by both threads at the same time."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:"https://cmhpictsa.blob.core.windows.net/pictures/Sftp%20inbound%20process%20lock.png?sv=2021-04-10&st=2022-12-01T07%3A54%3A23Z&se=2040-12-02T07%3A54%3A00Z&sr=b&sp=r&sig=YBfEB8vwE2PXr1tA0T%2BoE7sA8Z6swBtKJjVeLfL7PAE%3D",alt:"img"})}),"\n",(0,i.jsxs)(t.p,{children:["To solve this problem we have added the ",(0,i.jsx)(t.em,{children:"Use Process Lock"})," option which lets you lock the process for the time the process takes to complete. This can cause the ",(0,i.jsx)(t.em,{children:"polling interval"})," to become erratic as a new process is not allowed to start before the first one finishes. This will prevent race conditions when long running processes on constantly filling servers are causing problems. It's up to you as customers to enable this when needed as it depends on the server and load."]}),"\n",(0,i.jsx)(t.h2,{id:"retry",children:"Retry"}),"\n",(0,i.jsxs)(t.p,{children:["Since Connxio reaches out and pick up files when using the SFTP inbound adapter, retry is handled by the Connxio framework. If a fault happens when the polling interval hits, the integration will be marked for execution at the next interval, which is after 60 seconds. This means that even if you have the polling interval set to trigger hourly or event daily, Connxio will try to execute the configuration every minute util it succeeds. This does not happen if the message is already picked up however, since Connxio cant be sure the message is possible to requeue on the external server. The message will be sent to catastrophic retry as described in the ",(0,i.jsx)(t.a,{href:"/integrations/retry",children:"Retry Page"})," when fault happen after message pickup and deletion."]}),"\n",(0,i.jsx)(t.p,{children:'It is worth noting that if a catastrophic failure should occur where we cant reach our internal failure system files may be added back to the SFTP server in an "Error" directory. If you see files in such a directory you can usually just put them back into the normal directory. If this keeps happening however, please check you logging provider or contact us directly.'})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>r});var i=n(7294);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);