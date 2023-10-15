(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{278:function(e,o,n){"use strict";n.r(o);n(46),n(36),n(15);var t=n(10),r=(n(63),{name:"IndexPage",data:function(){return{cubeAppName:"",cubeAppPath:"",cubeAppCommand:[],cubeAppOptions:{},nRubik:null,clockType:"digital",animationTime:null}},methods:{pseudoRubikscubeSolve:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return e.cubeAppName="pseudoRubikscubeSolve",e.cubeAppRoute="/"+e.cubeAppName,e.cubeAppPath="/home/pi/led-hexahedron/apps/src/pseudoRubikscubeSolve/"+e.cubeAppName+".ts",e.nRubik&&(e.cubeAppOptions["--nRubik"]=e.nRubik,e.cubeAppOptions["--nStep"]=25),e.nRubik&&(e.cubeAppCommand.push("--nRubik"),e.cubeAppCommand.push(e.nRubik),e.cubeAppCommand.push("--nStep"),e.cubeAppCommand.push(25)),alert("this.cubeAppOptions: "+JSON.stringify(e.cubeAppOptions)),alert("this.cubeAppCommand: "+e.cubeAppCommand),o.next=9,e.$axios.post(e.cubeAppPath,e.cubeAppCommand);case 9:case"end":return o.stop()}}),o)})))()},smartClock:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$axios.post("/smartClock",{clockType:e.clockType,animationTime:e.animationTime});case 2:case"end":return o.stop()}}),o)})))()},stop:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,e.$axios.get("/stop");case 2:n=o.sent,console.log(n.data);case 4:case"end":return o.stop()}}),o)})))()}}}),c=n(61),component=Object(c.a)(r,(function(){var e=this,o=e._self._c;return o("div",[o("h1",[e._v("Hexaturion version 0.18")]),e._v(" "),o("button",{on:{click:e.pseudoRubikscubeSolve}},[e._v("Start Rubik's cube pseudosolve")]),o("br"),e._v(" "),o("br"),e._v(" "),o("span",[e._v(" TEST nRubik: "+e._s(e.nRubik))]),o("br"),e._v(" "),o("div",[e._v("Rubik's cube dimension:\n   "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.nRubik,expression:"nRubik"}],on:{change:function(o){var n=Array.prototype.filter.call(o.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.nRubik=o.target.multiple?n:n[0]}}},[o("option",{attrs:{disabled:""},domProps:{value:null}},[e._v("dimension")]),e._v(" "),o("option",{domProps:{value:1}},[e._v("1x1")]),e._v(" "),o("option",{domProps:{value:2}},[e._v("2x2")]),e._v(" "),o("option",{domProps:{value:3}},[e._v("3x3")]),e._v(" "),o("option",{domProps:{value:4}},[e._v("4x4")]),e._v(" "),o("option",{domProps:{value:5}},[e._v("5x5")]),e._v(" "),o("option",{domProps:{value:6}},[e._v("6x6")]),e._v(" "),o("option",{domProps:{value:7}},[e._v("7x7")]),e._v(" "),o("option",{domProps:{value:8}},[e._v("8x8")]),e._v(" "),o("option",{domProps:{value:9}},[e._v("9x9")])])]),e._v(" "),o("h3",[e._v("_______________")]),e._v(" "),o("button",{attrs:{disabled:!e.clockType},on:{click:e.smartClock}},[e._v("Start clock")]),o("br"),e._v(" "),o("br"),e._v(" "),o("div",[e._v("TEST clockType: "+e._s(e.clockType))]),e._v(" "),o("div",[e._v("type:\n    "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.clockType,expression:"clockType"}],attrs:{type:"radio",id:"'digital'",value:"digital"},domProps:{checked:e._q(e.clockType,"digital")},on:{change:function(o){e.clockType="digital"}}}),e._v(" "),o("label",{attrs:{for:"digital"}},[e._v("digital")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.clockType,expression:"clockType"}],attrs:{type:"radio",id:"word",value:"word"},domProps:{checked:e._q(e.clockType,"word")},on:{change:function(o){e.clockType="word"}}}),e._v(" "),o("label",{attrs:{for:"word"}},[e._v("word")])]),e._v(" "),o("span",[e._v(" TEST animationTime: "+e._s(e.animationTime))]),o("br"),e._v(" \n  Animation every:\n   "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.animationTime,expression:"animationTime"}],attrs:{disabled:"word"!=e.clockType},on:{change:function(o){var n=Array.prototype.filter.call(o.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.animationTime=o.target.multiple?n:n[0]}}},[o("option",{domProps:{value:null}},[e._v("no animation")]),e._v(" "),o("option",{domProps:{value:1}},[e._v("1 minute")]),e._v(" "),o("option",{domProps:{value:5}},[e._v("5 minutes")]),e._v(" "),o("option",{domProps:{value:15}},[e._v("15 minutes")]),e._v(" "),o("option",{domProps:{value:60}},[e._v("60 minutes")])]),e._v(" "),o("h3",[e._v("_______________")]),e._v(" "),o("button",{on:{click:e.stop}},[e._v("Stop")])])}),[],!1,null,"466d3828",null);o.default=component.exports}}]);