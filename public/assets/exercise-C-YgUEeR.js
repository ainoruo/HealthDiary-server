import"./style-6mOx-azO.js";import{f as y}from"./fetch-CGUiTqyx.js";import{s}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".menu-toggle"),t=document.querySelector(".menu");o.addEventListener("click",function(){t.classList.toggle("show")})});const p=document.getElementById("exercise-form");p.addEventListener("submit",D);const l=document.getElementById("edit-modal"),I=document.querySelector(".close-button"),v=document.getElementById("edit-form");I.onclick=()=>l.style.display="none";window.onclick=o=>{o.target===l&&(l.style.display="none")};async function D(o){o.preventDefault();const t=localStorage.getItem("user_id");if(!t){alert("User ID not found. Please log in again.");return}const e=new FormData(p),n={};e.forEach((r,d)=>{n[d]=r}),console.log(n),n.user_id=t;try{const r=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/exercise/${t}`,c={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(n)};if(!(await fetch(r,c)).ok)throw new Error("Failed to add exercise");p.reset(),s("Exercise added successfully!")}catch(r){console.error("Error adding exercise:",r.message),s("Failed to add exercise. Please try again.")}}const L=document.querySelector("#fetch-data");L.addEventListener("click",u);async function u(){const t=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/exercise/${localStorage.getItem("user_id")}`,n={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};y(t,n).then(r=>{S(r)})}function S(o){console.log(o);const t=document.querySelector(".tbody");t.innerHTML="",o.forEach(e=>{console.log(e.date,e.type,e.duration,e.intensity);const n=document.createElement("tr"),r=new Date(e.date).toLocaleDateString("fi-FI"),d=document.createElement("td");d.innerText=r;const c=document.createElement("td");c.innerText=e.type;const m=document.createElement("td");m.innerText=e.duration;const g=document.createElement("td");g.innerText=e.intensity;const h=document.createElement("td"),a=document.createElement("button");a.className="del",a.setAttribute("exercise_id",e.exercise_id),a.innerText="Delete",h.appendChild(a),a.addEventListener("click",x);const E=document.createElement("td"),i=document.createElement("button");i.className="edit",i.setAttribute("exercise-id",e.exercise_id),i.setAttribute("data-exercise-id",e.exercise_id),i.innerText="Edit",i.addEventListener("click",k=>f(k,o)),E.appendChild(i),n.appendChild(d),n.appendChild(c),n.appendChild(m),n.appendChild(g),n.appendChild(h),n.appendChild(E),t.appendChild(n)}),document.querySelectorAll(".del").forEach(e=>e.addEventListener("click",x)),document.querySelectorAll(".edit").forEach(e=>e.addEventListener("click",n=>f(n,o)))}function f(o,t){const e=parseInt(o.target.dataset.exerciseId,10);console.log("Entry ID:",e);const n=t.find(r=>r.exercise_id===e);document.getElementById("edit-entry-id").value=e,document.getElementById("edit-date").value=n.date,document.getElementById("edit-type").value=n.type,document.getElementById("edit-duration").value=n.duration,document.getElementById("edit-intensity").value=n.intensity,l.style.display="block"}v.addEventListener("submit",async o=>{o.preventDefault();const t=new FormData(o.target),e=t.get("edit-entry-id");console.log("FormData:",t);const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/exercise/${e}`,d={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({date:t.get("edit-date"),type:t.get("edit-type"),duration:t.get("edit-duration"),intensity:t.get("edit-intensity")})};y(n,d).then(()=>{l.style.display="none",s("Nutrition entry updated!"),u()})});async function x(o){console.log(o);const t=o.target.attributes.exercise_id.value;console.log(t);const e=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/exercise/${t}`,r={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};confirm("Are you sure you want to delete exercise?")&&y(e,r).then(c=>{console.log(c),s("Exercise deleted"),u()})}document.getElementById("fetch-data").addEventListener("click",u);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(t){t.preventDefault(),s("Logging out"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),setTimeout(()=>{window.location.href="index.html"},2e3)})});