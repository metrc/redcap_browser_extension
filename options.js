
const saveOptions = () => {
    var redcapPath = document.getElementById('redcap_path').value;
    var projectJsonPath = document.getElementById('project_json_path').value;
    chrome.storage.sync.set({'redcap_path': redcapPath, 'project_json_path': projectJsonPath}, function() {
        window.close();
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get('redcap_path', function(data) {
        document.getElementById('redcap_path').value = data.redcap_path;
    });

    chrome.storage.sync.get('project_json_path', function(data) {
        document.getElementById('project_json_path').value = data.project_json_path;
    });
}

document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);