import{a,i as y,S as g}from"./assets/vendor-0ca627d3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}})();document.querySelector(".loader"),document.querySelector(".error"),document.querySelector(".cat-info");const d="https://api.thecatapi.com/v1",S="live_RjEIYRa9UIQiuCs0GBjhWjiTFUMeoAxHOIJdhn6UnuIPCQmVsxmCCshAFLBdwlby";a.defaults.headers.common["x-api-key"]=S;let l=!1;function b(){const e="/breeds";return a.get(`${d}${e}`).then(t=>t.data).catch(t=>{throw u(),new Error(t.message)})}function w(e){if(!e)return Promise.resolve();const t="/images/search",c={breed_ids:e};return a.get(`${d}${t}`,{params:c}).then(n=>n.data).catch(n=>{throw u(),new Error(n.message)})}function u(){l||(y.error({title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"topRight",timeout:5e3,closeOnClick:!0}),l=!0)}const i={breedSelect:document.querySelector(".breed-select"),loader:document.querySelector(".loader"),error:document.querySelector(".error"),cat:document.querySelector(".cat-info")};let f=!1;function E(e){i.cat.innerHTML="",L(e),f=!0}const m=new g({select:".breed-select",settings:{placeholderText:"Select a breed"}});m.selectEl.addEventListener("change",e=>{E(e.target.value)});function L(e){if(f)return h(),w(e).then(t=>{i.cat.innerHTML=C(t)}).finally(()=>{p()})}function C(e){if(!e||e.length===0)return"<p>No information available for this breed.</p>";const{description:t,name:c,temperament:n}=e[0].breeds[0];return`
    <img src="${e[0].url}" alt="${c}" width="350"/>
    <h1 class="cat-info_name-breed">${c}</h1>
    <p class="cat-info_description">${t}</p>
    <p class="cat-info_name-habbit">${n}</p>
  `}function v(){h(),b().then(e=>{const t=e.map(({id:c,name:n})=>({text:n,value:c}));m.setData(t)}).finally(()=>{p()})}v();function h(){i.loader.style.display="block"}function p(){i.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
