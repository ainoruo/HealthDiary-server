import"./style-C8ZCfusv.js";import{f as l}from"./fetch-CGUiTqyx.js";import{s as a}from"./toast-B-6j1RQv.js";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".menu-toggle"),e=document.querySelector(".menu");o.addEventListener("click",function(){e.classList.toggle("show")})});const i=document.querySelector(".loginuser");i.addEventListener("click",async o=>{o.preventDefault();const e="https://hyte24.northeurope.cloudapp.azure.com/api/auth/login",r=document.querySelector(".login_form"),c={username:r.querySelector("input[name=username]").value,password:r.querySelector("input[name=password]").value},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)};l(e,n).then(t=>{console.log(t),console.log(t.token),localStorage.setItem("token",t.token),t.token==null?a("Unauthorized: username or password incorrect!"):(a(t.message),localStorage.setItem("name",t.user.username),localStorage.setItem("user_id",t.user.user_id),setTimeout(()=>{window.location.href="diary.html"},2e3)),logResponse("loginResponse",`localStorage set with token 
      value: ${t.token}`)})});document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".create-user-link"),e=document.getElementById("modal");o.addEventListener("click",function(){e.style.display="block"}),e.querySelector(".close").addEventListener("click",function(){e.style.display="none"}),window.addEventListener("click",function(c){c.target==e&&(e.style.display="none")})});const u="https://hyte24.northeurope.cloudapp.azure.com/api/users",s=document.querySelector(".modal-content");s.addEventListener("submit",async o=>{if(o.preventDefault(),!s.checkValidity()){s.reportValidity();return}const r={username:s.querySelector("input[name=username]").value,password:s.querySelector("input[name=password]").value,email:s.querySelector("input[name=email]").value},c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};try{const n=await l(u,c);console.log(n),n.user_id?(a("User created successfully!"),setTimeout(()=>{window.location.href="index.html"},2e3)):a("Failed to create user. Please try again.")}catch(n){console.error(n),a("Failed to create user. Please try again.")}});
