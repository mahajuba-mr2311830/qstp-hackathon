const menuItems = document.querySelectorAll(".menu-item");
const tabContents = document.querySelectorAll(".tab-content");
const pageTitle = document.getElementById("pageTitle");

const tabTitles = {
    "main-dashboard": "Main Dashboard",
    "select-startups": "Select Startups"
};

const startupNames = [
    "Daily Education",
    "BuildingFuture",
    "WaterTech",
    "SpeakLoudly",
    "HealthAI",
    "GreenBuild",
    "AgriVision",
    "FinBridge",
    "CyberNest",
    "MedFlow",
    "EduSpark",
    "SolarGrid",
    "UrbanLoop",
    "DataHarbour",
    "SmartClinic",
    "FoodLink",
    "CleanMotion",
    "Qatar Robotics",
    "CloudLedger",
    "NanoBuild"
];

for (let i = 21; i <= 300; i++) {
    startupNames.push(`Startup ${i}`);
}

let urgentRequests = [
    {
        company: "Daily Education",
        title: "Urgent approval for live school pilot",
        message: "The founder requires same-day approval to proceed with a school pilot confirmation.",
        time: "Today, 09:20 AM"
    },
    {
        company: "BuildingFuture",
        title: "Immediate budget clearance required",
        message: "The startup requires urgent clearance for prototype material procurement.",
        time: "Today, 10:05 AM"
    },
    {
        company: "WaterTech",
        title: "Critical field testing support",
        message: "The founder needs management support to approve access for field testing.",
        time: "Today, 11:15 AM"
    },
    {
        company: "SpeakLoudly",
        title: "Urgent accessibility demo request",
        message: "The founder needs approval to conduct an external accessibility demo tomorrow.",
        time: "Today, 12:30 PM"
    },
    {
        company: "HealthAI",
        title: "Urgent clinical review request",
        message: "The startup requires management clearance before sending material to a clinical partner.",
        time: "Today, 01:10 PM"
    },
    {
        company: "GreenBuild",
        title: "Urgent supplier confirmation",
        message: "The founder needs confirmation on supplier approval before the quotation expires.",
        time: "Today, 02:15 PM"
    }
];

let approvals = [
    {
        company: "Daily Education",
        title: "Marketing campaign approval",
        message: "Request to approve a campaign for school outreach.",
        status: "Pending"
    },
    {
        company: "BuildingFuture",
        title: "Prototype procurement approval",
        message: "Approval requested for supplier selection and prototype materials.",
        status: "Pending"
    },
    {
        company: "WaterTech",
        title: "Pilot deployment approval",
        message: "Approval requested to deploy the smart monitoring unit with a utility partner.",
        status: "Pending"
    },
    {
        company: "SpeakLoudly",
        title: "Accessibility programme approval",
        message: "Approval requested for a new communication accessibility initiative.",
        status: "Pending"
    },
    {
        company: "HealthAI",
        title: "Clinical partner onboarding",
        message: "Approval requested to onboard a pilot clinical partner.",
        status: "Pending"
    },
    {
        company: "GreenBuild",
        title: "Sustainability showcase approval",
        message: "Approval requested to participate in a construction innovation event.",
        status: "Pending"
    },
    {
        company: "AgriVision",
        title: "Farm trial approval",
        message: "Approval requested to start a smart agriculture trial.",
        status: "Pending"
    },
    {
        company: "FinBridge",
        title: "Investor meeting approval",
        message: "Approval requested for external investor engagement.",
        status: "Pending"
    },
    {
        company: "CyberNest",
        title: "Security assessment approval",
        message: "Approval requested to proceed with a third-party cybersecurity review.",
        status: "Pending"
    },
    {
        company: "MedFlow",
        title: "Product demo approval",
        message: "Approval requested for a healthcare product demonstration.",
        status: "Pending"
    }
];

let commands = [];

let milestones = [
    {
        date: "3rd May",
        company: "Daily Education",
        title: "New strategic partnership",
        description: "Daily Education made a new partnership with Vodafone."
    },
    {
        date: "3rd May",
        company: "BuildingFuture",
        title: "Team expansion",
        description: "BuildingFuture is now a team of 10 people, previously 8."
    },
    {
        date: "2nd May",
        company: "WaterTech",
        title: "Highest revenue reported",
        description: "WaterTech reported their highest revenue since 2024."
    }
];

let expandedState = {
    mainUrgent: false,
    mainApprovals: false,
    startupUrgent: false,
    startupApprovals: false
};

const previewLimit = 3;

const startupData = {
    "Daily Education": {
        weeklyKpis: [
            { label: "Mentorship Hours", value: "12 hrs", note: "Completed this week" },
            { label: "Product Milestones", value: "3", note: "Learning dashboard updates" },
            { label: "POCs Updated", value: "4", note: "School partner follow-ups" }
        ],
        monthlyKpis: [
            { label: "Revenue", value: "QAR 42,000", note: "Monthly recognised revenue" },
            { label: "Funding Raised", value: "QAR 250,000", note: "Angel funding received" },
            { label: "Headcount", value: "14", note: "Full-time and part-time team" },
            { label: "Runway", value: "8 months", note: "Based on current burn rate" },
            { label: "Jobs Created", value: "5", note: "New roles created this month" },
            { label: "Partnerships", value: "3", note: "School and content partners" }
        ],
        impact: [
            { type: "Environmental", value: "Low Paper Use", note: "Digital content reduced printed worksheets." },
            { type: "Social", value: "1,200 Learners", note: "Students reached through partner schools." },
            { type: "Economic", value: "5 Jobs", note: "Direct employment generated locally." }
        ]
    },
    "BuildingFuture": {
        weeklyKpis: [
            { label: "Product Milestones", value: "2", note: "Prototype testing and design update" },
            { label: "Mentorship Hours", value: "8 hrs", note: "Construction material review" },
            { label: "Partner Meetings", value: "5", note: "Contractor and supplier discussions" }
        ],
        monthlyKpis: [
            { label: "Revenue", value: "QAR 31,000", note: "Pilot project revenue" },
            { label: "Funding Raised", value: "QAR 180,000", note: "Grant and early funding" },
            { label: "Headcount", value: "9", note: "Core technical team" },
            { label: "Runway", value: "6 months", note: "Based on forecast expenditure" },
            { label: "Jobs Created", value: "3", note: "Engineering and operations roles" },
            { label: "Partnerships", value: "2", note: "Construction and materials partners" }
        ],
        impact: [
            { type: "Environmental", value: "18% Waste Reduction", note: "Lower material waste in prototype trial." },
            { type: "Social", value: "3 Training Sessions", note: "Workforce skill-development sessions delivered." },
            { type: "Economic", value: "QAR 31,000", note: "Monthly local project revenue." }
        ]
    },
    "WaterTech": {
        weeklyKpis: [
            { label: "Field Tests", value: "4", note: "Leak detection tests completed" },
            { label: "Mentorship Hours", value: "10 hrs", note: "Utility-sector mentorship" },
            { label: "Product Milestones", value: "2", note: "Sensor calibration and dashboard update" }
        ],
        monthlyKpis: [
            { label: "Revenue", value: "QAR 55,000", note: "Pilot and service income" },
            { label: "Funding Raised", value: "QAR 320,000", note: "Innovation grant received" },
            { label: "Headcount", value: "11", note: "Technical and operations staff" },
            { label: "Runway", value: "10 months", note: "Based on current cash position" },
            { label: "Jobs Created", value: "4", note: "Technical roles created" },
            { label: "Partnerships", value: "4", note: "Utility and facility partners" }
        ],
        impact: [
            { type: "Environmental", value: "Water Savings", note: "Leak detection supports reduced water loss." },
            { type: "Social", value: "Utility Reliability", note: "Improves service visibility and response time." },
            { type: "Economic", value: "QAR 55,000", note: "Monthly revenue from pilot services." }
        ]
    }
};

let selectedStartup = "Daily Education";

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

function renderMainDashboard() {
    document.getElementById("urgentCount").textContent = urgentRequests.length;
    document.getElementById("approvalCount").textContent = approvals.filter((item) => item.status === "Pending").length;
    document.getElementById("commandCount").textContent = commands.length;

    renderUrgentRequests();
    renderApprovals();
}

function renderCollapsibleList({ containerId, toggleId, items, expanded, type, emptyText }) {
    const container = document.getElementById(containerId);
    const toggle = document.getElementById(toggleId);

    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = `<p class="empty-text">${emptyText}</p>`;
        toggle.style.display = "none";
        return;
    }

    toggle.style.display = items.length > previewLimit ? "inline-flex" : "none";
    toggle.textContent = expanded ? "Collapse" : `Expand (${items.length})`;

    const visibleItems = expanded ? items : items.slice(0, previewLimit);

    visibleItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "request-card";

        if (type === "urgent") {
            card.innerHTML = `
        <span class="badge urgent">Urgent</span>
        <h4>${item.company || item.title}</h4>
        <p><b>${item.title}</b></p>
        <p>${item.message}</p>
        <small>${item.time}</small>
      `;
        }

        if (type === "approval") {
            const statusClass = item.status === "Approved" ? "approved" : "approval";

            card.innerHTML = `
        <span class="badge ${statusClass}">${item.status}</span>
        <h4>${item.company}</h4>
        <p><b>${item.title}</b></p>
        <p>${item.message}</p>

        <div class="card-actions">
          <button class="primary-btn" onclick="updateApproval(${item.originalIndex ?? index}, 'Approved')">Approve</button>
          <button class="secondary-btn" onclick="updateApproval(${item.originalIndex ?? index}, 'Pending')">Keep Pending</button>
        </div>
      `;
        }

        if (type === "startup-urgent") {
            card.innerHTML = `
        <span class="badge urgent">Urgent</span>
        <h4>${item.title}</h4>
        <p>${item.message}</p>
        <small>${item.time}</small>
      `;
        }

        if (type === "startup-approval") {
            const statusClass = item.status === "Approved" ? "approved" : "approval";

            card.innerHTML = `
        <span class="badge ${statusClass}">${item.status}</span>
        <h4>${item.title}</h4>
        <p>${item.message}</p>
      `;
        }

        container.appendChild(card);
    });

    if (!expanded && items.length > previewLimit) {
        const summary = document.createElement("div");
        summary.className = "request-summary";
        summary.textContent = `${items.length - previewLimit} more item(s) hidden. Click Expand to view all.`;
        container.appendChild(summary);
    }
}

function renderUrgentRequests() {
    renderCollapsibleList({
        containerId: "urgentRequestList",
        toggleId: "mainUrgentToggle",
        items: urgentRequests,
        expanded: expandedState.mainUrgent,
        type: "urgent",
        emptyText: "No urgent requests are currently available."
    });
}

function renderApprovals() {
    const approvalsWithIndex = approvals.map((item, index) => ({
        ...item,
        originalIndex: index
    }));

    renderCollapsibleList({
        containerId: "approvalList",
        toggleId: "mainApprovalToggle",
        items: approvalsWithIndex,
        expanded: expandedState.mainApprovals,
        type: "approval",
        emptyText: "No approval requests are currently available."
    });
}

document.getElementById("mainUrgentToggle").addEventListener("click", () => {
    expandedState.mainUrgent = !expandedState.mainUrgent;
    renderUrgentRequests();
});

document.getElementById("mainApprovalToggle").addEventListener("click", () => {
    expandedState.mainApprovals = !expandedState.mainApprovals;
    renderApprovals();
});

document.getElementById("startupUrgentToggle").addEventListener("click", () => {
    expandedState.startupUrgent = !expandedState.startupUrgent;
    renderStartupSpecificUrgentRequests(selectedStartup);
});

document.getElementById("startupApprovalToggle").addEventListener("click", () => {
    expandedState.startupApprovals = !expandedState.startupApprovals;
    renderStartupSpecificApprovals(selectedStartup);
});

function updateApproval(index, status) {
    approvals[index].status = status;
    renderMainDashboard();
    renderStartupSpecificApprovals(selectedStartup);
}

function setupSearch(inputId, resultsId, selectedInputId) {
    const searchInput = document.getElementById(inputId);
    const resultsBox = document.getElementById(resultsId);
    const selectedInput = selectedInputId ? document.getElementById(selectedInputId) : null;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        resultsBox.innerHTML = "";

        if (!query) {
            resultsBox.classList.remove("active");
            return;
        }

        const results = startupNames
            .filter((name) => name.toLowerCase().includes(query))
            .slice(0, 10);

        results.forEach((name) => {
            const item = document.createElement("div");
            item.className = "search-result-item";
            item.textContent = name;

            item.addEventListener("click", () => {
                searchInput.value = name;

                if (selectedInput) {
                    selectedInput.value = name;
                }

                resultsBox.classList.remove("active");
            });

            resultsBox.appendChild(item);
        });

        resultsBox.classList.toggle("active", results.length > 0);
    });

    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !resultsBox.contains(event.target)) {
            resultsBox.classList.remove("active");
        }
    });
}

setupSearch("mainStartupSearch", "mainStartupResults", "mainSelectedStartup");

const mainCommandForm = document.getElementById("mainCommandForm");

mainCommandForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const command = {
        company: document.getElementById("mainSelectedStartup").value,
        message: document.getElementById("mainCommandText").value.trim(),
        sentAt: new Date().toLocaleString()
    };

    commands.push(command);
    console.log("Command sent to founder dashboard:", command);

    mainCommandForm.reset();
    showMessage("mainCommandMessage", "Command sent to the selected startup successfully.");
    renderMainDashboard();
});

function renderStartupGrid(filter = "") {
    const startupGrid = document.getElementById("startupGrid");
    startupGrid.innerHTML = "";

    const filteredStartups = startupNames
        .filter((name) => name.toLowerCase().includes(filter.toLowerCase()))
        .slice(0, 60);

    filteredStartups.forEach((name) => {
        const card = document.createElement("div");
        card.className = `startup-card ${name === selectedStartup ? "active" : ""}`;

        card.innerHTML = `
      <h4>${name}</h4>
      <p>Click to view detailed dashboard</p>
    `;

        card.addEventListener("click", () => {
            selectedStartup = name;
            expandedState.startupUrgent = false;
            expandedState.startupApprovals = false;
            renderStartupGrid(document.getElementById("startupSearch").value);
            renderSelectedStartupDashboard(name);
        });

        startupGrid.appendChild(card);
    });
}

document.getElementById("startupSearch").addEventListener("input", (event) => {
    renderStartupGrid(event.target.value);
});

function getDataForStartup(name) {
    return startupData[name] || {
        weeklyKpis: [
            { label: "Mentorship Hours", value: "6 hrs", note: "Weekly mentorship engagement" },
            { label: "Product Milestones", value: "1", note: "Product update submitted" },
            { label: "Founder Updates", value: "2", note: "Weekly updates received" }
        ],
        monthlyKpis: [
            { label: "Revenue", value: "QAR 20,000", note: "Monthly reported revenue" },
            { label: "Funding Raised", value: "QAR 100,000", note: "Latest reported funding" },
            { label: "Headcount", value: "7", note: "Current team size" },
            { label: "Runway", value: "5 months", note: "Estimated runway" },
            { label: "Jobs Created", value: "2", note: "New jobs created" },
            { label: "Partnerships", value: "1", note: "Active partnership" }
        ],
        impact: [
            { type: "Environmental", value: "Pending", note: "Environmental impact data awaiting update." },
            { type: "Social", value: "Pending", note: "Social impact data awaiting update." },
            { type: "Economic", value: "Pending", note: "Economic impact data awaiting update." }
        ]
    };
}

function renderSelectedStartupDashboard(name) {
    const dashboard = document.getElementById("startupDashboard");
    const data = getDataForStartup(name);

    document.getElementById("selectedStartupName").textContent = name;
    dashboard.classList.remove("hidden");

    renderStartupSpecificApprovals(name);
    renderStartupSpecificUrgentRequests(name);
    renderKpis("weeklyKpis", data.weeklyKpis);
    renderKpis("monthlyKpis", data.monthlyKpis);
    renderImpactKpis(data.impact);

    dashboard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderStartupSpecificApprovals(name) {
    const startupApprovals = approvals
        .map((item, index) => ({
            ...item,
            originalIndex: index
        }))
        .filter((approval) => approval.company === name);

    renderCollapsibleList({
        containerId: "startupApprovals",
        toggleId: "startupApprovalToggle",
        items: startupApprovals,
        expanded: expandedState.startupApprovals,
        type: "startup-approval",
        emptyText: "No approval requests are currently available for this startup."
    });
}

function renderStartupSpecificUrgentRequests(name) {
    const startupUrgentRequests = urgentRequests.filter((request) => request.company === name);

    renderCollapsibleList({
        containerId: "startupUrgentRequests",
        toggleId: "startupUrgentToggle",
        items: startupUrgentRequests,
        expanded: expandedState.startupUrgent,
        type: "startup-urgent",
        emptyText: "No urgent requests are currently available for this startup."
    });
}

function renderKpis(containerId, kpis) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    kpis.forEach((kpi) => {
        const card = document.createElement("div");
        card.className = "kpi-card";

        card.innerHTML = `
      <span>${kpi.label}</span>
      <strong>${kpi.value}</strong>
      <p>${kpi.note}</p>
    `;

        container.appendChild(card);
    });
}

function renderImpactKpis(impactItems) {
    const container = document.getElementById("impactKpis");
    container.innerHTML = "";

    impactItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "impact-card";

        card.innerHTML = `
      <span>${item.type}</span>
      <strong>${item.value}</strong>
      <p>${item.note}</p>
    `;

        container.appendChild(card);
    });
}

const startupCommandForm = document.getElementById("startupCommandForm");

startupCommandForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const command = {
        company: selectedStartup,
        message: document.getElementById("startupCommandText").value.trim(),
        sentAt: new Date().toLocaleString()
    };

    commands.push(command);
    console.log("Command sent to selected startup:", command);

    startupCommandForm.reset();
    showMessage("startupCommandMessage", `Command sent to ${selectedStartup}.`);
    renderMainDashboard();
});

const scheduleMeetingForm = document.getElementById("scheduleMeetingForm");

scheduleMeetingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const meeting = {
        company: selectedStartup,
        title: document.getElementById("meetingTitle").value.trim(),
        date: document.getElementById("meetingDate").value,
        time: document.getElementById("meetingTime").value,
        agenda: document.getElementById("meetingAgenda").value.trim(),
        status: "Sent to founder for RSVP"
    };

    console.log("Meeting sent to founder dashboard:", meeting);

    scheduleMeetingForm.reset();
    showMessage("meetingMessage", `Meeting request sent to ${selectedStartup}.`);
});

const sendCommandShortcut = document.querySelector(".quick-menu-btn");

sendCommandShortcut.addEventListener("click", (event) => {
    event.preventDefault();

    document.getElementById("send-command-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

renderMainDashboard();
renderStartupGrid();

const managementNotifications = [
    {
        title: "Review urgent request",
        message: "Review: urgent request from Daily Education.",
        time: "Today, 09:20 AM"
    },
    {
        title: "Approval pending",
        message: "BuildingFuture is waiting for prototype procurement approval.",
        time: "Today, 10:05 AM"
    },
    {
        title: "WaterTech field testing",
        message: "WaterTech requested support for field testing access.",
        time: "Today, 11:15 AM"
    },
    {
        title: "Monthly KPI review",
        message: "Review submitted monthly KPI updates from active startups.",
        time: "Due this week"
    }
];

const managementNotificationBtn = document.getElementById("managementNotificationBtn");
const managementNotificationPanel = document.getElementById("managementNotificationPanel");
const closeManagementNotifications = document.getElementById("closeManagementNotifications");
const managementNotificationList = document.getElementById("managementNotificationList");
const managementNotificationCount = document.getElementById("managementNotificationCount");

function renderManagementNotifications() {
    managementNotificationList.innerHTML = "";
    managementNotificationCount.textContent = managementNotifications.length;

    managementNotifications.forEach((notification) => {
        const item = document.createElement("div");
        item.className = "notification-item";

        item.innerHTML = `
      <h4>${notification.title}</h4>
      <p>${notification.message}</p>
      <small>${notification.time}</small>
    `;

        managementNotificationList.appendChild(item);
    });
}

managementNotificationBtn.addEventListener("click", () => {
    managementNotificationPanel.classList.toggle("active");
});

closeManagementNotifications.addEventListener("click", () => {
    managementNotificationPanel.classList.remove("active");
});

document.addEventListener("click", (event) => {
    const clickedInsideNotifications =
        managementNotificationPanel.contains(event.target) ||
        managementNotificationBtn.contains(event.target);

    if (!clickedInsideNotifications) {
        managementNotificationPanel.classList.remove("active");
    }
});

renderManagementNotifications();

function renderMilestoneTimeline() {
    const milestoneTimeline = document.getElementById("milestoneTimeline");

    if (!milestoneTimeline) {
        return;
    }

    milestoneTimeline.innerHTML = "";

    milestones.forEach((milestone) => {
        const item = document.createElement("div");
        item.className = "milestone-item";

        item.innerHTML = `
      <span class="milestone-date">${milestone.date}</span>
      <h4>${milestone.company} — ${milestone.title}</h4>
      <p>${milestone.description}</p>
    `;

        milestoneTimeline.appendChild(item);
    });
}

renderMainDashboard();
renderMilestoneTimeline();
renderStartupGrid();