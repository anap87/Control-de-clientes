// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
}

// ---------------- DATA MANAGEMENT ----------------
function loadClients() {
  const savedClients = localStorage.getItem("clients");

  if (savedClients) {
    return Promise.resolve(JSON.parse(savedClients));
  } else {
    return fetch("data.json")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("clients", JSON.stringify(data.clients));
        return data.clients;
      });
  }
}

// ---------------- DASHBOARD ----------------
if (document.getElementById("clientTable")) {
  loadClients().then(clients => {
    const table = document.getElementById("clientTable");
    table.innerHTML = "";

    clients.forEach(client => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.sport}</td>
        <td>
          <select onchange="updateStatus(${client.id}, this.value)">
            <option ${client.status === "Accepted" ? "selected" : ""}>Accepted</option>
            <option ${client.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${client.status === "In progress" ? "selected" : ""}>In progress</option>
          </select>
        </td>
        <td>
          <button class="view-btn" onclick="viewClient(${client.id})">View</button>
        </td>
      `;

      table.appendChild(row);
    });
  });
}

function updateStatus(id, newStatus) {
  const clients = JSON.parse(localStorage.getItem("clients"));
  const client = clients.find(c => c.id === id);

  if (client) {
    client.status = newStatus;
    localStorage.setItem("clients", JSON.stringify(clients));
  }
}

function viewClient(id) {
  window.location.href = `client.html?id=${id}`;
}

// ---------------- ADD CLIENT ----------------
const addClientForm = document.getElementById("addClientForm");

if (addClientForm) {
  addClientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const sport = document.getElementById("sport").value;
    const status = document.getElementById("status").value;

    const clients = JSON.parse(localStorage.getItem("clients"));

    const newClient = {
      id: Date.now(),
      name,
      sport,
      status
    };

    clients.push(newClient);
    localStorage.setItem("clients", JSON.stringify(clients));

    addClientForm.reset();
    location.reload();
  });
}


// ---------------- CLIENT PROFILE ----------------
let currentClientId = null;

if (document.getElementById("clientDetails")) {
  const params = new URLSearchParams(window.location.search);
  currentClientId = parseInt(params.get("id"));

  loadClients().then(clients => {
    const client = clients.find(c => c.id === currentClientId);

    if (client) {
      document.getElementById("clientDetails").innerHTML = `
        <p><strong>Name:</strong> ${client.name}</p>
        <p><strong>Sport:</strong> ${client.sport}</p>
        <p><strong>Status:</strong> ${client.status}</p>
      `;

      // Load notes if they exist
      document.getElementById("clientNotes").value = client.notes || "";
    }
  });
}

function saveNotes() {
  const notes = document.getElementById("clientNotes").value;
  const clients = JSON.parse(localStorage.getItem("clients"));

  const client = clients.find(c => c.id === currentClientId);
  if (client) {
    client.notes = notes;
    localStorage.setItem("clients", JSON.stringify(clients));
    alert("Notes saved successfully!");
  }
}

