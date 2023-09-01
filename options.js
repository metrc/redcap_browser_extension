
const saveOptions = () => {
    var configKey = document.getElementById('config_key').value;
    chrome.storage.sync.set({'config_key': configKey}, function() {
        window.close();
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get('config_key', function(data) {
        document.getElementById('config_key').value = data.config_key;
    });

}

document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);