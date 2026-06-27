// Calendar functions
const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initCalendar();
    loadEvents();
});

function initCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Create simple calendar
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    calendar.innerHTML = `
        <h2>${monthNames[month]} ${year}</h2>
        <div id="calendarGrid"></div>
    `;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px;">';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div style="font-weight: bold; text-align: center;">${day}</div>`;
    });

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        html += '<div></div>';
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div style="text-align: center; padding: 10px; border: 1px solid #ccc; cursor: pointer;" 
                    onclick="showEventsForDay(${day})">${day}</div>`;
    }

    html += '</div>';
    document.getElementById('calendarGrid').innerHTML = html;
}

async function loadEvents() {
    try {
        const response = await fetch(`${API_URL}/calendar/events`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const events = await response.json();
            const eventsHtml = events.map(event => `
                <div class="event">
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                    <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
                </div>
            `).join('');
            
            document.getElementById('calendarEvents').innerHTML = eventsHtml;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showEventsForDay(day) {
    alert(`Events for day ${day}`);
}
