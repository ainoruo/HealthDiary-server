import"./style-928bxCnj.js";import{f as a}from"./fetch-CGUiTqyx.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".menu-toggle"),e=document.querySelector(".menu");t.addEventListener("click",function(){e.classList.toggle("show")})});async function l(){const t="http://localhost:3000/api/auth/me",e=localStorage.getItem("token"),o=localStorage.getItem("id");console.log("Tämä on haettu LocalStoragesta",e),console.log("käyttäjän id: ",o);const n={method:"GET",headers:{Authorization:"Bearer: "+e}};a(t,n).then(c=>{document.getElementById("name").innerHTML=c.user.username})}l();document.addEventListener("DOMContentLoaded",function(){document.querySelector(".logout a").addEventListener("click",function(e){e.preventDefault(),localStorage.removeItem("user_id"),localStorage.removeItem("token"),window.location.href="login.html"})});
