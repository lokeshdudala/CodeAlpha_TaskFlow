// Profile functions
const API_URL = 'https://taskflow-backend-7c2p.onrender.com/api/profile';

function checkAuth() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function getAuthHeader() {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProfile();

    const updateProfileForm = document.getElementById('updateProfileForm');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', handleUpdateProfile);
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handleChangePassword);
    }

    document.querySelectorAll('.section-action').forEach(button => {
        button.addEventListener('click', handleSectionAction);
    });

    const resumeInput = document.getElementById('resumeInput');
    const videoInput = document.getElementById('videoInput');

    if (resumeInput) {
        resumeInput.addEventListener('change', handleResumeUpload);
    }

    if (videoInput) {
        videoInput.addEventListener('change', handleVideoUpload);
    }
});

async function loadProfile() {
    try {
        const fallbackName = localStorage.getItem('userName') || 'User';
        const fallbackEmail = localStorage.getItem('userEmail') || '';
        
        document.getElementById('profileName').textContent = fallbackName;
        document.getElementById('profileEmail').textContent = fallbackEmail;
        document.getElementById('fullName').value = fallbackName;
        document.getElementById('email').value = fallbackEmail;

        const response = await fetch(`${API_URL}`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('profileName').textContent = userData.name;
            document.getElementById('profileEmail').textContent = userData.email;
            document.getElementById('fullName').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('location').value = userData.location || '';
            document.getElementById('joined').value = userData.joined ? new Date(userData.joined).toISOString().slice(0, 7) : '';
            document.getElementById('bio').value = userData.bio || '';
            document.getElementById('profilePhone').textContent = userData.phone || 'Not set';
            document.getElementById('profileLocation').textContent = userData.location || 'Not set';
            document.getElementById('profileJoined').textContent = userData.joined ? new Date(userData.joined).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Not set';
        }

        restoreSectionState();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleUpdateProfile(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('fullName')?.trim(),
        email: formData.get('email')?.trim().toLowerCase(),
        phone: formData.get('phone')?.trim(),
        location: formData.get('location')?.trim(),
        joined: formData.get('joined'),
        bio: formData.get('bio')?.trim()
    };

    if (!data.name || !data.email) {
        alert('Name and email are required.');
        return;
    }

    console.log('Profile update payload:', data);

    try {
        const response = await fetch(`${API_URL}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });

        const responseData = await response.json().catch(() => ({}));

        if (response.ok) {
            alert('Profile updated successfully');
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            await loadProfile();
        } else {
            const message = responseData.message || 'Failed to update profile';
            console.error('Profile update failed:', response.status, message, data);
            alert(message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update profile');
    }
}

async function handleChangePassword(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const currentPassword = formData.get('currentPassword')?.trim();
    const newPassword = formData.get('newPassword')?.trim();
    const confirmPassword = formData.get('confirmNewPassword')?.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const data = {
        currentPassword,
        newPassword
    };

    try {
        const response = await fetch(`${API_URL}/change-password`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });

        const responseData = await response.json().catch(() => ({}));

        if (response.ok) {
            alert('Password changed successfully');
            form.reset();
        } else {
            alert(responseData.message || 'Failed to change password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

function handleSectionAction(event) {
    const action = event.currentTarget.dataset.action;

    if (action === 'uploadResume') {
        document.getElementById('resumeInput').click();
    }

    if (action === 'uploadVideo') {
        document.getElementById('videoInput').click();
    }

    if (action === 'addSkill') {
        addListItem('skills', 'Skill');
    }

    if (action === 'addExperience') {
        addListItem('experience', 'Experience');
    }

    if (action === 'addCertificate') {
        addListItem('certificates', 'Certificate');
    }

    if (action === 'addLanguage') {
        addListItem('languages', 'Language');
    }
}

function addListItem(key, label) {
    const value = prompt(`Enter ${label}`);
    if (!value) return;

    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(value.trim());
    localStorage.setItem(key, JSON.stringify(list));
    renderSectionList(key, label);
}

function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('resumeContent').innerHTML = `
        <p class="section-detail">${file.name}</p>
    `;
    localStorage.setItem('resumeFileName', file.name);
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('videoContent').innerHTML = `
        <p class="section-detail">${file.name}</p>
    `;
    localStorage.setItem('videoFileName', file.name);
}

function renderSectionList(key, label) {
    const container = document.getElementById(`${key}Content`);
    const list = JSON.parse(localStorage.getItem(key) || '[]');

    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `<p class="section-placeholder">Add ${label.toLowerCase()} details here.</p>`;
        return;
    }

    container.innerHTML = `
        <ul class="section-list">
            ${list.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}

function restoreSectionState() {
    const resumeFileName = localStorage.getItem('resumeFileName');
    const videoFileName = localStorage.getItem('videoFileName');

    if (resumeFileName) {
        document.getElementById('resumeContent').innerHTML = `<p class="section-detail">${resumeFileName}</p>`;
    }

    if (videoFileName) {
        document.getElementById('videoContent').innerHTML = `<p class="section-detail">${videoFileName}</p>`;
    }

    renderSectionList('skills', 'Skill');
    renderSectionList('experience', 'Experience');
    renderSectionList('certificates', 'Certificate');
    renderSectionList('languages', 'Language');
}
