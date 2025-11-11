const apiUrl = "http://localhost:3000/api/students";


window.onload = fetchStudents;
const token = localStorage.getItem("token");
if (!token) {
 window.location.href = "login.html";
}


// Fetch & display students
async function fetchStudents() {
 const res = await fetch(apiUrl);
 const data = await res.json();
 displayStudents(data);
}


// Display students in table
function displayStudents(students) {
 const table = document.getElementById("studentTable");
 table.innerHTML = "";
 students.forEach((s) => {
   const row = `
     <tr>
       <td>${s.name}</td>
       <td>${s.rollNo}</td>
       <td>${s.course}</td>
       <td>${s.grade || "-"}</td>
       <td>
         <button class="btn btn-warning btn-sm me-2" onclick="editStudent('${s._id}')">Edit</button>
         <button class="btn btn-danger btn-sm" onclick="deleteStudent('${s._id}')">Delete</button>
       </td>
     </tr>`;
   table.innerHTML += row;
 });
}


// Add or Update student
document.getElementById("studentForm").addEventListener("submit", async (e) => {
 e.preventDefault();
 const id = document.getElementById("studentId").value;
 const studentData = {
   name: document.getElementById("name").value,
   rollNo: document.getElementById("rollNo").value,
   course: document.getElementById("course").value,
   grade: document.getElementById("grade").value,
 };


 const method = id ? "PUT" : "POST";
 const endpoint = id ? `${apiUrl}/update/${id}` : `${apiUrl}/add`;


 const res = await fetch(endpoint, {
   method,
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(studentData),
 });


 if (res.ok) {
   alert(id ? "✅ Student updated!" : "✅ Student added!");
   document.getElementById("studentForm").reset();
   document.getElementById("studentId").value = "";
   document.getElementById("formTitle").innerText = "Add Student";
   fetchStudents();
 } else {
   alert("⚠️ Error saving student!");
 }
});


// Edit student
async function editStudent(id) {
 const res = await fetch(apiUrl);
 const students = await res.json();
 const s = students.find((x) => x._id === id);
 if (!s) return;


 document.getElementById("studentId").value = s._id;
 document.getElementById("name").value = s.name;
 document.getElementById("rollNo").value = s.rollNo;
 document.getElementById("course").value = s.course;
 document.getElementById("grade").value = s.grade;


 document.getElementById("formTitle").innerText = "Edit Student";
}


// Delete student
async function deleteStudent(id) {
 if (!confirm("Are you sure you want to delete this student?")) return;


 const res = await fetch(`${apiUrl}/delete/${id}`, { method: "DELETE" });
 if (res.ok) {
   alert("🗑️ Student deleted!");
   fetchStudents();
 } else {
   alert("❌ Error deleting student!");
 }
}


// Search functionality
document.getElementById("searchInput").addEventListener("input", async (e) => {
 const keyword = e.target.value.toLowerCase();
 const res = await fetch(apiUrl);
 const data = await res.json();


 const filtered = data.filter(
   (s) =>
     s.name.toLowerCase().includes(keyword) ||
     s.rollNo.toLowerCase().includes(keyword)
 );
 displayStudents(filtered);
});
