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

function initialSnippet(data){
    return API.post('/story/initial-snippet', {data})
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        })
}

function customInitialSnippet(data){
    return API.post('/story/custom-initial-snippet', {data})
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

function generateOptions(data){
    return API.post('/story/generate-options', {data})
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        });
}

function selectOption(data){
    return API.post('/story/select-option', {data})
        .then(response => response.data.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error('Network error');
        })
}

export {
    beginStory,
    getStory,
    initialSnippet,
    customInitialSnippet,
    generateOptions,
    selectOption
}