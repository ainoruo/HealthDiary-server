import"./style-DwIR8jLK.js";import{f as g}from"./fetch-CGUiTqyx.js";import{s as l}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const n=document.querySelector(".menu-toggle"),o=document.querySelector(".menu");n.addEventListener("click",function(){o.classList.toggle("show")})});const y=document.getElementById("exercise-form");console.log(y);y.addEventListener("submit",S);const v=document.querySelector("#fetch-data");v.addEventListener("click",m);const u=document.getElementById("edit-modal"),w=document.querySelector(".close-button"),L=document.getElementById("edit-form");w.onclick=()=>u.style.display="none";window.onclick=n=>{n.target===u&&(u.style.display="none")};async function S(n){n.preventDefault();const o=localStorage.getItem("user_id"),e=new FormData(y),t={};e.forEach((d,r)=>{t[r]=d,console.log(t)}),t.user_id=o;try{const d=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${o}`,a={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(t)},i=await fetch(d,a);if(console.log(i),!i.ok)throw new Error("Failed to add diary entry");y.reset(),l("Diary entry added successfully!"),m()}catch(d){console.error("Error adding diary entry:",d.message),l("Failed to add diary entry. Please try again.")}}async function m(){const o=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/diaries/${localStorage.getItem("user_id")}`,t={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};g(o,t).then(d=>{B(d)})}function B(n){console.log(n);const o=document.querySelector(".tbody");o.innerHTML="",n.forEach(e=>{console.log(e.entry_date,e.mood,e.weight,e.sleep_hours,e.notes,e.created_at);const t=document.createElement("tr"),d=new Date(e.entry_date).toLocaleDateString("fi-FI"),r=document.createElement("td");r.innerText=d;const a=document.createElement("td");a.innerText=e.mood;const i=document.createElement("td");i.innerText=e.weight;const p=document.createElement("td");p.innerText=e.sleep_hours;const h=document.createElement("td");h.innerText=e.notes;const E=document.createElement("td"),s=document.createElement("button");s.className="del",s.setAttribute("entry-id",e.entry_id),s.innerText="D",s.addEventListener("click",k),E.appendChild(s);const f=document.createElement("td"),c=document.createElement("button");c.className="edit",c.setAttribute("entry-id",e.entry_id),c.setAttribute("data-entry-id",e.entry_id),c.innerText="E",c.addEventListener("click",D=>I(D,n)),f.appendChild(c),t.appendChild(r),t.appendChild(a),t.appendChild(i),t.appendChild(p),t.appendChild(h),t.appendChild(E),t.appendChild(f),o.appendChild(t)}),document.querySelectorAll(".del").forEach(e=>e.addEventListener("click",k)),document.querySelectorAll(".edit").forEach(e=>e.addEventListener("click",t=>I(t,n)))}function I(n,o){console.log(n.target.dataset.entryId);const e=parseInt(n.target.dataset.entryId,10);console.log("Entry ID:",e);const t=o.find(d=>d.entry_id===e);document.getElementById("edit-entry-id").value=e,document.getElementById("edit-date").value=t.entry_date,document.getElementById("edit-mood").value=t.mood,document.getElementById("edit-weight").value=t.weight,document.getElementById("edit-sleep").value=t.sleep_hours,document.getElementById("edit-notes").value=t.notes,u.style.display="block"}L.addEventListener("submit",async n=>{n.preventDefault();const o=new FormData(n.target),e=o.get("edit-entry-id");console.log("FormData:",o);const t=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${e}`,r={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({entry_date:o.get("edit-date"),mood:o.get("edit-mood"),weight:o.get("edit-weight"),sleep_hours:o.get("edit-sleep"),notes:o.get("edit-notes")})};g(t,r).then(()=>{u.style.display="none",l("Diary entry updated"),m()})});async function k(n){console.log(n);const o=n.target.attributes["entry-id"].value;console.log(o);const e=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${o}`,d={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};confirm("Are you sure you want to delete entry?")&&g(e,d).then(a=>{console.log(a),l("Diary entry deleted"),m()})}document.getElementById("fetch-data").addEventListener("click",m);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(o){o.preventDefault(),l("Logged out"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),setTimeout(()=>{window.location.href="index.html"},2e3)})});
