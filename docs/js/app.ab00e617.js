(function(e){function n(n){for(var r,i,a=n[0],s=n[1],c=n[2],f=0,p=[];f<a.length;f++)i=a[f],l[i]&&p.push(l[i][0]),l[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(n);while(p.length)p.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var s=t[a];0!==l[s]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},l={1:0},o=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=n,a=a.slice();for(var c=0;c<a.length;c++)n(a[c]);var u=s;o.push([2,0]),t()})({2:function(e,n,t){e.exports=t("zUnb")},"5jYY":function(e,n,t){"use strict";var r=t("MKh9"),l=t.n(r);l.a},MKh9:function(e,n,t){},fnoW:function(e,n,t){},nNx0:function(e,n,t){"use strict";var r=t("fnoW"),l=t.n(r);l.a},zUnb:function(e,n,t){"use strict";t.r(n);t("VRzm");var r=t("Kw5r"),l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[e.size>0?t("AppPuzzle",{attrs:{size:e.size,cages:e.cages,solution:e.solution}}):t("div",{attrs:{id:"file-drop"}})],1)},o=[],i=t("xmWZ"),a=t("3Aqn"),s=t("qpph"),c=t("0yhX"),u=t("EdlT"),f=t("a94B"),p=t("HPY/"),d=t("ztjf"),v=t("gvf+"),h=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"AppPuzzle"},e._l(e.size,function(n){return t("div",{key:"r"+n,staticClass:"AppPuzzle-Row"},e._l(e.size,function(r){return t("div",{key:"r"+n+"c"+r,class:[e.baseCellClass,e.cellClass(n,r)]},[null!=e.cellHint(n,r)?t("span",{staticClass:"AppPuzzle-Cell_Hint"},[e._v("\n        "+e._s(e.cellHint(n,r))+"\n      ")]):e._e(),e._v(" "),t("input",{ref:"cell"+e.indexOf(n,r),refInFor:!0,domProps:{value:e.cellValue(n,r)},on:{keydown:function(t){e.onKeyDown(n,r,t)},change:function(t){e.onChange(n,r,t)}}})])}))}))},y=[],g=(t("HEwt"),t("91GP"),t("dRSK"),function(e,n,t,r){var l,o=arguments.length,i=o<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,t):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,n,t,r);else for(var a=e.length-1;a>=0;a--)(l=e[a])&&(i=(o<3?l(i):o>3?l(n,t,i):l(n,t))||i);return o>3&&i&&Object.defineProperty(n,t,i),i}),b=function(e,n){if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,n)},O=function(e){function n(){var e;return Object(i["a"])(this,n),e=Object(c["a"])(this,Object(u["a"])(n).apply(this,arguments)),e.baseCellClass="AppPuzzle-Cell",e.cellValues={},e}return Object(s["a"])(n,[{key:"onKeyDown",value:function(e,n,t){var r=t.key,l=this.size,o=null;if("j"===r){var i=e+1;i>l&&(i=1),o=this.indexOf(i,n)}else if("k"===r){var a=e-1;a<1&&(a=l),o=this.indexOf(a,n)}else if("h"===r){var s=n-1;s<1&&(s=l),o=this.indexOf(e,s)}else if("l"===r){var c=n+1;c>l&&(c=1),o=this.indexOf(e,c)}if(null!=o){t.preventDefault();var u=this.$refs["cell"+o];u&&u[0].focus()}}},{key:"onChange",value:function(e,n,t){var r=this.indexOf(e,n);if(t.target instanceof HTMLInputElement){var l=parseInt(t.target.value,10)||null;this.cellValues[r]=l}}},{key:"cellValue",value:function(e,n){return this.cellValues[this.indexOf(e,n)]}},{key:"fetchCell",value:function(e,n){var t=this.cells;if(null==t)return null;var r=this.indexOf(e,n),l=t[r];return l||null}},{key:"cellHint",value:function(e,n){var t=this.indexOf(e,n),r=this.findCage(e,n);if(null==r||null==r.indexes||r.indexes[0]!==t)return null;var l=this.cells[t];return"".concat(l.result).concat(l.operator)}},{key:"findCage",value:function(e,n){var t=this.indexOf(e,n);return this.appCages.find(function(e){var n=e.indexes;return null!=n&&-1!==n.indexOf(t)})}},{key:"cellClass",value:function(e,n){var t=this.fetchCell(e,n);return t?t.classNames:""}},{key:"indexOf",value:function(e,n){return this.size*(e-1)+(n-1)}},{key:"appCages",get:function(){var e=this.size,n=function(n){return e*n.row+n.col};return this.cages.map(function(e){return Object.assign({},e,{indexes:e.elements.map(n)})})}},{key:"cells",get:function(){var e=this.size,n=Array.from(Array(e*e).keys()).map(function(){return{classNames:"",operator:null,result:null}});return this.appCages.forEach(function(t){var r=t.indexes;r.forEach(function(l,o){var i=n[l];0===o&&(i.result=t.value,i.operator=t.operator||"÷");var a=r[o-1];null!=a&&(i.classNames+=" ".concat(z(e,l,a)));var s=r[o+1];null!=s&&(i.classNames+=" ".concat(z(e,l,s)))})}),n}}]),Object(a["a"])(n,e),n}(v["Vue"]);g([Object(v["Prop"])(),b("design:type",Array)],O.prototype,"cages",void 0),g([Object(v["Prop"])(),b("design:type",Number)],O.prototype,"size",void 0),g([Object(v["Prop"])(),b("design:type",Array)],O.prototype,"solution",void 0),O=g([Object(v["Component"])({props:{cages:Array,size:Number,solution:Array}})],O);var j=O;function z(e,n,t){var r="AppPuzzle-Cell_",l=n-t;return 1===Math.abs(l)?r+(l>0?"West":"East"):Math.abs(l)===e?r+(l>0?"North":"South"):""}var m=j,x=(t("5jYY"),t("KHd+")),w=Object(x["a"])(m,h,y,!1,null,null,null),k=w.exports,C=function(e,n,t,r){var l,o=arguments.length,i=o<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,t):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(f["a"])(Reflect))&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,n,t,r);else for(var a=e.length-1;a>=0;a--)(l=e[a])&&(i=(o<3?l(i):o>3?l(n,t,i):l(n,t))||i);return o>3&&i&&Object.defineProperty(n,t,i),i},P=function(e){function n(){var e;return Object(i["a"])(this,n),e=Object(c["a"])(this,Object(u["a"])(n).apply(this,arguments)),e.size=0,e.cages=[],e.solution=[],e}return Object(s["a"])(n,[{key:"mounted",value:function(){var e=this;this.uppyInstance=p(),this.uppyInstance.use(d,{target:"#file-drop",allowMultipleFiles:!1}).run().on("complete",function(n){if(n.successful&&n.successful.length>0){var t=n.successful[0].data,r=new FileReader;r.onload=function(n){var t=n.target,r=JSON.parse(t.result);e.size=r.size,e.cages=r.cages,e.solution=r.solution},r.readAsText(t)}})}},{key:"beforeDestroy",value:function(){this.uppyInstance&&this.uppyInstance.close()}}]),Object(a["a"])(n,e),n}(v["Vue"]);P=C([Object(v["Component"])({components:{AppPuzzle:k}})],P);var A=P,R=A,_=(t("nNx0"),Object(x["a"])(R,l,o,!1,null,null,null)),N=_.exports,E=t("lIOY");Object(E["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(N)}}).$mount("#app")}});
//# sourceMappingURL=app.ab00e617.js.map