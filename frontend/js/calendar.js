// Calendar functions
const API_URL = 'https://taskflow-backend-7c2p.onrender.com/api/tasks';
let currentDate = new Date();
let eventsByDate = {};
let selectedDateKey = null;

function getAuthHeader() {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    if (!localStorage.getItem('userId')) {
        window.location.href = 'login.html';
        return;
    }
    loadEvents();
});

function formatDateKey(date) {
    return date.toISOString().slice(0, 10);
}

function renderCalendar(date) {
    const calendar = document.getElementById('calendar');
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();
    const todayKey = formatDateKey(today);
    selectedDateKey = selectedDateKey || todayKey;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const selectedDateDisplay = selectedDateKey ? new Date(selectedDateKey).toLocaleDateString(undefined, {
        weekday: 'short', month: 'short', day: 'numeric'
    }) : 'Select a day';

    calendar.innerHTML = `
        <div class="calendar-header">
            <button class="calendar-nav" id="prevMonth">←</button>
            <div>
                <h2>${monthNames[month]} ${year}</h2>
                <div class="calendar-badges">
                    <span class="calendar-badge today-badge">Today: ${today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span class="calendar-badge selected-badge">Selected: ${selectedDateDisplay}</span>
                </div>
                <p class="calendar-subtitle">Tap any highlighted day to view assigned tasks.</p>
            </div>
            <button class="calendar-nav" id="nextMonth">→</button>
        </div>
        <div id="calendarGrid" class="calendar-grid"></div>
    `;

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate = new Date(year, month - 1, 1);
        renderCalendar(currentDate);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate = new Date(year, month + 1, 1);
        renderCalendar(currentDate);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = '';
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    dayHeaders.forEach(day => {
        html += `<div class="calendar-day calendar-day-header">${day}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day);
        const cellKey = formatDateKey(cellDate);
        const hasEvent = eventsByDate[cellKey] && eventsByDate[cellKey].length > 0;
        const selected = selectedDateKey === cellKey;
        const todayClass = cellKey === todayKey ? 'today' : '';

        html += `
            <button class="calendar-day ${hasEvent ? 'has-event' : ''} ${selected ? 'selected' : ''} ${todayClass}"
                onclick="showEventsForDay('${cellKey}')">
                <span>${day}</span>
                ${hasEvent ? '<span class="event-marker"></span>' : ''}
            </button>
        `;
    }

    document.getElementById('calendarGrid').innerHTML = html;
}

async function loadEvents() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${API_URL}/my/${userId}`, {
            headers: getAuthHeader()
        });

        if (!response.ok) {
            console.error('Failed to load tasks', response.status);
            document.getElementById('calendarEvents').innerHTML = '<p>Unable to load events.</p>';
            return;
        }

        const tasks = await response.json();
        eventsByDate = {};

        tasks.forEach(task => {
            if (!task.dueDate) return;
            const dateKey = formatDateKey(new Date(task.dueDate));
            if (!eventsByDate[dateKey]) {
                eventsByDate[dateKey] = [];
            }
            eventsByDate[dateKey].push(task);
        });

        selectedDateKey = formatDateKey(new Date());
        renderCalendar(currentDate);
        renderEventList(selectedDateKey);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('calendarEvents').innerHTML = '<p>Unable to load events.</p>';
    }
}

function renderEventList(dateKey) {
    const eventsContainer = document.getElementById('calendarEvents');
    const tasks = eventsByDate[dateKey] || [];
    const displayDate = new Date(dateKey).toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    if (tasks.length === 0) {
        eventsContainer.innerHTML = `
            <div class="event-summary">
                <h3>${displayDate}</h3>
                <p>No tasks due on this day.</p>
            </div>
        `;
        return;
    }

    eventsContainer.innerHTML = `
        <div class="event-summary">
            <h3>${displayDate}</h3>
            <p>${tasks.length} task${tasks.length === 1 ? '' : 's'} due</p>
        </div>
        <div class="event-list">
            ${tasks.map(task => `
                <div class="event-card ${task.priority.toLowerCase()}">
                    <div class="event-card-header">
                        <h4>${task.title}</h4>
                        <span>${task.priority}</span>
                    </div>
                    <p>${task.description || 'No description provided.'}</p>
                    <div class="event-card-meta">
                        <span>Status: ${task.status}</span>
                        <span>Project: ${task.project?.name || 'Unknown'}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showEventsForDay(dateKey) {
    selectedDateKey = dateKey;
    renderCalendar(currentDate);
    renderEventList(dateKey);
}
