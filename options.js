
const saveOptions = () => {
    var apiKey = document.getElementById('api_key').value;
    chrome.storage.sync.set({'api_key': apiKey}, function() {
        window.close();
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get('api_key', function(data) {
        document.getElementById('api_key').value = data.api_key;
    });
}

document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);