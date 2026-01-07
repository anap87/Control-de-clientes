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
  return new Promise(resolve => {
    const storedClients = localStorage.getItem("clients");

    if (storedClients) {
      resolve(JSON.parse(storedClients));
    } else {
      fetch("clients.json")
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("clients", JSON.stringify(data.clients));
          resolve(data.clients);
        });
    }
  });
}

function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

// ---------------- DASHBOARD ----------------
if (document.getElementById("clientTable")) {
  loadClients().then(clients => {

    const statusOrder = {
      "In progress": 1,
      "Accepted": 2,
      "Pending": 3
    };

    clients.sort((a, b) =>
      (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
    );

    const table = document.getElementById("clientTable");
    table.innerHTML = "";

    clients.forEach(client => {
      let buttonClass = "view-btn";

      if (client.status === "In progress") buttonClass += " view-in-progress";
      if (client.status === "Accepted") buttonClass += " view-accepted";
      if (client.status === "Pending") buttonClass += " view-pending";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${client.name}</td>
        <td>${client.sport}</td>
        <td>
          <select onchange="updateStatus(${client.id}, this.value)">
            <option ${client.status === "In progress" ? "selected" : ""}>In progress</option>
            <option ${client.status === "Accepted" ? "selected" : ""}>Accepted</option>
            <option ${client.status === "Pending" ? "selected" : ""}>Pending</option>
          </select>
        </td>
        <td>
          <button class="${buttonClass}" onclick="viewClient(${client.id})">
            View
          </button>
        
          <button class="delete-btn" onclick="deleteClient(${client.id})">
            Delete
          </button>
        </td>

      `;
      table.appendChild(row);
    });
  });
}

function viewClient(id) {
  localStorage.setItem("selectedClientId", id);
  window.location.href = "client.html";
}

function updateStatus(id, newStatus) {
  loadClients().then(clients => {
    const client = clients.find(c => c.id === id);
    if (client) {
      client.status = newStatus;
      saveClients(clients);
      location.reload(); // reorden + color
    }
  });
}

function deleteClient(id) {
  const confirmDelete = confirm("Are you sure you want to delete this client?");

  if (!confirmDelete) return;

  loadClients().then(clients => {
    const updatedClients = clients.filter(client => client.id !== id);
    saveClients(updatedClients);
    location.reload();
  });
}


// ---------------- ADD CLIENT ----------------
const addClientForm = document.getElementById("addClientForm");

if (addClientForm) {
  addClientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const sport = document.getElementById("sport").value;
    const status = document.getElementById("status").value;

    loadClients().then(clients => {
      const newClient = {
        id: Date.now(),
        name,
        sport,
        status
      };

      clients.push(newClient);
      saveClients(clients);
      addClientForm.reset();
      location.reload();
    });
  });
}

// ---------------- CLIENT PROFILE ----------------
if (document.getElementById("clientDetails")) {
  const clientId = localStorage.getItem("selectedClientId");

  loadClients().then(clients => {
    const client = clients.find(c => c.id == clientId);

    if (client) {
      document.getElementById("clientDetails").innerHTML = `
        <p><strong>Name:</strong> ${client.name}</p>
        <p><strong>Sport:</strong> ${client.sport}</p>
        <p><strong>Status:</strong> ${client.status}</p>
      `;
    }

    const notesBox = document.getElementById("clientNotes");
    notesBox.value = localStorage.getItem(`notes_${clientId}`) || "";

    notesBox.addEventListener("input", () => {
      localStorage.setItem(`notes_${clientId}`, notesBox.value);
    });
  });
}

