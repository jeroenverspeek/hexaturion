(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{294:function(e,t,n){"use strict";n.r(t);n(48),n(40),n(16),n(85),n(47);var r=n(10),o=(n(64),"/home/pi/led-hexahedron/apps/src/"),c={name:"IndexPage",data:function(){return{cubeAppName:"",cubeAppPath:"",cubeAppCommand:[],nRubik:null,pattern:"",patternImage:".jpg",rollOfJoy:!1,clockType:"digital",animationInterval:null,celestialBody:"earth",finalMessage:null,tickerSymbols:"",tickerSymbolsLimit:3}},watch:{pattern:function(e){this.patternImage="".concat(e).concat(this.nRubik,"x").concat(this.nRubik,".jpg")}},methods:{pseudoRubiksCubeSolve:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="pseudoRubiksCubeSolve",e.cubeAppPath=o+"pseudoRubiksCube/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.nRubik&&(e.cubeAppCommand.push("--nRubik"),e.cubeAppCommand.push(e.nRubik),e.cubeAppCommand.push("--nSteps"),e.cubeAppCommand.push(25));case 4:case"end":return t.stop()}}),t)})))()},showRubiksCube:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showRubiksCube",e.cubeAppPath=o+"rubiksCube/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.nRubik&&(e.cubeAppCommand.push("--nRubik"),e.cubeAppCommand.push(e.nRubik)),""!=e.pattern&&(e.cubeAppCommand.push("--pattern"),e.cubeAppCommand.push(e.pattern)),e.rollOfJoy&&e.cubeAppCommand.push("--rollOfJoy");case 6:case"end":return t.stop()}}),t)})))()},smartClock:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="smartClock",e.cubeAppPath=o+"smartClock/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.cubeAppCommand.push("--clockType"),e.cubeAppCommand.push(e.clockType),e.animationInterval&&(e.cubeAppCommand.push("--animationInterval"),e.cubeAppCommand.push(e.animationInterval));case 6:case"end":return t.stop()}}),t)})))()},showFireworks:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showFireworks",e.cubeAppPath=o+"fireworks/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath];case 3:case"end":return t.stop()}}),t)})))()},showCubeIcons:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showCubeIcons",e.cubeAppPath=o+"cubeIcons/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.cubeAppCommand.push("--cube_icon_dir"),e.cubeAppCommand.push("/home/pi/led-hexahedron/apps/cube_icons/family/"),e.cubeAppCommand.push("--showTime"),e.cubeAppCommand.push(15e3);case 7:case"end":return t.stop()}}),t)})))()},showCubemap:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showCubemap",e.cubeAppPath=o+"cubemap/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.cubeAppCommand.push("atlas1_CUBE.png");case 4:case"end":return t.stop()}}),t)})))()},showCubeLatlonmap:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showCubeLatlonmap",e.cubeAppPath=o+"cubeLatlonmap/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.celestialBody&&(e.cubeAppCommand.push("-i"),e.cubeAppCommand.push(e.celestialBody));case 4:case"end":return t.stop()}}),t)})))()},showStockMarketQuotes:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showStockMarketQuotes",e.cubeAppPath=o+"stockMarketQuotes/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.tickerSymbols&&(e.cubeAppCommand.push("--tickerSymbols"),e.cubeAppCommand.push(e.tickerSymbols));case 4:case"end":return t.stop()}}),t)})))()},slidingPuzzleSolve:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="slidingPuzzleSolve",e.cubeAppPath=o+"rubiksQube/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath];case 3:case"end":return t.stop()}}),t)})))()},sprinkle:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showSprinkle",e.cubeAppPath=o+"sprinkle/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath];case 3:case"end":return t.stop()}}),t)})))()},sparkle:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="showSparkle",e.cubeAppPath=o+"sparkle/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath];case 3:case"end":return t.stop()}}),t)})))()},welcome:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.cubeAppName="welcome",e.cubeAppPath=o+"sprites/"+e.cubeAppName+".ts",e.cubeAppCommand=[e.cubeAppPath],e.finalMessage&&(e.cubeAppCommand.push("--finalMessage"),e.cubeAppCommand.push(e.finalMessage));case 4:case"end":return t.stop()}}),t)})))()},start:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.post("/start",{cubeAppCommand:e.cubeAppCommand});case 2:n=t.sent,console.log(n.data);case 4:case"end":return t.stop()}}),t)})))()},stop:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/stop");case 2:n=t.sent,console.log(n.data);case 4:case"end":return t.stop()}}),t)})))()}}},l=n(62),component=Object(l.a)(c,(function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Hexaturion version 0.16")]),e._v(" "),t("nuxt-link",{attrs:{to:"/about"}},[e._v("About page")]),t("br"),t("br"),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{attrs:{disabled:!e.clockType},on:{click:e.smartClock}},[e._v("Clock")]),e._v(" "),t("br"),e._v(" "),t("div",[e._v("type:\n    "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.clockType,expression:"clockType"}],attrs:{type:"radio",id:"'digital'",value:"digital"},domProps:{checked:e._q(e.clockType,"digital")},on:{change:function(t){e.clockType="digital"}}}),e._v(" "),t("label",{attrs:{for:"digital"}},[e._v("digital")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.clockType,expression:"clockType"}],attrs:{type:"radio",id:"word",value:"word"},domProps:{checked:e._q(e.clockType,"word")},on:{change:function(t){e.clockType="word"}}}),e._v(" "),t("label",{attrs:{for:"word"}},[e._v("word")])]),e._v(" "),e._v("\n  Animation every:\n   "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.animationInterval,expression:"animationInterval"}],attrs:{disabled:"word"!=e.clockType},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.animationInterval=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"null"}},[e._v("no animation")]),e._v(" "),t("option",{attrs:{value:"1"}},[e._v("1 minute")]),e._v(" "),t("option",{attrs:{value:"5"}},[e._v("5 minutes")]),e._v(" "),t("option",{attrs:{value:"15"}},[e._v("15 minutes")]),e._v(" "),t("option",{attrs:{value:"30"}},[e._v("30 minutes")]),e._v(" "),t("option",{attrs:{value:"60"}},[e._v("60 minutes")])]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.showCubeIcons}},[e._v("Cube icons")]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.showCubemap}},[e._v("Cube map")]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.showFireworks}},[e._v("Fireworks")]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("div",[e._v("Rubik's cube dimension:\n   "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.nRubik,expression:"nRubik"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.nRubik=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"1"}},[e._v("1x1")]),e._v(" "),t("option",{attrs:{value:"2"}},[e._v("2x2")]),e._v(" "),t("option",{attrs:{value:"null"}},[e._v("3x3")]),e._v(" "),t("option",{attrs:{value:"4"}},[e._v("4x4")]),e._v(" "),t("option",{attrs:{value:"5"}},[e._v("5x5")]),e._v(" "),t("option",{attrs:{value:"6"}},[e._v("6x6")]),e._v(" "),t("option",{attrs:{value:"7"}},[e._v("7x7")]),e._v(" "),t("option",{attrs:{value:"8"}},[e._v("8x8")]),e._v(" "),t("option",{attrs:{value:"9"}},[e._v("9x9")])])]),e._v(" "),t("span",[e._v(" TEST nRubik: "+e._s(e.nRubik))]),t("br"),e._v(" "),t("button",{on:{click:e.pseudoRubiksCubeSolve}},[e._v("pseudosolve")]),e._v(" "),t("button",{on:{click:e.showRubiksCube}},[e._v("pattern")]),e._v(" "),t("br"),e._v(" "),t("span",[e._v(" TEST pattern: "+e._s(e.pattern))]),t("br"),e._v(" "),t("span",[e._v(" TEST patternImage: "+e._s(e.patternImage))]),t("br"),e._v(" "),t("div",[e._v("Patterns:\n   "),1==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"whole cube moves"}},[e._v("whole cube moves")])]):e._e(),e._v(" "),2==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"four columns"}},[e._v("4 columns")]),e._v(" "),t("option",{attrs:{value:"four side checkerboard"}},[e._v("4 side checkerboard")]),e._v(" "),t("option",{attrs:{value:"anaconda"}},[e._v("anaconda")]),e._v(" "),t("option",{attrs:{value:"zigzag"}},[e._v("zigzag")]),e._v(" "),t("option",{attrs:{value:"cube in a cube"}},[e._v("cube in a cube")]),e._v(" "),t("option",{attrs:{value:"checkerboard"}},[e._v("checkerboard")]),e._v(" "),t("option",{attrs:{value:"pillar"}},[e._v("pillar")]),e._v(" "),t("option",{attrs:{value:"spiral"}},[e._v("spiral")])]):e._e(),e._v(" "),"null"==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"cube in a cube"}},[e._v("cube in a cube")]),e._v(" "),t("option",{attrs:{value:"cube in a cube in a cube"}},[e._v("cube in a cube in a cube")]),e._v(" "),t("option",{attrs:{value:"four spots"}},[e._v("four spots")]),e._v(" "),t("option",{attrs:{value:"six spots"}},[e._v("six spots")]),e._v(" "),t("option",{attrs:{value:"cross"}},[e._v("cross")]),e._v(" "),t("option",{attrs:{value:"green mamba"}},[e._v("green mamba")]),e._v(" "),t("option",{attrs:{value:"anaconda"}},[e._v("anaconda")]),e._v(" "),t("option",{attrs:{value:"lines"}},[e._v("lines")]),e._v(" "),t("option",{attrs:{value:"dots"}},[e._v("dots")]),e._v(" "),t("option",{attrs:{value:"lines on 4 sides"}},[e._v("lines on 4 sides")]),e._v(" "),t("option",{attrs:{value:"superflip"}},[e._v("superflip")]),e._v(" "),t("option",{attrs:{value:"6 colour cube in a cube in a cube"}},[e._v("6 colour cube in a cube in a cube")]),e._v(" "),t("option",{attrs:{value:"twist"}},[e._v("twist")])]):e._e(),e._v(" "),4==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"columns"}},[e._v("columns")]),e._v(" "),t("option",{attrs:{value:"checkerboard"}},[e._v("checkerboard")]),e._v(" "),t("option",{attrs:{value:"6 colour peak"}},[e._v("6 colour peak")]),e._v(" "),t("option",{attrs:{value:"stripes"}},[e._v("stripes")]),e._v(" "),t("option",{attrs:{value:"cube in a cube v1"}},[e._v("cube in a cube v1")]),e._v(" "),t("option",{attrs:{value:"cube in a cube v2"}},[e._v("cube in a cube v2")]),e._v(" "),t("option",{attrs:{value:"dots"}},[e._v("dots")]),e._v(" "),t("option",{attrs:{value:"6 colour cube in a cube"}},[e._v("6 colour cube in a cube")]),e._v(" "),t("option",{attrs:{value:"small box big box"}},[e._v("small box big box")]),e._v(" "),t("option",{attrs:{value:"corner wrapper"}},[e._v("corner wrapper")]),e._v(" "),t("option",{attrs:{value:"3x3 in 4x4"}},[e._v("3x3 in 4x4")]),e._v(" "),t("option",{attrs:{value:"opposite boxes"}},[e._v("opposite boxes")]),e._v(" "),t("option",{attrs:{value:"rings"}},[e._v("rings")]),e._v(" "),t("option",{attrs:{value:"four spots"}},[e._v("four spots")])]):e._e(),e._v(" "),5==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"plusminus"}},[e._v("plusminus")]),e._v(" "),t("option",{attrs:{value:"checkerboard"}},[e._v("checkerboard")]),e._v(" "),t("option",{attrs:{value:"cube in a cube"}},[e._v("cube in a cube")]),e._v(" "),t("option",{attrs:{value:"flipped egdes"}},[e._v("flipped edges")]),e._v(" "),t("option",{attrs:{value:"tri-checkerboard"}},[e._v("tri-checkerboard")])]):e._e(),e._v(" "),6==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"plusminus"}},[e._v("plusminus")]),e._v(" "),t("option",{attrs:{value:"4 dots"}},[e._v("4 dots")]),e._v(" "),t("option",{attrs:{value:"4 dots in anaconda"}},[e._v("4 dots in anaconda")]),e._v(" "),t("option",{attrs:{value:"4 dots in checkerboard"}},[e._v("4 dots in checkerboard")])]):e._e(),e._v(" "),7==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"plusminus"}},[e._v("plusminus")]),e._v(" "),t("option",{attrs:{value:"tri-checker"}},[e._v("tri-checker")]),e._v(" "),t("option",{attrs:{value:"cross checker"}},[e._v("cross checker")])]):e._e(),e._v(" "),8==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"plusminus"}},[e._v("plusminus")])]):e._e(),e._v(" "),9==e.nRubik?t("select",{directives:[{name:"model",rawName:"v-model",value:e.pattern,expression:"pattern"}],attrs:{size:"5"},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.pattern=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"plusminus"}},[e._v("plusminus")])]):e._e()]),e._v(" "),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.rollOfJoy,expression:"rollOfJoy"}],attrs:{type:"checkbox",id:"rollOfJoy"},domProps:{checked:Array.isArray(e.rollOfJoy)?e._i(e.rollOfJoy,null)>-1:e.rollOfJoy},on:{change:function(t){var n=e.rollOfJoy,r=t.target,o=!!r.checked;if(Array.isArray(n)){var c=e._i(n,null);r.checked?c<0&&(e.rollOfJoy=n.concat([null])):c>-1&&(e.rollOfJoy=n.slice(0,c).concat(n.slice(c+1)))}else e.rollOfJoy=o}}}),e._v(" "),t("label",{attrs:{for:"checkbox"}},[e._v("Roll of joy")])]),e._v(" "),t("div",[t("span",[e._v(" TEST patternImage: "+e._s(e.patternImage))]),t("br"),e._v(" "),t("img",{attrs:{src:"/images/zigzag2x2.jpg",alt:"image not found",width:"300",height:"227"}})]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.showCubeLatlonmap}},[e._v("Celestial body")]),e._v(" "),t("br"),e._v(" "),t("span",[e._v(" TEST celestialBody: "+e._s(e.celestialBody))]),t("br"),e._v("\n  Celestial body:\n   "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.celestialBody,expression:"celestialBody"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.celestialBody=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"earth.jpg"}},[e._v("earth")]),e._v(" "),t("option",{attrs:{value:"sun.jpg"}},[e._v("sun")]),e._v(" "),t("option",{attrs:{value:"moon.jpg"}},[e._v("moon")]),e._v(" "),t("option",{attrs:{value:"mercury.jpg"}},[e._v("mercury")]),e._v(" "),t("option",{attrs:{value:"venus.jpg"}},[e._v("venus")]),e._v(" "),t("option",{attrs:{value:"mars.jpg"}},[e._v("mars")]),e._v(" "),t("option",{attrs:{value:"jupiter.jpg"}},[e._v("jupiter")]),e._v(" "),t("option",{attrs:{value:"blackhole.jpg"}},[e._v("blackhole")])]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.showStockMarketQuotes}},[e._v("Stock market quotes")]),e._v(" "),t("span",[e._v(" TEST tickerSymbols: "+e._s(e.tickerSymbols))]),t("br"),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.tickerSymbols,expression:"tickerSymbols"}],attrs:{multiple:!0},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.tickerSymbols=t.target.multiple?n:n[0]}}},[t("option",{attrs:{value:"ASML.AS"}},[e._v("ASML.AS")]),e._v(" "),t("option",{attrs:{value:"SHELL.AS"}},[e._v("SHELL.AS")]),e._v(" "),t("option",{attrs:{value:"GOOG"}},[e._v("GOOG")]),e._v(" "),t("option",{attrs:{value:"MSFT"}},[e._v("MSFT")]),e._v(" "),t("option",{attrs:{value:"AAPL"}},[e._v("AAPL")])]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.slidingPuzzleSolve}},[e._v("Sliding puzzle")]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.welcome}},[e._v("Welcome")]),e._v(" "),t("div",[e._v("Enter final message: "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.finalMessage,expression:"finalMessage"}],attrs:{maxlength:"16",placeholder:"WELKOM!"},domProps:{value:e.finalMessage},on:{input:function(t){t.target.composing||(e.finalMessage=t.target.value)}}})]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("button",{on:{click:e.sprinkle}},[e._v("Sprinkle")]),e._v(" "),t("button",{on:{click:e.sparkle}},[e._v("Sparkle")]),e._v(" "),t("h3",[e._v("_______________")]),e._v(" "),t("br"),t("span",[e._v(" cubeAppCommand: "+e._s(this.cubeAppCommand))]),t("br"),t("br"),e._v(" "),t("button",{on:{click:e.start}},[e._v("Start")]),e._v(" "),t("button",{on:{click:e.stop}},[e._v("Stop")])],1)}),[],!1,null,"7429f20e",null);t.default=component.exports}}]);