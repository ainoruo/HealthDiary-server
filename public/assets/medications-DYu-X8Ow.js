import"./style-6mOx-azO.js";import{f as g}from"./fetch-CGUiTqyx.js";import{s as r}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".menu-toggle"),n=document.querySelector(".menu");o.addEventListener("click",function(){n.classList.toggle("show")})});const m=document.getElementById("exercise-form");m.addEventListener("submit",S);const l=document.getElementById("edit-modal"),v=document.querySelector(".close-button"),L=document.getElementById("edit-form");v.onclick=()=>l.style.display="none";window.onclick=o=>{o.target===l&&(l.style.display="none")};async function S(o){o.preventDefault();const n=localStorage.getItem("user_id");if(!n){r("User ID not found. Please log in again.");return}const e=new FormData(m),t={};e.forEach((d,a)=>{t[a]=d}),console.log(t),t.user_id=n;try{const d=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/medications/${n}`,i={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(t)};if(!(await fetch(d,i)).ok)throw new Error("Failed to add medication");m.reset(),r("Medication added successfully!")}catch(d){console.error("Error adding medication:",d.message),r("Failed to add medication. Please try again.")}}async function p(){const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/medications/${localStorage.getItem("user_id")}`,t={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};g(n,t).then(d=>{T(d)})}function T(o){console.log(o);const n=document.querySelector(".tbody");n.innerHTML="",o.forEach(e=>{console.log(e.name,e.dosage,e.frequency,e.start_date,e.end_date);const t=document.createElement("tr"),d=document.createElement("td");d.innerText=e.name;const a=document.createElement("td");a.innerText=e.dosage;const i=document.createElement("td");i.innerText=e.frequency;const u=document.createElement("td");u.innerText=e.start_date;const y=document.createElement("td");y.innerText=e.end_date;const h=document.createElement("td"),s=document.createElement("button");s.className="del",s.setAttribute("medication_id",e.medication_id),s.innerText="Delete",h.appendChild(s),s.addEventListener("click",I);const f=document.createElement("td"),c=document.createElement("button");c.className="edit",c.setAttribute("medication-id",e.medication_id),c.setAttribute("data-medication-id",e.medication_id),c.innerText="Edit",c.addEventListener("click",k=>E(k,o)),f.appendChild(c),t.appendChild(d),t.appendChild(a),t.appendChild(i),t.appendChild(u),t.appendChild(y),t.appendChild(h),t.appendChild(f),n.appendChild(t)}),document.querySelectorAll(".del").forEach(e=>e.addEventListener("click",I)),document.querySelectorAll(".edit").forEach(e=>e.addEventListener("click",t=>E(t,o)))}function E(o,n){console.log(o.target.dataset.medicationId);const e=parseInt(o.target.dataset.medicationId,10);console.log("Entry ID:",e);const t=n.find(d=>d.medication_id===e);document.getElementById("edit-entry-id").value=e,document.getElementById("edit-name").value=t.name,document.getElementById("edit-dosage").value=t.dosage,document.getElementById("edit-frequency").value=t.frequency,document.getElementById("edit-start-date").value=t.start_date,document.getElementById("edit-end-date").value=t.end_date,l.style.display="block"}L.addEventListener("submit",async o=>{o.preventDefault();const n=new FormData(o.target),e=n.get("edit-entry-id");console.log("FormData:",n);const t=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/medications/${e}`,a={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({name:n.get("edit-name"),dosage:n.get("edit-dosage"),frequency:n.get("edit-frequency"),start_date:n.get("edit-start-date"),end_date:n.get("edit-end-date")})};g(t,a).then(()=>{l.style.display="none",r("Medication entry updated!"),p()})});async function I(o){console.log(o);const n=o.target.attributes.medication_id.value;console.log(n);const e=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/medications/${n}`,d={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};confirm("Are you sure you want to delete medication?")&&g(e,d).then(i=>{console.log(i),r("Medication entry deleted!"),p()})}document.getElementById("fetch-data").addEventListener("click",p);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(n){n.preventDefault(),r("Logging out"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),setTimeout(()=>{window.location.href="index.html"},2e3)})});