import"./style-C8ZCfusv.js";import{f as m}from"./fetch-CGUiTqyx.js";import{s}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".menu-toggle"),n=document.querySelector(".menu");o.addEventListener("click",function(){n.classList.toggle("show")})});const c=document.getElementById("exercise-form");c.addEventListener("submit",D);const I=document.querySelector("#fetch-data");I.addEventListener("click",l);const i=document.getElementById("edit-modal"),k=document.querySelector(".close-button"),v=document.getElementById("edit-form");k.onclick=()=>i.style.display="none";window.onclick=o=>{o.target===i&&(i.style.display="none")};async function D(o){if(o.preventDefault(),!c.checkValidity()){c.reportValidity();return}const n=localStorage.getItem("user_id"),t=new FormData(c),e={};t.forEach((d,r)=>{e[r]=d,console.log(e)}),e.user_id=n;try{const d=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${n}`,u={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(e)};if(!(await fetch(d,u)).ok)throw new Error("Failed to add diary entry");c.reset(),s("Diary entry added successfully!"),l()}catch(d){console.error("Error adding diary entry:",d.message),s("Failed to add diary entry. Please try again.")}}async function l(){const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/diaries/${localStorage.getItem("user_id")}`,e={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};m(n,e).then(d=>{L(d)})}function L(o){console.log(o);const n=document.querySelector(".tbody");n.innerHTML="",o.forEach(t=>{console.log(t.entry_date,t.mood,t.weight,t.sleep_hours,t.notes,t.created_at);const e=document.createElement("tr"),d=new Date(t.entry_date).toLocaleDateString("fi-FI"),r=document.createElement("td");r.innerText=d;const u=document.createElement("td");u.innerText=t.mood;const y=document.createElement("td");y.innerText=t.weight;const p=document.createElement("td");p.innerText=t.sleep_hours;const g=document.createElement("td");g.innerText=t.notes;const h=document.createElement("td"),a=document.createElement("button");a.className="edit",a.setAttribute("entry-id",t.entry_id),a.setAttribute("data-entry-id",t.entry_id),a.innerText="Edit",a.addEventListener("click",f=>E(f,o)),h.appendChild(a),e.appendChild(r),e.appendChild(u),e.appendChild(y),e.appendChild(p),e.appendChild(g),e.appendChild(h),n.appendChild(e)}),document.querySelectorAll(".edit").forEach(t=>t.addEventListener("click",e=>E(e,o)))}function E(o,n){console.log(o.target.dataset.entryId);const t=parseInt(o.target.dataset.entryId,10);console.log("Entry ID:",t);const e=n.find(d=>d.entry_id===t);document.getElementById("edit-entry-id").value=t,document.getElementById("edit-date").value=e.entry_date,document.getElementById("edit-mood").value=e.mood,document.getElementById("edit-weight").value=e.weight,document.getElementById("edit-sleep").value=e.sleep_hours,document.getElementById("edit-notes").value=e.notes,i.style.display="block"}v.addEventListener("submit",async o=>{o.preventDefault();const n=new FormData(o.target),e=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${n.get("edit-entry-id")}`,r={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({entry_date:n.get("edit-date"),mood:n.get("edit-mood"),weight:n.get("edit-weight"),sleep_hours:n.get("edit-sleep"),notes:n.get("edit-notes")})};m(e,r).then(()=>{i.style.display="none",s("Diary entry updated"),l()})});document.getElementById("delete-exercise").addEventListener("click",function(){const o=document.getElementById("edit-entry-id").value;o&&w(o)});async function w(o){if(!confirm("Are you sure you want to delete this diary entry?"))return;const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/${o}`,e={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};m(n,e).then(d=>{console.log(d),s("Diary entry deleted"),i.style.display="none",l()})}document.getElementById("fetch-data").addEventListener("click",l);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(n){n.preventDefault(),s("Logged out"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),setTimeout(()=>{window.location.href="index.html"},2e3)})});
