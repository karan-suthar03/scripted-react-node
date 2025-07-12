import API from './axios.js';

function loginUser(email, password) {
    return API.post('/users/login', { email, password })
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

function registerUser(email, password, name) {
    return API.post('/users/register', { email, password, name })
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

function logoutUser() {
    return API.post('/users/logout')
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

export {
    loginUser,
    registerUser,
    logoutUser
}