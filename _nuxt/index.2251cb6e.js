import{n as se,r as k,s as ne,q as ie,u as le,v as $,g as ae,x as ue,y as re,z as c,m as pe,A as j,B as L,C as ce,D as de,E as he,o as y,c as w,a as t,F as b,G as q,H as O,d as A,I as v,J as G,t as C,K as P,L as R,_ as _e,M as x,N as be,O as me,P as F}from"./entry.a11089fa.js";function H(){const a="/home/pi/led-hexahedron/apps/",o=a+"src/";return{appDir:a,appSrcDir:o,hZellerDir:"/home/pi/rpi-rgb-led-matrix/",cubeOptions:["--led-rows","64","--led-cols","64","--led-chain","2","--led-parallel","3","--led-slowdown-gpio","3"]}}const W=Object.freeze({ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1,excludeKeys:void 0,excludeValues:void 0,replacer:void 0});function fe(a,o){o?o={...W,...o}:o=W;const i=te(o);return i.dispatch(a),i.toString()}const ve=Object.freeze(["prototype","__proto__","constructor"]);function te(a){let o="",i=new Map;const s=e=>{o+=e};return{toString(){return o},getContext(){return i},dispatch(e){return a.replacer&&(e=a.replacer(e)),this[e===null?"null":typeof e](e)},object(e){if(e&&typeof e.toJSON=="function")return this.object(e.toJSON());const l=Object.prototype.toString.call(e);let n="";const _=l.length;_<10?n="unknown:["+l+"]":n=l.slice(8,_-1),n=n.toLowerCase();let p=null;if((p=i.get(e))===void 0)i.set(e,i.size);else return this.dispatch("[CIRCULAR:"+p+"]");if(typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(e))return s("buffer:"),s(e.toString("utf8"));if(n!=="object"&&n!=="function"&&n!=="asyncfunction")this[n]?this[n](e):a.ignoreUnknown||this.unkown(e,n);else{let u=Object.keys(e);a.unorderedObjects&&(u=u.sort());let h=[];a.respectType!==!1&&!Z(e)&&(h=ve),a.excludeKeys&&(u=u.filter(r=>!a.excludeKeys(r)),h=h.filter(r=>!a.excludeKeys(r))),s("object:"+(u.length+h.length)+":");const d=r=>{this.dispatch(r),s(":"),a.excludeValues||this.dispatch(e[r]),s(",")};for(const r of u)d(r);for(const r of h)d(r)}},array(e,l){if(l=l===void 0?a.unorderedArrays!==!1:l,s("array:"+e.length+":"),!l||e.length<=1){for(const p of e)this.dispatch(p);return}const n=new Map,_=e.map(p=>{const u=te(a);u.dispatch(p);for(const[h,d]of u.getContext())n.set(h,d);return u.toString()});return i=n,_.sort(),this.array(_,!1)},date(e){return s("date:"+e.toJSON())},symbol(e){return s("symbol:"+e.toString())},unkown(e,l){if(s(l),!!e&&(s(":"),e&&typeof e.entries=="function"))return this.array(Array.from(e.entries()),!0)},error(e){return s("error:"+e.toString())},boolean(e){return s("bool:"+e)},string(e){s("string:"+e.length+":"),s(e)},function(e){s("fn:"),Z(e)?this.dispatch("[native]"):this.dispatch(e.toString()),a.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(e.name)),a.respectFunctionProperties&&this.object(e)},number(e){return s("number:"+e)},xml(e){return s("xml:"+e.toString())},null(){return s("Null")},undefined(){return s("Undefined")},regexp(e){return s("regex:"+e.toString())},uint8array(e){return s("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},uint8clampedarray(e){return s("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},int8array(e){return s("int8array:"),this.dispatch(Array.prototype.slice.call(e))},uint16array(e){return s("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},int16array(e){return s("int16array:"),this.dispatch(Array.prototype.slice.call(e))},uint32array(e){return s("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},int32array(e){return s("int32array:"),this.dispatch(Array.prototype.slice.call(e))},float32array(e){return s("float32array:"),this.dispatch(Array.prototype.slice.call(e))},float64array(e){return s("float64array:"),this.dispatch(Array.prototype.slice.call(e))},arraybuffer(e){return s("arraybuffer:"),this.dispatch(new Uint8Array(e))},url(e){return s("url:"+e.toString())},map(e){s("map:");const l=[...e];return this.array(l,a.unorderedSets!==!1)},set(e){s("set:");const l=[...e];return this.array(l,a.unorderedSets!==!1)},file(e){return s("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},blob(){if(a.ignoreUnknown)return s("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},domwindow(){return s("domwindow")},bigint(e){return s("bigint:"+e.toString())},process(){return s("process")},timer(){return s("timer")},pipe(){return s("pipe")},tcp(){return s("tcp")},udp(){return s("udp")},tty(){return s("tty")},statwatcher(){return s("statwatcher")},securecontext(){return s("securecontext")},connection(){return s("connection")},zlib(){return s("zlib")},context(){return s("context")},nodescript(){return s("nodescript")},httpparser(){return s("httpparser")},dataview(){return s("dataview")},signal(){return s("signal")},fsevent(){return s("fsevent")},tlswrap(){return s("tlswrap")}}}const oe="[native code] }",ye=oe.length;function Z(a){return typeof a!="function"?!1:Function.prototype.toString.call(a).slice(-ye)===oe}class z{constructor(o,i){o=this.words=o||[],this.sigBytes=i===void 0?o.length*4:i}toString(o){return(o||ge).stringify(this)}concat(o){if(this.clamp(),this.sigBytes%4)for(let i=0;i<o.sigBytes;i++){const s=o.words[i>>>2]>>>24-i%4*8&255;this.words[this.sigBytes+i>>>2]|=s<<24-(this.sigBytes+i)%4*8}else for(let i=0;i<o.sigBytes;i+=4)this.words[this.sigBytes+i>>>2]=o.words[i>>>2];return this.sigBytes+=o.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new z([...this.words])}}const ge={stringify(a){const o=[];for(let i=0;i<a.sigBytes;i++){const s=a.words[i>>>2]>>>24-i%4*8&255;o.push((s>>>4).toString(16),(s&15).toString(16))}return o.join("")}},ke={stringify(a){const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=[];for(let s=0;s<a.sigBytes;s+=3){const e=a.words[s>>>2]>>>24-s%4*8&255,l=a.words[s+1>>>2]>>>24-(s+1)%4*8&255,n=a.words[s+2>>>2]>>>24-(s+2)%4*8&255,_=e<<16|l<<8|n;for(let p=0;p<4&&s*8+p*6<a.sigBytes*8;p++)i.push(o.charAt(_>>>6*(3-p)&63))}return i.join("")}},Ce={parse(a){const o=a.length,i=[];for(let s=0;s<o;s++)i[s>>>2]|=(a.charCodeAt(s)&255)<<24-s%4*8;return new z(i,o)}},we={parse(a){return Ce.parse(unescape(encodeURIComponent(a)))}};class Se{constructor(){this._data=new z,this._nDataBytes=0,this._minBufferSize=0,this.blockSize=512/32}reset(){this._data=new z,this._nDataBytes=0}_append(o){typeof o=="string"&&(o=we.parse(o)),this._data.concat(o),this._nDataBytes+=o.sigBytes}_doProcessBlock(o,i){}_process(o){let i,s=this._data.sigBytes/(this.blockSize*4);o?s=Math.ceil(s):s=Math.max((s|0)-this._minBufferSize,0);const e=s*this.blockSize,l=Math.min(e*4,this._data.sigBytes);if(e){for(let n=0;n<e;n+=this.blockSize)this._doProcessBlock(this._data.words,n);i=this._data.words.splice(0,e),this._data.sigBytes-=l}return new z(i,l)}}class Ae extends Se{update(o){return this._append(o),this._process(),this}finalize(o){o&&this._append(o)}}const X=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],xe=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],V=[];class Pe extends Ae{constructor(){super(...arguments),this._hash=new z([...X])}reset(){super.reset(),this._hash=new z([...X])}_doProcessBlock(o,i){const s=this._hash.words;let e=s[0],l=s[1],n=s[2],_=s[3],p=s[4],u=s[5],h=s[6],d=s[7];for(let r=0;r<64;r++){if(r<16)V[r]=o[i+r]|0;else{const T=V[r-15],M=(T<<25|T>>>7)^(T<<14|T>>>18)^T>>>3,E=V[r-2],U=(E<<15|E>>>17)^(E<<13|E>>>19)^E>>>10;V[r]=M+V[r-7]+U+V[r-16]}const m=p&u^~p&h,f=e&l^e&n^l&n,D=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22),g=(p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25),S=d+g+m+xe[r]+V[r],N=D+f;d=h,h=u,u=p,p=_+S|0,_=n,n=l,l=e,e=S+N|0}s[0]=s[0]+e|0,s[1]=s[1]+l|0,s[2]=s[2]+n|0,s[3]=s[3]+_|0,s[4]=s[4]+p|0,s[5]=s[5]+u|0,s[6]=s[6]+h|0,s[7]=s[7]+d|0}finalize(o){super.finalize(o);const i=this._nDataBytes*8,s=this._data.sigBytes*8;return this._data.words[s>>>5]|=128<<24-s%32,this._data.words[(s+64>>>9<<4)+14]=Math.floor(i/4294967296),this._data.words[(s+64>>>9<<4)+15]=i,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function Re(a){return new Pe().finalize(a).toString(ke)}function Be(a,o={}){const i=typeof a=="string"?a:fe(a,o);return Re(i).slice(0,10)}function De(...a){var m;const o=typeof a[a.length-1]=="string"?a.pop():void 0;typeof a[0]!="string"&&a.unshift(o);let[i,s,e={}]=a;if(typeof i!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof s!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const l=ue(),n=()=>null,_=()=>l.isHydrating?l.payload.data[i]:l.static.data[i];e.server=e.server??!0,e.default=e.default??n,e.getCachedData=e.getCachedData??_,e.lazy=e.lazy??!1,e.immediate=e.immediate??!0,e.deep=e.deep??se.deep;const p=()=>![null,void 0].includes(e.getCachedData(i));if(!l._asyncData[i]||!e.immediate){(m=l.payload._errors)[i]??(m[i]=null);const f=e.deep?k:ne;l._asyncData[i]={data:f(e.getCachedData(i)??e.default()),pending:k(!p()),error:ie(l.payload._errors,i),status:k("idle")}}const u={...l._asyncData[i]};u.refresh=u.execute=(f={})=>{if(l._asyncDataPromises[i]){if(f.dedupe===!1)return l._asyncDataPromises[i];l._asyncDataPromises[i].cancelled=!0}if((f._initial||l.isHydrating&&f._initial!==!1)&&p())return Promise.resolve(e.getCachedData(i));u.pending.value=!0,u.status.value="pending";const D=new Promise((g,S)=>{try{g(s(l))}catch(N){S(N)}}).then(g=>{if(D.cancelled)return l._asyncDataPromises[i];let S=g;e.transform&&(S=e.transform(g)),e.pick&&(S=Me(S,e.pick)),l.payload.data[i]=S,u.data.value=S,u.error.value=null,u.status.value="success"}).catch(g=>{if(D.cancelled)return l._asyncDataPromises[i];u.error.value=re(g),u.data.value=c(e.default()),u.status.value="error"}).finally(()=>{D.cancelled||(u.pending.value=!1,delete l._asyncDataPromises[i])});return l._asyncDataPromises[i]=D,l._asyncDataPromises[i]};const h=()=>u.refresh({_initial:!0}),d=e.server!==!1&&l.payload.serverRendered;{const f=pe();if(f&&!f._nuxtOnBeforeMountCbs){f._nuxtOnBeforeMountCbs=[];const g=f._nuxtOnBeforeMountCbs;f&&(le(()=>{g.forEach(S=>{S()}),g.splice(0,g.length)}),$(()=>g.splice(0,g.length)))}d&&l.isHydrating&&(u.error.value||p())?(u.pending.value=!1,u.status.value=u.error.value?"error":"success"):f&&(l.payload.serverRendered&&l.isHydrating||e.lazy)&&e.immediate?f._nuxtOnBeforeMountCbs.push(h):e.immediate&&h(),e.watch&&ae(e.watch,()=>u.refresh());const D=l.hook("app:data:refresh",async g=>{(!g||g.includes(i))&&await u.refresh()});f&&$(D)}const r=Promise.resolve(l._asyncDataPromises[i]).then(()=>u);return Object.assign(r,u),r}function Me(a,o){const i={};for(const s of o)i[s]=a[s];return i}function Oe(a,o,i){const[s={},e]=typeof o=="string"?[{},o]:[o,i],l=j(()=>{let U=a;return typeof U=="function"&&(U=U()),L(U)}),n=s.key||Be([e,typeof l.value=="string"?l.value:"",...Ue(s)]);if(!n||typeof n!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+n);if(!a)throw new Error("[nuxt] [useFetch] request is missing.");const _=n===e?"$f"+n:n;if(!s.baseURL&&typeof l.value=="string"&&l.value.startsWith("//"))throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:p,lazy:u,default:h,transform:d,pick:r,watch:m,immediate:f,getCachedData:D,deep:g,...S}=s,N=ce({...de,...S,cache:typeof s.cache=="boolean"?void 0:s.cache}),T={server:p,lazy:u,default:h,transform:d,pick:r,immediate:f,getCachedData:D,deep:g,watch:m===!1?[]:[N,l,...m||[]]};let M;return De(_,()=>{var K;(K=M==null?void 0:M.abort)==null||K.call(M),M=typeof AbortController<"u"?new AbortController:{};const U=L(s.timeout);return U&&setTimeout(()=>M.abort(),U),(s.$fetch||globalThis.$fetch)(l.value,{signal:M.signal,...N})},T)}function Ue(a){var i;const o=[((i=L(a.method))==null?void 0:i.toUpperCase())||"GET",L(a.baseURL)];for(const s of[a.params||a.query]){const e=L(s);if(!e)continue;const l={},n=Array.isArray(e)?e:Object.entries(e);for(const[_,p]of n)l[L(_)]=L(p);o.push(l)}return o}const Y=(a,o)=>{const i=he();return Oe(a,{baseURL:i.public.API_BASE_URL,...o},"$wSXhmESSm2")};function I(){return{start:async i=>{try{return await Y("/start",{method:"POST",body:{cubeAppCommand:i}})}catch(s){console.error(s),alert("something went wrong! see console")}},stop:async()=>{try{return await Y("/stop")}catch(i){console.error(i),alert("something went wrong! see console")}}}}const ze={class:"field"},Te=t("label",{class:"label"},"Type:",-1),Ve={class:"control"},Le={class:"radio"},Ne={class:"radio"},Ee={class:"field"},Fe=t("label",{class:"label"},"Animation every:",-1),je={class:"select"},He=["disabled"],Ge=t("option",{value:void 0},"no animation",-1),Ie=R('<option value="1">1 minute</option><option value="5">5 minutes</option><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">60 minutes</option>',5),Qe=[Ge,Ie],Je={class:"field"},Ke=t("label",{class:"label"},"Language:",-1),$e={class:"select"},qe=["disabled"],We=t("option",{value:"Nederlands"},"Nederlands",-1),Ze=t("option",{value:"English"},"English",-1),Xe=t("option",{value:"Deutsch"},"Deutsch",-1),Ye=t("option",{value:"Français"},"Français",-1),et=[We,Ze,Xe,Ye],tt={class:"field"},ot={class:"checkbox"},st=["disabled"],nt={style:{"word-break":"break-all"}},it={class:"field is-grouped"},lt={class:"control"},at=["disabled"],ut={class:"control"},rt={__name:"Clock",setup(a){const o=k(!1),i=k("digital"),s=k("Nederlands"),e=k(),l=k(!1),{appSrcDir:n}=H(),{start:_,stop:p}=I(),u=j(()=>{if(i.value=="digital"&&o.value){const d=["ts-node",n+"celestialBodies/showDayNightMap.ts"];return d.push("--zenith"),d.push("LBU"),d.push("--realTime"),d.push("--digitalClock"),d}else{const d=["ts-node",n+"smartClock/smartClock.ts"];return d.push("--clockType"),d.push(i.value),e.value&&(d.push("--animationInterval"),d.push(e.value)),d.push("--language"),d.push(s.value),d}});async function h(){l.value=!0;const d=await _(u.value);console.log(d.data),l.value=!1}return(d,r)=>(y(),w("div",null,[t("div",ze,[Te,t("div",Ve,[t("label",Le,[b(t("input",{type:"radio",id:"'digital'",value:"digital","onUpdate:modelValue":r[0]||(r[0]=m=>O(i)?i.value=m:null)},null,512),[[q,c(i)]]),A(" Digital ")]),t("label",Ne,[b(t("input",{type:"radio",id:"word",value:"word","onUpdate:modelValue":r[1]||(r[1]=m=>O(i)?i.value=m:null)},null,512),[[q,c(i)]]),A(" Word ")])])]),t("div",Ee,[Fe,t("div",je,[b(t("select",{"onUpdate:modelValue":r[2]||(r[2]=m=>O(e)?e.value=m:null),disabled:c(i)!="word"},Qe,8,He),[[v,c(e)]])])]),t("div",Je,[Ke,t("div",$e,[b(t("select",{"onUpdate:modelValue":r[3]||(r[3]=m=>O(s)?s.value=m:null),disabled:c(i)!="word"},et,8,qe),[[v,c(s)]])])]),t("div",tt,[t("label",ot,[b(t("input",{type:"checkbox","onUpdate:modelValue":r[4]||(r[4]=m=>O(o)?o.value=m:null),disabled:c(i)!="digital"},null,8,st),[[G,c(o)]]),A(" Show day/night background ")])]),t("div",nt,C(c(u)),1),t("div",it,[t("p",lt,[t("button",{disabled:!c(i),onClick:h,class:P(["button is-primary",{"is-loading":c(l)}])},"Show Clock",10,at)]),t("p",ut,[t("button",{onClick:r[5]||(r[5]=(...m)=>c(p)&&c(p)(...m)),class:P(["button is-danger",{"is-loading":c(l)}])},"Stop",2)])])]))}},pt={class:"field"},ct=t("label",{class:"label"},"Pictures directory:",-1),dt={class:"select"},ht=R('<option value="family">family</option><option value="chess_set">chess</option><option value="emoji">emoji&#39;s</option><option value="flag">flags</option><option value="borg">borg</option>',5),_t=[ht],bt={class:"field"},mt={class:"checkbox"},ft={style:{"word-break":"break-all"}},vt={class:"field is-grouped"},yt={class:"control"},gt={class:"control"},kt={__name:"Pictures",setup(a){const o=k("emoji"),i=k(!1),s=k(!1),{appDir:e,appSrcDir:l,hZellerDir:n,cubeOptions:_}=H(),{start:p,stop:u}=I(),h=j(()=>{let r;return i.value?(r=["sudo",n+"utils/led-image-viewer",..._,"-f","-w3","-s"],o.value&&r.push(e+"cube_pictures/"+o.value+"/*.png")):(r=["ts-node",l+"cubePictures/showCubePictures.ts"],o.value&&(r.push("--cubePictureDir"),r.push(o.value)),r.push("--showTime"),r.push(20)),r});async function d(){s.value=!0;const r=await p(h.value);console.log(r.data),s.value=!1}return(r,m)=>(y(),w("div",null,[t("div",pt,[ct,t("div",dt,[b(t("select",{"onUpdate:modelValue":m[0]||(m[0]=f=>O(o)?o.value=f:null)},_t,512),[[v,c(o)]])])]),t("div",bt,[t("label",mt,[b(t("input",{type:"checkbox","onUpdate:modelValue":m[1]||(m[1]=f=>O(i)?i.value=f:null)},null,512),[[G,c(i)]]),A(" Slide Show ")])]),t("div",ft,C(c(h)),1),t("div",vt,[t("p",yt,[t("button",{onClick:d,class:P(["button is-primary",{"is-loading":c(s)}])}," Show Pictures ",2)]),t("p",gt,[t("button",{onClick:m[2]||(m[2]=(...f)=>c(u)&&c(u)(...f)),class:P(["button is-danger",{"is-loading":c(s)}])},"Stop",2)])])]))}},Ct={class:"field"},wt=t("label",{class:"label"},"Celestial body:",-1),St={class:"select"},At=R('<option value="earth.jpg">earth</option><option value="sun.jpg">sun</option><option value="moon.jpg">moon</option><option value="mercury.jpg">mercury</option><option value="venus.jpg">venus</option><option value="mars.jpg">mars</option><option value="jupiter.jpg">jupiter</option><option value="blackhole.jpg">blackhole</option>',8),xt=[At],Pt={class:"field"},Rt={class:"checkbox"},Bt={style:{"word-break":"break-all"}},Dt={class:"field is-grouped"},Mt={class:"control"},Ot=["disabled"],Ut={class:"control"},zt={__name:"CelestialBodies",setup(a){const o=k(!1),i=k("earth"),s=k(!1),{appSrcDir:e}=H(),{start:l,stop:n}=I(),_=j(()=>{const u=["ts-node",e+"celestialBodies/showCubeLatlonmap.ts"];return u.push("-i"),u.push(i.value),o.value&&u.push("--rotate"),u});async function p(){s.value=!0;const u=await l(_.value);console.log(u.data),s.value=!1}return(u,h)=>(y(),w("div",null,[t("div",Ct,[wt,t("div",St,[b(t("select",{"onUpdate:modelValue":h[0]||(h[0]=d=>O(i)?i.value=d:null)},xt,512),[[v,c(i)]])])]),t("div",Pt,[t("label",Rt,[b(t("input",{type:"checkbox","onUpdate:modelValue":h[1]||(h[1]=d=>O(o)?o.value=d:null)},null,512),[[G,c(o)]]),A(" Rotate ")])]),t("div",Bt,C(c(_)),1),t("div",Dt,[t("p",Mt,[t("button",{disabled:!c(i),onClick:p,class:P(["button is-primary",{"is-loading":c(s)}])},"Show celestial body",10,Ot)]),t("p",Ut,[t("button",{onClick:h[2]||(h[2]=(...d)=>c(n)&&c(n)(...d)),class:P(["button is-danger",{"is-loading":c(s)}])},"Stop",2)])])]))}},Tt={class:"field"},Vt=t("label",{class:"label"},"Ticker symbols:",-1),Lt={class:"select"},Nt=R('<option value="ASML.AS">ASML.AS</option><option value="SHELL.AS">SHELL.AS</option><option value="GOOG">GOOG</option><option value="MSFT">MSFT</option><option value="AAPL">AAPL</option>',5),Et=[Nt],Ft=t("br",null,null,-1),jt=t("br",null,null,-1),Ht=t("br",null,null,-1),Gt=t("br",null,null,-1),It={style:{"word-break":"break-all"}},Qt={class:"field is-grouped"},Jt={class:"control"},Kt=["disabled"],$t={class:"control"},qt={__name:"StockMarketQuotes",setup(a){k(!1);const o=k([]),i=k(!1),{appSrcDir:s}=H(),{start:e,stop:l}=I(),n=j(()=>{const p=["ts-node",s+"stockMarketQuotes/showStockMarketQuotes.ts"];return p.push("--tickerSymbols"),p.push(o.value),p});async function _(){i.value=!0;const p=await e(n.value);console.log(p.data),i.value=!1}return(p,u)=>(y(),w("div",null,[t("div",Tt,[Vt,t("div",Lt,[b(t("select",{"onUpdate:modelValue":u[0]||(u[0]=h=>O(o)?o.value=h:null),multiple:!0},Et,512),[[v,c(o)]])])]),Ft,jt,Ht,Gt,t("div",It,C(c(n)),1),t("div",Qt,[t("p",Jt,[t("button",{disabled:!c(o),onClick:_,class:P(["button is-primary",{"is-loading":c(i)}])},"Show stock market quotes",10,Kt)]),t("p",$t,[t("button",{onClick:u[1]||(u[1]=(...h)=>c(l)&&c(l)(...h)),class:P(["button is-danger",{"is-loading":c(i)}])},"Stop",2)])])]))}},{appDir:Fs,appSrcDir:B,hZellerDir:Q,cubeOptions:J}=H();let ee="/images/";const Wt={name:"IndexPage",computed:{},data(){return{cubeAppName:"",cubeAppPath:"",cubeAppCommand:[],nRubik:3,pattern:"",patternImage:"/images/3x3/solved.3x3.png",rollOfJoy:!1,solver:"reversedPath",heuristic:"taxiCube3D",finalMessage:null,tickerSymbols:"",tickerSymbolsLimit:3,movie:"",animatedGif:"",demoNumber:10}},watch:{nRubik(){this.patternImage=`${ee}${this.nRubik}x${this.nRubik}/solved.${this.nRubik}x${this.nRubik}.png`},pattern(a){this.patternImage=`${ee}${this.nRubik}x${this.nRubik}/${a}.${this.nRubik}x${this.nRubik}.png`}},methods:{async getDirectory(){if(!window.showDirectoryPicker){alert("Unsupported Browser Notice");return}const a=await window.showDirectoryPicker();return this.dirName=a.name,alert(this.dirName),this.dirName},async pseudoRubiksCubeSolve(){this.cubeAppPath=B+"pseudoRubiksCube/pseudoRubiksCubeSolve.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.nRubik&&(this.cubeAppCommand.push("--nRubik"),this.cubeAppCommand.push(this.nRubik),this.cubeAppCommand.push("--nSteps"),this.cubeAppCommand.push(25))},async showRubiksCubePattern(){this.cubeAppPath=B+"rubiksCube/showRubiksCubePattern.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.nRubik&&(this.cubeAppCommand.push("--nRubik"),this.cubeAppCommand.push(this.nRubik)),this.pattern!=""&&(this.cubeAppCommand.push("--pattern"),this.cubeAppCommand.push(this.pattern)),this.rollOfJoy&&this.cubeAppCommand.push("--rollOfJoy")},async scrambleRubiksCube(){this.cubeAppPath=B+"rubiksCube/scrambleSolveRubiksCube.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.nRubik&&(this.cubeAppCommand.push("--nRubik"),this.cubeAppCommand.push(this.nRubik)),this.cubeAppCommand.push("--nMoves"),this.cubeAppCommand.push(this.nRubik*2),this.rollOfJoy&&this.cubeAppCommand.push("--rollOfJoy")},async solveRubiksCube(){this.cubeAppPath=B+"rubiksCube/scrambleSolveRubiksCube.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.cubeAppCommand.push("--solve"),this.nRubik&&(this.cubeAppCommand.push("--nRubik"),this.cubeAppCommand.push(this.nRubik)),this.cubeAppCommand.push("--nMoves"),this.cubeAppCommand.push(this.nRubik*2),this.rollOfJoy&&this.cubeAppCommand.push("--rollOfJoy")},async slidingPuzzleSolve(){this.cubeAppPath=B+"rubiksQube/slidingPuzzleSolve.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.cubeAppCommand.push("--nRubik"),this.cubeAppCommand.push(this.nRubik),this.cubeAppCommand.push("--nSlides"),this.cubeAppCommand.push(10),this.cubeAppCommand.push("--solver"),this.cubeAppCommand.push(this.solver),this.cubeAppCommand.push("--heuristic"),this.cubeAppCommand.push(this.heuristic)},async showFireworks(){this.cubeAppPath=B+"fireworks/showFireworks.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath]},async showCubemap(){this.cubeAppPath=B+"cubemap/showCubemap.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.cubeAppCommand.push("atlas1_CUBE.png")},async showStockMarketQuotes(){this.cubeAppPath=B+"stockMarketQuotes/showStockMarketQuotes.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.tickerSymbols&&(this.cubeAppCommand.push("--tickerSymbols"),this.cubeAppCommand.push(this.tickerSymbols))},async sprinkle(){this.cubeAppPath=B+"sprinkle/showSprinkle.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath]},async sparkle(){this.cubeAppPath=B+"sparkle/showSparkle.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath]},async videoViewer(){this.cubeAppName="video-viewer",this.cubeAppPath=Q+"utils/"+this.cubeAppName,this.cubeAppCommand=[this.cubeAppPath,...J],this.cubeAppCommand.push(this.movie)},async gifViewer(){this.cubeAppName="led-image-viewer",this.cubeAppPath=Q+"utils/"+this.cubeAppName,this.cubeAppCommand=[this.cubeAppPath,...J],this.cubeAppCommand.push(this.animatedGif)},async ledDemo(){this.cubeAppName="demo",this.cubeAppPath=Q+"examples-api-use/"+this.cubeAppName,this.cubeAppCommand=[this.cubeAppPath,...J],this.cubeAppCommand.push("-D"),this.cubeAppCommand.push(this.demoNumber)},async welcome(){this.cubeAppPath=B+"sprites/welcome.ts",this.cubeAppCommand=["ts-node",this.cubeAppPath],this.finalMessage&&(this.cubeAppCommand.push("--finalMessage"),this.cubeAppCommand.push(this.finalMessage))},async start(){const a=await this.$axios.post("/start",{cubeAppCommand:this.cubeAppCommand});console.log(a.data)},async stop(){const a=await this.$axios.get("/stop");console.log(a.data)}}},Zt=t("h3",null,"_______________",-1),Xt=t("h3",null,"_______________",-1),Yt=t("h3",null,"_______________",-1),eo=t("br",null,null,-1),to=R('<option value="1">1x1</option><option value="2">2x2</option><option value="3">3x3</option><option value="4">4x4</option><option value="5">5x5</option><option value="6">6x6</option><option value="7">7x7</option><option value="8">8x8</option><option value="9">9x9</option>',9),oo=[to],so=t("br",null,null,-1),no=t("br",null,null,-1),io=t("br",null,null,-1),lo=t("option",{value:"wholeCubeMoves"},"whole cube moves",-1),ao=[lo],uo=R('<option value="wholeCubeMoves">whole cube moves</option><option value="checkerboard">checkerboard</option><option value="cubex2">cubex2</option><option value="fourColumns">4 columns</option><option value="fourSideCheckerboard">4 side checkerboard</option><option value="pillar">pillar</option><option value="spiral">spiral</option><option value="zigzag">zigzag</option>',8),ro=[uo],po=R('<option value="wholeCubeMoves">whole cube moves</option><option value="anaconda">anaconda</option><option value="checkerboard">checkerboard</option><option value="cross">cross</option><option value="cubex2">cubex2</option><option value="cubex3">cubex3</option><option value="dots">dots</option><option value="fourSpots">four spots</option><option value="greenMamba">green mamba</option><option value="lines">lines</option><option value="linesOnFourSides">lines on 4 sides</option><option value="plusminus">plusminus</option><option value="sixColourCubex3">6 colour cubex3</option><option value="sixSpots">six spots</option><option value="smiley">( ! ) (ˆ⌣ˆԅ)</option><option value="superflip">superflip</option><option value="twist">twist</option>',17),co=[po],ho=R('<option value="wholeCubeMoves">whole cube moves</option><option value="checkerboardFourSides">checkerboardFourSides</option><option value="columns">columns</option><option value="cornerWrapper">corner wrapper</option><option value="cubex2">cubex2</option><option value="cubex3">cubex3</option><option value="cubex4">cubex4</option><option value="displacedMotif">displaced motif</option><option value="dots">dots</option><option value="linesOnSixSides">lines on six sides</option><option value="oppositeBoxes">opposite boxes</option><option value="python">python</option><option value="sixColourPeak">6 colour peak</option><option value="smallBoxBigBox">small box big box</option>',14),_o=[ho],bo=R('<option value="wholeCubeMoves">whole cube moves</option><option value="checkerboard">checkerboard</option><option value="cubex3">cubex3</option><option value="flippedEdges">flipped edges</option><option value="plusminus">plusminus</option><option value="sixSpots">six spots</option><option value="triCheckerboard">tri-checkerboard</option><option value="twinPeaks">twin peaks</option>',8),mo=[bo],fo=t("option",{value:"wholeCubeMoves"},"whole cube moves",-1),vo=t("option",{value:"fourDots"},"4 dots",-1),yo=t("option",{value:"plusminus"},"plusminus",-1),go=t("option",{value:"twister"},"twister",-1),ko=[fo,vo,yo,go],Co=R('<option value="wholeCubeMoves">whole cube moves</option><option value="checkerboard">checkerboard</option><option value="crossChecker">crossChecker</option><option value="plusminus">plusminus</option><option value="triCheckerboard">triCheckerboard</option>',5),wo=[Co],So=t("option",{value:"wholeCubeMoves"},"whole cube moves",-1),Ao=t("option",{value:"anaconda"},"anaconda",-1),xo=t("option",{value:"plusminus"},"plusminus",-1),Po=[So,Ao,xo],Ro=t("option",{value:"wholeCubeMoves"},"whole cube moves",-1),Bo=t("option",{value:"cubex9"},"cubex9",-1),Do=t("option",{value:"plusminus"},"plusminus",-1),Mo=t("option",{value:"sixSpots"},"sixSpots",-1),Oo=[Ro,Bo,Do,Mo],Uo=t("label",{for:"checkbox"},"Roll of joy",-1),zo=t("br",null,null,-1),To=["src"],Vo=t("h3",null,"_______________",-1),Lo=t("br",null,null,-1),No=t("option",{value:"reversedPath"},"reversed path",-1),Eo=t("option",{value:"a*"},"a* shortest path",-1),Fo=t("option",{value:"best-first"},"best first",-1),jo=[No,Eo,Fo],Ho=t("br",null,null,-1),Go=t("option",{value:"taxiCube3D"},"taxicube",-1),Io=t("option",{value:"taxiCubeReduced3D"},"taxicube reduced",-1),Qo=[Go,Io],Jo=t("h3",null,"_______________",-1),Ko=t("br",null,null,-1),$o=R('<option value="ASML.AS">ASML.AS</option><option value="SHELL.AS">SHELL.AS</option><option value="GOOG">GOOG</option><option value="MSFT">MSFT</option><option value="AAPL">AAPL</option>',5),qo=[$o],Wo=t("h3",null,"_______________",-1),Zo=t("br",null,null,-1),Xo=t("option",{value:"apps/videos/rotto.mp4"},"rotto",-1),Yo=t("option",{value:"apps/videos/space.mp4"},"space",-1),es=t("option",{value:"apps/videos/trippy1.mp4"},"trippy1",-1),ts=t("option",{value:"apps/videos/trippy2.mp4"},"trippy2",-1),os=[Xo,Yo,es,ts],ss=t("h3",null,"_______________",-1),ns=t("br",null,null,-1),is=R('<option value="apps/animated_gifs/birthday_animated_gif/happy-birthday.gif">happy birthday</option><option value="apps/animated_gifs/fruit.gif">fruit</option><option value="apps/animated_gifs/galaxy.gif">galaxy</option><option value="apps/animated_gifs/globe.gif">globe</option><option value="apps/animated_gifs/pingpong.gif">pingpong</option><option value="apps/animated_gifs/psychedelic-kotdwara.gif">psychedelic</option><option value="apps/animated_gifs/space.gif">space</option><option value="apps/animated_gifs/spinning_colors.gif">spinning colors</option><option value="apps/animated_gifs/squares.gif">squares</option><option value="apps/animated_gifs/thingy.gif">thingy</option><option value="apps/animated_gifs/tumblr_a5fa375fa82ae7f2d505069080ffa807_cf9380bd_500.gif">tumbler</option><option value="apps/animated_gifs/tunnel.gif">tunnel</option><option value="apps/animated_gifs/wolfenstein.gif">Wolfenstein</option>',13),ls=[is],as=t("h3",null,"_______________",-1),us=t("br",null,null,-1),rs=R('<option value="0">rotating square</option><option value="4">Pulsing color</option><option value="5">Grayscale Block</option><option value="6">Abelian sandpile model</option><option value="7">Conway&#39;s game of life</option><option value="8">Langton&#39;s ant</option><option value="9">Volume bars</option><option value="10">Evolution of color</option><option value="11">Brightness pulse generator</option>',9),ps=[rs],cs=t("h3",null,"_______________",-1),ds=t("h3",null,"_______________",-1),hs=t("h3",null,"_______________",-1),_s=t("br",null,null,-1),bs=t("br",null,null,-1),ms=t("br",null,null,-1);function fs(a,o,i,s,e,l){return y(),w("div",null,[Zt,t("button",{onClick:o[0]||(o[0]=(...n)=>l.showCubemap&&l.showCubemap(...n))},"Cube map"),Xt,t("button",{onClick:o[1]||(o[1]=(...n)=>l.showFireworks&&l.showFireworks(...n))},"Fireworks"),Yt,t("span",null," TEST nRubik: "+C(e.nRubik),1),eo,t("div",null,[A("Rubik's cube dimension: "),b(t("select",{"onUpdate:modelValue":o[2]||(o[2]=n=>e.nRubik=n)},oo,512),[[v,e.nRubik]])]),t("button",{onClick:o[3]||(o[3]=(...n)=>l.pseudoRubiksCubeSolve&&l.pseudoRubiksCubeSolve(...n))},"pseudosolve"),t("button",{onClick:o[4]||(o[4]=(...n)=>l.scrambleRubiksCube&&l.scrambleRubiksCube(...n))},"scramble"),t("button",{onClick:o[5]||(o[5]=(...n)=>l.solveRubiksCube&&l.solveRubiksCube(...n))},"solve"),t("button",{onClick:o[6]||(o[6]=(...n)=>l.showRubiksCubePattern&&l.showRubiksCubePattern(...n))},"pattern"),so,t("span",null," TEST pattern: "+C(e.pattern),1),no,t("span",null," TEST patternImage: "+C(e.patternImage),1),io,t("div",null,[A("Patterns: "),e.nRubik==1?b((y(),w("select",{key:0,"onUpdate:modelValue":o[7]||(o[7]=n=>e.pattern=n),size:"5"},ao,512)),[[v,e.pattern]]):x("",!0),e.nRubik==2?b((y(),w("select",{key:1,"onUpdate:modelValue":o[8]||(o[8]=n=>e.pattern=n),size:"5"},ro,512)),[[v,e.pattern]]):x("",!0),e.nRubik==3?b((y(),w("select",{key:2,"onUpdate:modelValue":o[9]||(o[9]=n=>e.pattern=n),size:"5"},co,512)),[[v,e.pattern]]):x("",!0),e.nRubik==4?b((y(),w("select",{key:3,"onUpdate:modelValue":o[10]||(o[10]=n=>e.pattern=n),size:"5"},_o,512)),[[v,e.pattern]]):x("",!0),e.nRubik==5?b((y(),w("select",{key:4,"onUpdate:modelValue":o[11]||(o[11]=n=>e.pattern=n),size:"5"},mo,512)),[[v,e.pattern]]):x("",!0),e.nRubik==6?b((y(),w("select",{key:5,"onUpdate:modelValue":o[12]||(o[12]=n=>e.pattern=n),size:"5"},ko,512)),[[v,e.pattern]]):x("",!0),e.nRubik==7?b((y(),w("select",{key:6,"onUpdate:modelValue":o[13]||(o[13]=n=>e.pattern=n),size:"5"},wo,512)),[[v,e.pattern]]):x("",!0),e.nRubik==8?b((y(),w("select",{key:7,"onUpdate:modelValue":o[14]||(o[14]=n=>e.pattern=n),size:"5"},Po,512)),[[v,e.pattern]]):x("",!0),e.nRubik==9?b((y(),w("select",{key:8,"onUpdate:modelValue":o[15]||(o[15]=n=>e.pattern=n),size:"5"},Oo,512)),[[v,e.pattern]]):x("",!0)]),t("div",null,[b(t("input",{type:"checkbox",id:"rollOfJoy","onUpdate:modelValue":o[16]||(o[16]=n=>e.rollOfJoy=n)},null,512),[[G,e.rollOfJoy]]),Uo]),t("div",null,[t("span",null," TEST patternImage: "+C(e.patternImage),1),zo,t("img",{src:`${e.patternImage}`,alt:"image not found",width:"300px",height:"300px"},null,8,To)]),Vo,t("button",{onClick:o[17]||(o[17]=(...n)=>l.slidingPuzzleSolve&&l.slidingPuzzleSolve(...n))},"sliding puzzle"),t("span",null," TEST solver: "+C(e.solver),1),Lo,t("div",null,[A("Solver: "),b(t("select",{"onUpdate:modelValue":o[18]||(o[18]=n=>e.solver=n)},jo,512),[[v,e.solver]])]),t("span",null," TEST heuristic: "+C(e.heuristic),1),Ho,t("div",null,[A("Heuristic: "),b(t("select",{"onUpdate:modelValue":o[19]||(o[19]=n=>e.heuristic=n)},Qo,512),[[v,e.heuristic]])]),Jo,t("button",{onClick:o[20]||(o[20]=(...n)=>l.showStockMarketQuotes&&l.showStockMarketQuotes(...n))},"Stock market quotes"),t("span",null," TEST tickerSymbols: "+C(e.tickerSymbols),1),Ko,b(t("select",{"onUpdate:modelValue":o[21]||(o[21]=n=>e.tickerSymbols=n),multiple:!0},qo,512),[[v,e.tickerSymbols]]),Wo,t("button",{onClick:o[22]||(o[22]=(...n)=>l.videoViewer&&l.videoViewer(...n))},"Video viewer"),t("span",null," TEST movie: "+C(e.movie),1),Zo,A(" Movie: "),b(t("select",{"onUpdate:modelValue":o[23]||(o[23]=n=>e.movie=n)},os,512),[[v,e.movie]]),ss,t("button",{onClick:o[24]||(o[24]=(...n)=>l.gifViewer&&l.gifViewer(...n))},"Animated gif viewer"),t("span",null," TEST animatedGif: "+C(e.animatedGif),1),ns,A(" animated gifs: "),b(t("select",{"onUpdate:modelValue":o[25]||(o[25]=n=>e.animatedGif=n)},ls,512),[[v,e.animatedGif]]),as,t("button",{onClick:o[26]||(o[26]=(...n)=>l.ledDemo&&l.ledDemo(...n))},"Demo"),t("span",null," TEST demoNumber: "+C(e.demoNumber),1),us,t("div",null,[A("Demo: "),b(t("select",{"onUpdate:modelValue":o[27]||(o[27]=n=>e.demoNumber=n)},ps,512),[[v,e.demoNumber]])]),cs,t("button",{onClick:o[28]||(o[28]=(...n)=>l.welcome&&l.welcome(...n))},"Welcome"),t("div",null,[A("Enter final message: "),b(t("input",{"onUpdate:modelValue":o[29]||(o[29]=n=>e.finalMessage=n),maxlength:"16",placeholder:"WELKOM!"},null,512),[[be,e.finalMessage]])]),ds,t("button",{onClick:o[30]||(o[30]=(...n)=>l.sprinkle&&l.sprinkle(...n))},"Sprinkle"),A(),t("button",{onClick:o[31]||(o[31]=(...n)=>l.sparkle&&l.sparkle(...n))},"Sparkle"),hs,_s,t("span",null," cubeAppCommand: "+C(this.cubeAppCommand),1),bs,ms,t("button",{onClick:o[32]||(o[32]=(...n)=>l.start&&l.start(...n))},"Start"),t("button",{onClick:o[33]||(o[33]=(...n)=>l.stop&&l.stop(...n))},"Stop")])}const vs=_e(Wt,[["render",fs]]),ys={class:"box"},gs=t("h1",{class:"title"},"Hexaturion",-1),ks=t("hr",null,null,-1),Cs={class:"tabs is-boxed"},ws=t("span",{class:"icon is-small"},[t("i",{class:"fa-solid fa-clock"})],-1),Ss=t("span",null,"Clock",-1),As=[ws,Ss],xs=t("span",{class:"icon is-small"},[t("i",{class:"fa-solid fa-image"})],-1),Ps=t("span",null,"Pictures",-1),Rs=[xs,Ps],Bs=t("span",{class:"icon is-small"},[t("i",{class:"fa-solid fa-celestialBodies"})],-1),Ds=t("span",null,"Celestial bodies",-1),Ms=[Bs,Ds],Os=t("span",{class:"icon is-small"},[t("i",{class:"fa-solid fa-stockMarketQuotes"})],-1),Us=t("span",null,"Stock market quotes",-1),zs=[Os,Us],Ts=t("span",{class:"icon is-small"},[t("i",{class:"fa-solid fa-bars"})],-1),Vs=t("span",null,"Other",-1),Ls=[Ts,Vs],js=me({__name:"index",setup(a){const o=k("clock");return(i,s)=>{const e=rt,l=kt,n=zt,_=qt,p=vs;return y(),w("div",ys,[gs,ks,t("div",Cs,[t("ul",null,[t("li",{class:P({"is-active":c(o)==="clock"})},[t("a",{onClick:s[0]||(s[0]=u=>o.value="clock")},As)],2),t("li",{class:P({"is-active":c(o)==="pictures"})},[t("a",{onClick:s[1]||(s[1]=u=>o.value="pictures")},Rs)],2),t("li",{class:P({"is-active":c(o)==="celestialBodies"})},[t("a",{onClick:s[2]||(s[2]=u=>o.value="celestialBodies")},Ms)],2),t("li",{class:P({"is-active":c(o)==="stockMarketQuotes"})},[t("a",{onClick:s[3]||(s[3]=u=>o.value="stockMarketQuotes")},zs)],2),t("li",{class:P({"is-active":c(o)==="other"})},[t("a",{onClick:s[4]||(s[4]=u=>o.value="other")},Ls)],2)])]),t("div",null,[c(o)==="clock"?(y(),F(e,{key:0})):x("",!0),c(o)==="pictures"?(y(),F(l,{key:1})):x("",!0),c(o)==="celestialBodies"?(y(),F(n,{key:2})):x("",!0),c(o)==="stockMarketQuotes"?(y(),F(_,{key:3})):c(o)==="other"?(y(),F(p,{key:4})):x("",!0)])])}}});export{js as default};
