
const saveOptions = () => {
    var redcapPath = document.getElementById('redcap_path').value;
    chrome.storage.sync.set({'redcap_path': redcapPath}, function() {
        window.close();
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get('redcap_path', function(data) {
        document.getElementById('redcap_path').value = data.redcap_path;
    });

}

document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);