const menuItems = document.querySelectorAll(".menu-item");
const tabContents = document.querySelectorAll(".tab-content");
const pageTitle = document.getElementById("pageTitle");

const tabTitles = {
  "send-request": "Send Request",
  "kpi-forms": "KPI Forms",
  "urgent-request": "Urgent Request",
  "todo-list": "To-do List",
  "view-meetings": "View Meetings",
  "request-meeting": "Request Meeting",
  "pitch-deck": "Pitch Deck"
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedTab = item.dataset.tab;

    menuItems.forEach((button) => button.classList.remove("active"));
    tabContents.forEach((section) => section.classList.remove("active"));

    item.classList.add("active");
    document.getElementById(selectedTab).classList.add("active");
    pageTitle.textContent = tabTitles[selectedTab];
  });
});

function showMessage(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;

  setTimeout(() => {
    element.textContent = "";
  }, 3500);
}

/* Send Request */

const sendRequestForm = document.getElementById("sendRequestForm");

sendRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("requestTitle").value.trim();
  const type = document.getElementById("requestType").value;
  const message = document.getElementById("requestMessage").value.trim();
  const file = document.getElementById("requestPdf").files[0];

  const requestData = {
    title,
    type,
    message,
    fileName: file ? file.name : "No PDF attached",
    submittedAt: new Date().toLocaleString()
  };

  console.log("Approval request sent to management:", requestData);

  sendRequestForm.reset();
  showMessage("sendRequestMessage", "Request sent to management successfully.");
});

/* KPI Selection and Dynamic Form */

const kpiCards = document.querySelectorAll(".kpi-card");
const otherKpiCheck = document.getElementById("otherKpiCheck");
const otherKpiBox = document.getElementById("otherKpiBox");
const otherKpiInput = document.getElementById("otherKpiInput");
const buildFormBtn = document.getElementById("buildFormBtn");
const kpiFormSection = document.getElementById("kpiFormSection");
const dynamicKpiForm = document.getElementById("dynamicKpiForm");
const kpiDashboard = document.getElementById("kpiDashboard");
const kpiDashboardGrid = document.getElementById("kpiDashboardGrid");

kpiCards.forEach((card) => {
  const checkbox = card.querySelector("input");

  checkbox.addEventListener("change", () => {
    card.classList.toggle("selected", checkbox.checked);

    if (checkbox.id === "otherKpiCheck") {
      otherKpiBox.classList.toggle("active", checkbox.checked);

      if (!checkbox.checked) {
        otherKpiInput.value = "";
      }
    }
  });
});

buildFormBtn.addEventListener("click", () => {
  const selectedKpis = getSelectedKpis();

  if (selectedKpis.length === 0) {
    showMessage("kpiSelectMessage", "Please select at least one KPI.");
    return;
  }

  buildDynamicKpiForm(selectedKpis);
  kpiFormSection.classList.remove("hidden");
  kpiDashboard.classList.add("hidden");
  kpiFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

function getSelectedKpis() {
  const selected = [];

  document.querySelectorAll(".kpi-card input:checked").forEach((checkbox) => {
    if (checkbox.value === "Other") {
      const customKpi = otherKpiInput.value.trim();

      if (customKpi) {
        selected.push({
          name: customKpi,
          frequency: "Custom"
        });
      }
    } else {
      selected.push({
        name: checkbox.value,
        frequency: checkbox.dataset.frequency
      });
    }
  });

  return selected;
}

function buildDynamicKpiForm(selectedKpis) {
  dynamicKpiForm.innerHTML = "";

  selectedKpis.forEach((kpi, index) => {
    const safeId = `kpi-${index}`;

    const kpiBlock = document.createElement("div");
    kpiBlock.className = "kpi-entry";

    kpiBlock.innerHTML = `
      <h4>${kpi.name}</h4>

      <div class="entry-grid">
        <div class="form-group">
          <label for="${safeId}-value">KPI value</label>
          <input type="text" id="${safeId}-value" placeholder="Enter value" required />
        </div>

        <div class="form-group">
          <label for="${safeId}-period">Reporting period</label>
          <select id="${safeId}-period" required>
            <option value="">Select reporting period</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="${safeId}-details">Details / comments</label>
        <textarea id="${safeId}-details" rows="4" placeholder="Add KPI details, explanation or supporting notes..." required></textarea>
      </div>

      <input type="hidden" id="${safeId}-name" value="${kpi.name}" />
      <input type="hidden" id="${safeId}-frequency" value="${kpi.frequency}" />
    `;

    dynamicKpiForm.appendChild(kpiBlock);
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "primary-btn";
  submitButton.textContent = "Submit KPI Report";

  const formMessage = document.createElement("p");
  formMessage.className = "form-message";
  formMessage.id = "dynamicKpiMessage";

  dynamicKpiForm.appendChild(submitButton);
  dynamicKpiForm.appendChild(formMessage);
}

dynamicKpiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entries = [];
  const kpiBlocks = document.querySelectorAll(".kpi-entry");

  kpiBlocks.forEach((block, index) => {
    entries.push({
      name: document.getElementById(`kpi-${index}-name`).value,
      frequency: document.getElementById(`kpi-${index}-frequency`).value,
      value: document.getElementById(`kpi-${index}-value`).value.trim(),
      period: document.getElementById(`kpi-${index}-period`).value,
      details: document.getElementById(`kpi-${index}-details`).value.trim()
    });
  });

  const reportData = {
    submittedAt: new Date().toLocaleString(),
    entries
  };

  console.log("KPI report submitted to management:", reportData);

  renderKpiDashboard(entries);
  showMessage("dynamicKpiMessage", "KPI report submitted successfully.");
  kpiDashboard.classList.remove("hidden");
  kpiDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
});

function renderKpiDashboard(entries) {
  kpiDashboardGrid.innerHTML = "";

  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "dashboard-card";

    card.innerHTML = `
      <h4>${entry.name}</h4>
      <strong>${entry.value}</strong>
      <p><b>Period:</b> ${entry.period}</p>
      <p><b>Frequency:</b> ${entry.frequency}</p>
      <p>${entry.details}</p>
    `;

    kpiDashboardGrid.appendChild(card);
  });
}

/* Urgent Request */

const urgentRequestForm = document.getElementById("urgentRequestForm");

urgentRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const urgentData = {
    subject: document.getElementById("urgentSubject").value.trim(),
    urgency: document.getElementById("urgencyLevel").value,
    message: document.getElementById("urgentMessage").value.trim(),
    submittedAt: new Date().toLocaleString()
  };

  console.log("Urgent request sent directly to management:", urgentData);

  urgentRequestForm.reset();
  showMessage("urgentRequestMessage", "Urgent request sent to management.");
});

/* To-do List */

const todoList = document.getElementById("todoList");
const newTodoInput = document.getElementById("newTodoInput");
const addTodoBtn = document.getElementById("addTodoBtn");

let todos = [
  {
    title: "Upload latest monthly revenue figures",
    dueDate: "Due this week",
    status: "Pending"
  },
  {
    title: "Review mentorship feedback form",
    dueDate: "Due tomorrow",
    status: "Pending"
  },
  {
    title: "Submit updated founder profile",
    dueDate: "Due next week",
    status: "Pending"
  }
];

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const item = document.createElement("div");
    item.className = `todo-item ${todo.status === "Completed" ? "completed" : ""}`;

    item.innerHTML = `
      <div class="todo-details">
        <h4>${todo.title}</h4>
        <p>${todo.dueDate}</p>
      </div>

      <button class="secondary-btn" onclick="toggleTodo(${index})">
        ${todo.status === "Completed" ? "Mark Pending" : "Mark Complete"}
      </button>
    `;

    todoList.appendChild(item);
  });
}

function toggleTodo(index) {
  todos[index].status = todos[index].status === "Completed" ? "Pending" : "Completed";
  renderTodos();
}

addTodoBtn.addEventListener("click", () => {
  const task = newTodoInput.value.trim();

  if (!task) {
    return;
  }

  todos.unshift({
    title: task,
    dueDate: "New task",
    status: "Pending"
  });

  newTodoInput.value = "";
  renderTodos();
});

renderTodos();

/* Meetings */

const meetingList = document.getElementById("meetingList");

let meetings = [
  {
    title: "Monthly KPI Review",
    date: "18 June 2026",
    time: "10:00 AM",
    mode: "Online",
    status: "Pending RSVP"
  },
  {
    title: "Pitch Deck Review",
    date: "24 June 2026",
    time: "02:30 PM",
    mode: "In person",
    status: "Confirmed"
  }
];

function renderMeetings() {
  meetingList.innerHTML = "";

  meetings.forEach((meeting, index) => {
    const statusClass =
      meeting.status === "Confirmed"
        ? "confirmed"
        : meeting.status === "Declined"
          ? "cancelled"
          : "pending";

    const card = document.createElement("div");
    card.className = "meeting-card";

    card.innerHTML = `
      <span class="badge ${statusClass}">${meeting.status}</span>
      <h4>${meeting.title}</h4>
      <p><b>Date:</b> ${meeting.date}</p>
      <p><b>Time:</b> ${meeting.time}</p>
      <p><b>Mode:</b> ${meeting.mode}</p>

      <div class="meeting-actions">
        <button class="primary-btn" onclick="updateMeetingStatus(${index}, 'Confirmed')">RSVP</button>
        <button class="secondary-btn" onclick="updateMeetingStatus(${index}, 'Declined')">Decline</button>
      </div>
    `;

    meetingList.appendChild(card);
  });
}

function updateMeetingStatus(index, status) {
  meetings[index].status = status;
  console.log("Meeting response sent to management:", meetings[index]);
  renderMeetings();
}

renderMeetings();

/* Request Meeting */

const requestMeetingForm = document.getElementById("requestMeetingForm");

requestMeetingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const requestedMeeting = {
    title: document.getElementById("meetingTitle").value.trim(),
    meetingWith: document.getElementById("meetingContact").value,
    date: document.getElementById("meetingDate").value,
    time: document.getElementById("meetingTime").value,
    mode: document.getElementById("meetingMode").value,
    agenda: document.getElementById("meetingAgenda").value.trim(),
    status: "Requested"
  };

  console.log("Meeting request sent to management:", requestedMeeting);

  requestMeetingForm.reset();
  showMessage("requestMeetingMessage", "Meeting request sent to management.");
});

/* Pitch Deck */

const pitchDeckForm = document.getElementById("pitchDeckForm");
const submittedDecks = document.getElementById("submittedDecks");

let decks = [];

pitchDeckForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const file = document.getElementById("deckFile").files[0];

  const deckData = {
    title: document.getElementById("deckTitle").value.trim(),
    version: document.getElementById("deckVersion").value.trim(),
    fileName: file ? file.name : "No file selected",
    notes: document.getElementById("deckNotes").value.trim(),
    submittedAt: new Date().toLocaleString()
  };

  decks.unshift(deckData);
  console.log("Pitch deck submitted to management:", deckData);

  pitchDeckForm.reset();
  renderDecks();
  showMessage("pitchDeckMessage", "Pitch deck submitted successfully.");
});

function renderDecks() {
  submittedDecks.innerHTML = "";

  decks.forEach((deck) => {
    const card = document.createElement("div");
    card.className = "deck-card";

    card.innerHTML = `
      <h4>${deck.title}</h4>
      <p><b>Version:</b> ${deck.version}</p>
      <p><b>File:</b> ${deck.fileName}</p>
      <p><b>Submitted:</b> ${deck.submittedAt}</p>
      <p>${deck.notes || "No additional notes provided."}</p>
    `;

    submittedDecks.appendChild(card);
  });
}