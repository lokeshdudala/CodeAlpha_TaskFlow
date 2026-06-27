// Profile functions
const API_URL = 'http://localhost:5000/api';

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
});

async function loadProfile() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('fullName').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('bio').value = user.bio || '';

        // Optionally fetch full user data from API
        const response = await fetch(`${API_URL}/profile`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('fullName').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('bio').value = userData.bio || '';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleUpdateProfile(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
        name: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bio: formData.get('bio')
    };

    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Profile updated successfully');
            // Update local storage
            const user = JSON.parse(localStorage.getItem('user'));
            user.name = data.name;
            user.email = data.email;
            localStorage.setItem('user', JSON.stringify(user));
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

    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const data = {
        currentPassword,
        newPassword
    };

    try {
        const response = await fetch(`${API_URL}/profile/change-password`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Password changed successfully');
            form.reset();
        } else {
            alert('Failed to change password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}
