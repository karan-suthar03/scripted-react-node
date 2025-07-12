import API from './axios.js';

function beginStory(title){
    return API.post('/story/begin', { title })
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

function getStory(storyId) {
    return API.get(`/story/${storyId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

export {
    beginStory,
    getStory
}