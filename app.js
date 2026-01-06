document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Login simple (sin backend por ahora)
  window.location.href = "dashboard.html";
});

// Load clients into dashboard
if (document.getElementById("clientTable")) {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const table = document.getElementById("clientTable");

      data.clients.forEach(client => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${client.name}</td>
          <td>${client.sport}</td>
          <td>${client.status}</td>
          <td>
            <button class="view-btn" onclick="viewClient(${client.id})">
              View
            </button>
          </td>
        `;

        table.appendChild(row);
      });
    });
}

function viewClient(id) {
  window.location.href = `client.html?id=${id}`;
}
