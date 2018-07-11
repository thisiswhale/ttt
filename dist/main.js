!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t,r){"use strict";e.exports=class{constructor(e,t){this.name=e,this.marker=t}getData(){return{name:this.name,marker:this.marker}}isWinner(e,t){void 0===t&&(t=this.marker);const r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let n=e.reduce((e,r,n)=>r===t?e.concat(n):e,[]),o=!1;for(let[e,s]of r.entries())if(s.every(e=>n.indexOf(e)>-1)){o={index:r[e],marker:t};break}return o}}},function(e,t,r){"use strict";e.exports=class{constructor(){this.grid=[...Array(9).keys()]}getBoard(){return this.grid}}},function(e,t,r){"use strict";const n=r(1);e.exports=class extends n{constructor(){super(),this.playerOneTurn=!0}isPlayerOneTurn(){return this.playerOneTurn}nextPlayerTurn(){this.playerOneTurn=!this.playerOneTurn}hasTie(){return 0===this.grid.filter(e=>"number"==typeof e).length}isGameOver(e){return e||this.hasTie()}}},function(e,t,r){"use strict";const n=r(0);e.exports=class extends n{constructor(e,t){super(e,t),this.bestMoveId=""}emptySquares(e){return e.filter(e=>"x"!=e&&"o"!=e)}createMovesArr(e,t,r){let n=[];for(let o=0;o<t.length;o++){let s,i={};i.index=e[t[o]],e[t[o]]=r;const u="o"===r?"x":"o";s=this.minimax(e,u),i.score=s.score,e[t[o]]=i.index,n.push(i)}return n}bestIdFromMoves(e,t){let r,n;return"o"===t?(n=-1e5,e.forEach((t,o)=>{e[o].score>n&&(n=e[o].score,r=o)})):(n=1e5,e.forEach((t,o)=>{e[o].score<n&&(n=e[o].score,r=o)})),r}minimax(e,t){let r=this.emptySquares(e);if(this.isWinner(e,"x"))return{score:-100};if(this.isWinner(e,"o"))return{score:100};if(0===r.length)return{score:0};const n=this.createMovesArr(e,r,t);return n[this.bestIdFromMoves(n,t)]}setSquare(e){this.bestMoveId=this.minimax(e,this.marker).index,e[this.bestMoveId]=this.marker}getMove(){return this.bestMoveId}}},function(e,t,r){"use strict";const n=r(0);e.exports=class extends n{constructor(e,t){super(e,t)}setSquare(e,t){e[t]=this.marker}}},function(e,t,r){"use strict";const n=r(4),o=r(3),s=r(2);document.addEventListener("DOMContentLoaded",function(e){const t=document.querySelector("table"),r=document.querySelectorAll(".cell");document.querySelector("#control").onclick=m;let i,u,c,a=new s,l=a.getBoard(),f=new n("Human","x");function d(e){"computer"===e?(i=new o("Computer","o"),c=p):(i=new n("Human","o"),c=h),t.onclick=c}function m(e){if(a=new s,l=a.getBoard(),void 0===e)d();else{const t=e.target;d(t.id),function(e){e.includes("mode")&&r.forEach(e=>{e.innerHTML="",e.className=e.className.split(" ").filter(e=>"full"!=e&&"win"!=e&&"tie"!=e).join(" ")})}(t.className)}}function h(e){let t=e.target;t.className.includes("cell")&&"number"==typeof l[t.id]&&((u=y()).setSquare(l,t.id),x(u,t.id),b(u)||a.nextPlayerTurn())}function p(e){let t=e.target;t.className.includes("cell")&&"number"==typeof l[t.id]&&((u=y()).setSquare(l,t.id),x(u,t.id),b(u)||(a.nextPlayerTurn(),function(e){e.setSquare(l),x(e,e.getMove()),b(e)||a.nextPlayerTurn()}(u=y())))}function y(){return a.isPlayerOneTurn()?f:i}function x(e,t){let r=document.getElementById(t);r.innerText=e.marker,r.className+=" full"}function b(e){let t=a.isGameOver(e.isWinner(l));if("object"!=typeof t){if("boolean"!=typeof t||!0!==t)return!1;r.forEach(e=>{e.className+=" tie"})}else!function(e){e.index.forEach(e=>{r[e].className+=" win"})}(t)}m()})}]);