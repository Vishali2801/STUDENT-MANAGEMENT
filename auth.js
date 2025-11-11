const apiUrl = "http://localhost:3000/api/auth";


// REGISTER
if (document.getElementById("registerForm")) {
 document.getElementById("registerForm").addEventListener("submit", async (e) => {
   e.preventDefault();
   const username = regUsername.value;
   const password = regPassword.value;


   const res = await fetch(`${apiUrl}/register`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ username, password })
   });
   const data = await res.json();
   alert(data.message);
   if (res.ok) window.location.href = "login.html";
 });
}


// LOGIN
if (document.getElementById("loginForm")) {
 document.getElementById("loginForm").addEventListener("submit", async (e) => {
   e.preventDefault();
   const username = document.getElementById("username").value;
   const password = document.getElementById("password").value;


   const res = await fetch(`${apiUrl}/login`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ username, password })
   });


   const data = await res.json();
   if (res.ok) {
     localStorage.setItem("token", data.token);
     localStorage.setItem("username", data.username);
     window.location.href = "index.html";
   } else {
     alert(data.message);
   }
 });
}


