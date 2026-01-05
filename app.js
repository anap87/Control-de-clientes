document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Login simple (sin backend por ahora)
  window.location.href = "dashboard.html";
});

