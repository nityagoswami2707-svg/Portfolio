const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.textContent=open?"×":"☰";menuBtn.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.textContent="☰";menuBtn.setAttribute("aria-expanded","false");}));
