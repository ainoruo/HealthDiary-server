import"./style-C8ZCfusv.js";import{f as m}from"./fetch-CGUiTqyx.js";import{s}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".menu-toggle"),n=document.querySelector(".menu");o.addEventListener("click",function(){n.classList.toggle("show")})});const c=document.getElementById("exercise-form");c.addEventListener("submit",v);const a=document.getElementById("edit-modal"),_=document.querySelector(".close-button"),k=document.getElementById("edit-form");_.onclick=()=>a.style.display="none";window.onclick=o=>{o.target===a&&(a.style.display="none")};async function v(o){if(o.preventDefault(),!c.checkValidity()){c.reportValidity();return}const n=localStorage.getItem("user_id");if(!n){alert("User ID not found. Please log in again.");return}const e=new FormData(c),t={};e.forEach((r,i)=>{t[i]=r}),console.log(t),t.user_id=n;try{const r=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/nutrition/${n}`,u={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(t)};if(!(await fetch(r,u)).ok)throw new Error("Failed to add nutrition entry");c.reset(),s("Nutrition entry added successfully!")}catch{s("Failed to add nutrition entry. Please try again.")}}async function g(){const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/nutrition/${localStorage.getItem("user_id")}`,t={method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}};m(n,t).then(r=>{b(r)})}function b(o){console.log(o);const n=document.querySelector(".tbody");n.innerHTML="",o.forEach(e=>{console.log(e.entry_date,e.calories_consumed,e.carbohydrates_grams,e.protein_grams,e.fat_grams,e.notes);const t=document.createElement("tr"),r=new Date(e.entry_date).toLocaleDateString("fi-FI"),i=document.createElement("td");i.innerText=r;const u=document.createElement("td");u.innerText=parseInt(e.calories_consumed).toFixed(0);const l=document.createElement("td");l.innerText=parseInt(e.carbohydrates_grams).toFixed(0);const p=document.createElement("td");p.innerText=parseInt(e.protein_grams).toFixed(0);const y=document.createElement("td");y.innerText=parseInt(e.fat_grams).toFixed(0);const h=document.createElement("td");h.innerText=e.notes;const f=document.createElement("td"),d=document.createElement("button");d.className="edit",d.setAttribute("nutrition-id",e.nutrition_id),d.setAttribute("data-nutrition-id",e.nutrition_id),d.innerText="Edit",d.addEventListener("click",I=>E(I,o)),f.appendChild(d),t.appendChild(i),t.appendChild(u),t.appendChild(l),t.appendChild(p),t.appendChild(y),t.appendChild(h),t.appendChild(f),n.appendChild(t)}),document.querySelectorAll(".edit").forEach(e=>e.addEventListener("click",t=>E(t,o)))}function E(o,n){const e=parseInt(o.target.dataset.nutritionId,10);console.log("Nutrition ID:",e);const t=n.find(r=>r.nutrition_id===e);document.getElementById("edit-entry-id").value=e,document.getElementById("edit-date").value=t.entry_date,document.getElementById("edit-calories-consumed").value=t.calories_consumed,document.getElementById("edit-carbohydrates-grams").value=t.carbohydrates_grams,document.getElementById("edit-protein-grams").value=t.protein_grams,document.getElementById("edit-fat-grams").value=t.fat_grams,document.getElementById("edit-notes").value=t.notes,a.style.display="block"}k.addEventListener("submit",async o=>{o.preventDefault();const n=new FormData(o.target),t=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/nutrition/${n.get("edit-entry-id")}`,i={method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({entry_date:n.get("edit-date"),calories_consumed:n.get("edit-calories-consumed"),carbohydrates_grams:n.get("edit-carbohydrates-grams"),protein_grams:n.get("edit-protein-grams"),fat_grams:n.get("edit-fat-grams"),notes:n.get("edit-notes")})};m(t,i).then(()=>{a.style.display="none",s("Nutrition entry updated"),g()})});document.getElementById("delete-entry").addEventListener("click",function(){const o=document.getElementById("edit-entry-id").value;o&&B(o)});async function B(o){if(!confirm("Are you sure you want to delete this nutrition entry?"))return;const n=`https://hyte24.northeurope.cloudapp.azure.com/api/entries/nutrition/${o}`,t={method:"DELETE",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};m(n,t).then(r=>{console.log(r),s("Nutrition entry deleted"),a.style.display="none",g()})}document.getElementById("fetch-data").addEventListener("click",g);document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(n){n.preventDefault(),s("Logging out"),localStorage.removeItem("user_id"),localStorage.removeItem("token"),setTimeout(()=>{window.location.href="index.html"},2e3)})});
